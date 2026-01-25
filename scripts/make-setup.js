#!/usr/bin/env node
/**
 * AuthiChain Make.com Setup Script
 * Automatically creates scenarios, webhooks, and connections via Make.com API
 *
 * Prerequisites:
 * 1. Create Make.com account at make.com
 * 2. Get API token: Profile > API Access > Create Token
 * 3. Note your Team ID from the URL when in Make.com dashboard
 *
 * Usage:
 *   MAKE_API_TOKEN=xxx MAKE_TEAM_ID=xxx node scripts/make-setup.js
 */

const fs = require('fs');
const path = require('path');

const MAKE_API_TOKEN = process.env.MAKE_API_TOKEN;
const MAKE_TEAM_ID = process.env.MAKE_TEAM_ID;
const MAKE_API_BASE = process.env.MAKE_API_BASE || 'https://us1.make.com/api/v2';

if (!MAKE_API_TOKEN || !MAKE_TEAM_ID) {
  console.error('Required environment variables:');
  console.error('   MAKE_API_TOKEN - Your Make.com API token');
  console.error('   MAKE_TEAM_ID - Your Make.com team/organization ID');
  console.error('\nGet these from: Make.com > Profile > API Access');
  process.exit(1);
}

const headers = {
  'Authorization': `Token ${MAKE_API_TOKEN}`,
  'Content-Type': 'application/json'
};

// Scenario files to import
const SCENARIOS = [
  { name: 'AuthiChain - Product Registration', file: 'product-registration-scenario.json', folder: 'AuthiChain' },
  { name: 'AuthiChain - Verification Events', file: 'verification-events-scenario.json', folder: 'AuthiChain' },
  { name: 'AuthiChain - AI Classification', file: 'ai-classification-scenario.json', folder: 'AuthiChain' },
  { name: 'AuthiChain - Notifications', file: 'notifications-scenario.json', folder: 'AuthiChain' }
];

// Webhook definitions for each scenario
const WEBHOOKS = {
  'product-registration': [
    { name: 'product_created', description: 'Webhook for new product registrations' },
    { name: 'product_updated', description: 'Webhook for product updates' }
  ],
  'verification': [
    { name: 'verification_scan', description: 'Webhook for product verification scans' },
    { name: 'authenticity_check', description: 'Webhook for authenticity verification results' }
  ],
  'classification': [
    { name: 'classification_request', description: 'Webhook for AI classification requests' },
    { name: 'classification_complete', description: 'Webhook for completed classifications' }
  ],
  'notifications': [
    { name: 'alert_trigger', description: 'Webhook for security alerts' },
    { name: 'report_request', description: 'Webhook for report generation requests' }
  ]
};

async function makeRequest(endpoint, method = 'GET', body = null) {
  const url = `${MAKE_API_BASE}${endpoint}`;
  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Make.com API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function getOrCreateFolder(folderName) {
  console.log(`\nSetting up folder: ${folderName}`);

  try {
    // List existing folders
    const folders = await makeRequest(`/folders?teamId=${MAKE_TEAM_ID}`);
    const existing = folders.folders?.find(f => f.name === folderName);

    if (existing) {
      console.log(`  [skip] Folder already exists: ${existing.id}`);
      return existing.id;
    }

    // Create new folder
    const newFolder = await makeRequest('/folders', 'POST', {
      name: folderName,
      teamId: parseInt(MAKE_TEAM_ID)
    });

    console.log(`  [created] Folder: ${newFolder.folder.id}`);
    return newFolder.folder.id;

  } catch (error) {
    console.error(`  [error] Folder:`, error.message);
    return null;
  }
}

async function createWebhook(name, description) {
  try {
    const webhook = await makeRequest('/hooks', 'POST', {
      name: `authichain_${name}`,
      teamId: parseInt(MAKE_TEAM_ID),
      typeName: 'gateway',
      typeHookName: 'web'
    });

    return {
      id: webhook.hook.id,
      name: webhook.hook.name,
      url: webhook.hook.url
    };
  } catch (error) {
    console.error(`  [error] Creating webhook ${name}:`, error.message);
    return null;
  }
}

async function listExistingWebhooks() {
  try {
    const response = await makeRequest(`/hooks?teamId=${MAKE_TEAM_ID}`);
    return response.hooks || [];
  } catch (error) {
    console.error('Error listing webhooks:', error.message);
    return [];
  }
}

async function createScenario(name, folderId, blueprintPath) {
  console.log(`\nCreating scenario: ${name}`);

  try {
    // Load blueprint JSON
    const blueprintFile = path.join(__dirname, '..', 'make-scenarios', blueprintPath);

    if (!fs.existsSync(blueprintFile)) {
      console.log(`  [warning] Blueprint file not found: ${blueprintFile}`);
      return null;
    }

    const blueprint = JSON.parse(fs.readFileSync(blueprintFile, 'utf8'));

    // Check for existing scenario
    const scenarios = await makeRequest(`/scenarios?teamId=${MAKE_TEAM_ID}`);
    const existing = scenarios.scenarios?.find(s => s.name === name);

    if (existing) {
      console.log(`  [skip] Scenario already exists: ${existing.id}`);
      return { id: existing.id, name: existing.name, isNew: false };
    }

    // Create new scenario
    const newScenario = await makeRequest('/scenarios', 'POST', {
      teamId: parseInt(MAKE_TEAM_ID),
      folderId: folderId,
      name: name,
      blueprint: JSON.stringify(blueprint)
    });

    console.log(`  [created] Scenario: ${newScenario.scenario.id}`);
    return { id: newScenario.scenario.id, name: newScenario.scenario.name, isNew: true };

  } catch (error) {
    console.error(`  [error] Creating scenario:`, error.message);
    return null;
  }
}

async function setupWebhooksForScenario(scenarioType) {
  console.log(`\nSetting up webhooks for: ${scenarioType}`);

  const webhookDefs = WEBHOOKS[scenarioType];
  if (!webhookDefs) return [];

  const existingWebhooks = await listExistingWebhooks();
  const results = [];

  for (const def of webhookDefs) {
    const existingHook = existingWebhooks.find(h => h.name === `authichain_${def.name}`);

    if (existingHook) {
      console.log(`  [skip] Webhook exists: ${def.name}`);
      console.log(`     URL: ${existingHook.url}`);
      results.push({ name: def.name, url: existingHook.url, id: existingHook.id });
    } else {
      const webhook = await createWebhook(def.name, def.description);
      if (webhook) {
        console.log(`  [created] Webhook: ${def.name}`);
        console.log(`     URL: ${webhook.url}`);
        results.push(webhook);
      }
    }
  }

  return results;
}

async function listConnections() {
  console.log('\nChecking available connections...');

  try {
    const connections = await makeRequest(`/connections?teamId=${MAKE_TEAM_ID}`);

    const requiredApps = ['supabase', 'openai', 'sendgrid', 'slack', 'airtable'];
    const found = {};

    for (const conn of (connections.connections || [])) {
      const appName = conn.accountName?.toLowerCase() || '';
      for (const required of requiredApps) {
        if (appName.includes(required)) {
          found[required] = { id: conn.id, name: conn.accountName };
        }
      }
    }

    console.log('\n  Connected services:');
    for (const app of requiredApps) {
      if (found[app]) {
        console.log(`    [ok] ${app}: ${found[app].name}`);
      } else {
        console.log(`    [missing] ${app}: Not connected - add in Make.com UI`);
      }
    }

    return found;

  } catch (error) {
    console.error('  [error] Listing connections:', error.message);
    return {};
  }
}

async function main() {
  console.log('================================================================');
  console.log('           AuthiChain Make.com Setup Script                     ');
  console.log('           Automated Scenario & Webhook Configuration           ');
  console.log('================================================================');

  console.log(`\nTeam ID: ${MAKE_TEAM_ID}`);
  console.log(`API Base: ${MAKE_API_BASE}`);

  // Verify API access
  console.log('\nVerifying API access...');
  try {
    await makeRequest(`/users/me`);
    console.log('  [ok] API access verified');
  } catch (error) {
    console.error('  [error] API access failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Verify your API token is correct');
    console.error('2. Check your API base URL (us1, eu1, etc.)');
    console.error('3. Ensure your token has necessary permissions');
    process.exit(1);
  }

  // Create folder
  const folderId = await getOrCreateFolder('AuthiChain');

  // Setup webhooks by category
  const allWebhooks = {};
  for (const category of Object.keys(WEBHOOKS)) {
    allWebhooks[category] = await setupWebhooksForScenario(category);
  }

  // Create scenarios
  const scenarioResults = [];
  for (const scenario of SCENARIOS) {
    const result = await createScenario(scenario.name, folderId, scenario.file);
    if (result) {
      scenarioResults.push(result);
    }
  }

  // Check connections
  const connections = await listConnections();

  // Generate configuration output
  console.log('\n' + '='.repeat(60));
  console.log('CONFIGURATION OUTPUT');
  console.log('='.repeat(60));

  console.log('\nWebhook URLs (add to .env):\n');

  for (const [category, webhooks] of Object.entries(allWebhooks)) {
    for (const webhook of webhooks) {
      const envKey = `MAKE_WEBHOOK_${webhook.name.toUpperCase().replace('AUTHICHAIN_', '')}`;
      console.log(`${envKey}=${webhook.url}`);
    }
  }

  console.log('\nScenarios created:');
  for (const scenario of scenarioResults) {
    console.log(`  - ${scenario.name} (ID: ${scenario.id})${scenario.isNew ? ' [NEW]' : ''}`);
  }

  // Required manual steps
  console.log('\n' + '='.repeat(60));
  console.log('REQUIRED MANUAL STEPS');
  console.log('='.repeat(60));

  console.log(`
1. CONNECT SERVICES in Make.com UI:
   - Go to: https://us1.make.com/organization/${MAKE_TEAM_ID}/connections
   - Add connections for: Supabase, OpenAI, SendGrid, Slack

2. CONFIGURE SCENARIO VARIABLES:
   - Open each scenario in Make.com
   - Click the wrench icon > Variables
   - Add environment variables (API keys, Supabase URL, etc.)

3. UPDATE WEBHOOK CONNECTIONS:
   - In each scenario, click the webhook module
   - Select or create the appropriate webhook

4. ACTIVATE SCENARIOS:
   - Toggle each scenario to "Active"
   - Set scheduling (immediately, scheduled, etc.)

5. TEST WEBHOOKS:
   - Use the "Run once" button in Make.com
   - Send test payloads to verify data flow
`);

  // Save configuration
  const config = {
    folderId,
    webhooks: allWebhooks,
    scenarios: scenarioResults,
    connections,
    apiBase: MAKE_API_BASE,
    teamId: MAKE_TEAM_ID,
    createdAt: new Date().toISOString()
  };

  fs.writeFileSync('make-config.json', JSON.stringify(config, null, 2));
  console.log('Configuration saved to make-config.json');

  console.log('\n' + '='.repeat(60));
  console.log('Make.com setup complete!');
  console.log('='.repeat(60));
}

main().catch(console.error);
