"use client";

import { ProductClassificationCard } from "@/components/product-classification-card";
import { SeedToSaleTimeline } from "@/components/seed-to-sale-timeline";
import { AIStoryPlayer } from "@/components/ai-story-player";
import { Card } from "@/components/ui/card";

export default function DemoPage() {
  // Sample data for Product Classification Card
  const sampleCategory = {
    name: "Organic Vegetables",
    level: 1,
    children: [
      {
        name: "Leafy Greens",
        level: 2,
        children: [
          {
            name: "Spinach",
            level: 3,
          },
        ],
      },
    ],
  };

  const sampleFeatures = [
    { id: "1", name: "Organic Certification", confidence: 98, verified: true },
    { id: "2", name: "Non-GMO", confidence: 95, verified: true },
    { id: "3", name: "Pesticide-Free", confidence: 92, verified: true },
    { id: "4", name: "Fresh Harvested", confidence: 88, verified: false },
    { id: "5", name: "Locally Sourced", confidence: 85, verified: false },
  ];

  // Sample data for Seed-to-Sale Timeline
  const sampleCheckpoints = [
    {
      id: "1",
      title: "Seed Planting",
      description: "Organic spinach seeds planted in greenhouse sector A",
      timestamp: "2024-01-15 08:30 AM",
      location: "Greenhouse A, Farm Valley",
      operator: "John Smith",
      blockchainVerified: true,
      blockchainHash:
        "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
      status: "completed" as const,
      icon: "seed" as const,
      details: [
        { label: "Seed Type", value: "Organic Spinach - Variety A" },
        { label: "Quantity", value: "5000 seeds" },
        { label: "Soil pH", value: "6.5" },
        { label: "Temperature", value: "22°C" },
      ],
    },
    {
      id: "2",
      title: "Growth Monitoring",
      description: "Regular watering and nutrient monitoring initiated",
      timestamp: "2024-01-20 10:00 AM",
      location: "Greenhouse A, Farm Valley",
      operator: "Sarah Johnson",
      blockchainVerified: true,
      blockchainHash:
        "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a",
      status: "completed" as const,
      icon: "growth" as const,
      details: [
        { label: "Growth Stage", value: "Vegetative" },
        { label: "Height", value: "5-7 cm" },
        { label: "Irrigation", value: "2x daily" },
      ],
    },
    {
      id: "3",
      title: "Harvest",
      description: "Mature spinach harvested and prepared for packaging",
      timestamp: "2024-02-10 06:00 AM",
      location: "Greenhouse A, Farm Valley",
      operator: "Mike Davis",
      blockchainVerified: true,
      blockchainHash:
        "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b",
      status: "completed" as const,
      icon: "harvest" as const,
      details: [
        { label: "Harvest Weight", value: "250 kg" },
        { label: "Quality Grade", value: "Premium A" },
        { label: "Batch Number", value: "SPN-2024-001" },
      ],
    },
    {
      id: "4",
      title: "Quality Check & Packaging",
      description: "Product inspected, certified, and vacuum sealed",
      timestamp: "2024-02-10 02:00 PM",
      location: "Processing Facility, Farm Valley",
      operator: "Emma Wilson",
      blockchainVerified: true,
      blockchainHash:
        "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c",
      status: "completed" as const,
      icon: "package" as const,
      details: [
        { label: "Packaging Type", value: "Vacuum Sealed" },
        { label: "Package Weight", value: "500g per unit" },
        { label: "Units Packed", value: "500 units" },
        { label: "Certification", value: "USDA Organic" },
      ],
    },
    {
      id: "5",
      title: "In Transit",
      description: "Shipment en route to distribution center",
      timestamp: "2024-02-11 05:00 AM",
      location: "En route to Central Distribution",
      operator: "Transport Co.",
      blockchainVerified: true,
      blockchainHash:
        "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d",
      status: "in-progress" as const,
      icon: "transport" as const,
      details: [
        { label: "Vehicle ID", value: "TRK-2024-045" },
        { label: "Temperature", value: "4°C maintained" },
        { label: "ETA", value: "2024-02-11 2:00 PM" },
      ],
    },
    {
      id: "6",
      title: "Retail Distribution",
      description: "Product available for purchase at retail locations",
      timestamp: "Pending",
      location: "Retail Stores",
      operator: "Pending",
      blockchainVerified: false,
      status: "pending" as const,
      icon: "retail" as const,
    },
  ];

  // Sample data for AI Story Player
  const sampleTranscript = [
    {
      id: "1",
      text: "Welcome to the story of your organic spinach. This journey begins in the heart of Farm Valley.",
      startTime: 0,
      endTime: 6,
      speaker: "Narrator",
    },
    {
      id: "2",
      text: "On January 15th, 2024, our farmers carefully planted over 5,000 organic spinach seeds in our state-of-the-art greenhouse.",
      startTime: 6,
      endTime: 14,
      speaker: "Narrator",
    },
    {
      id: "3",
      text: "Every step of the process was monitored and verified on the blockchain, ensuring complete transparency.",
      startTime: 14,
      endTime: 21,
      speaker: "Narrator",
    },
    {
      id: "4",
      text: "Our team used precision agriculture techniques, maintaining optimal soil pH and temperature throughout the growing cycle.",
      startTime: 21,
      endTime: 29,
      speaker: "Narrator",
    },
    {
      id: "5",
      text: "After 26 days of careful nurturing, the spinach reached peak freshness and was harvested at dawn.",
      startTime: 29,
      endTime: 36,
      speaker: "Narrator",
    },
    {
      id: "6",
      text: "Quality inspectors certified the harvest, awarding it a Premium A grade before vacuum sealing for maximum freshness.",
      startTime: 36,
      endTime: 44,
      speaker: "Narrator",
    },
    {
      id: "7",
      text: "Now, your spinach is on its way to you, kept at a perfect 4 degrees Celsius to maintain its nutritional value.",
      startTime: 44,
      endTime: 52,
      speaker: "Narrator",
    },
    {
      id: "8",
      text: "From seed to sale, every moment has been tracked, verified, and secured for your peace of mind.",
      startTime: 52,
      endTime: 59,
      speaker: "Narrator",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Component Showcase
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive components for product classification, supply chain
            tracking, and AI-powered storytelling
          </p>
        </div>

        {/* Product Classification Card */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Product Classification Card
            </h2>
            <p className="text-muted-foreground">
              AI-powered product categorization with confidence metrics and
              feature detection
            </p>
          </div>
          <ProductClassificationCard
            category={sampleCategory}
            confidence={94}
            detectedFeatures={sampleFeatures}
            onEdit={() => alert("Edit clicked!")}
          />
        </section>

        {/* Seed-to-Sale Timeline */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Seed-to-Sale Timeline</h2>
            <p className="text-muted-foreground">
              Complete supply chain traceability with blockchain verification
            </p>
          </div>
          <SeedToSaleTimeline
            checkpoints={sampleCheckpoints}
            productName="Organic Spinach"
          />
        </section>

        {/* AI Story Player */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">AI Story Player</h2>
            <p className="text-muted-foreground">
              Interactive audio storytelling with synchronized transcripts and
              waveform visualization
            </p>
          </div>
          <AIStoryPlayer
            title="The Journey of Your Organic Spinach"
            duration={59}
            transcriptSegments={sampleTranscript}
            onDownload={() => alert("Download clicked!")}
          />
        </section>

        {/* Usage Instructions */}
        <section className="mt-16 pt-16 border-t space-y-6">
          <h2 className="text-2xl font-bold">Usage Instructions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">
                Product Classification Card
              </h3>
              <code className="text-xs bg-muted px-2 py-1 rounded block mb-2">
                @/components/product-classification-card
              </code>
              <p className="text-sm text-muted-foreground">
                Import and use with category tree, confidence score, and
                detected features data.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Seed-to-Sale Timeline</h3>
              <code className="text-xs bg-muted px-2 py-1 rounded block mb-2">
                @/components/seed-to-sale-timeline
              </code>
              <p className="text-sm text-muted-foreground">
                Import and provide an array of checkpoints with blockchain
                verification data.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">AI Story Player</h3>
              <code className="text-xs bg-muted px-2 py-1 rounded block mb-2">
                @/components/ai-story-player
              </code>
              <p className="text-sm text-muted-foreground">
                Import and provide transcript segments with timing for
                auto-sync functionality.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
