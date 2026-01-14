/**
 * AI AutoFlow™ Industry Configuration
 * Universal product classification and workflow generation system
 */

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
}

export interface IndustryConfig {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  workflowSteps: WorkflowStep[];
  storyTemplate: string;
  authenticityFeatures: string[];
  marketSize: string;
  icon: string;
}

export const INDUSTRIES: Record<string, IndustryConfig> = {
  cannabis: {
    id: "cannabis",
    name: "Cannabis & Hemp",
    description: "Regulated cannabis products, CBD, and hemp derivatives",
    keywords: ["cannabis", "marijuana", "cbd", "hemp", "thc", "flower", "edible", "vape", "concentrate"],
    icon: "🌿",
    marketSize: "$30B",
    workflowSteps: [
      {
        id: "cultivation",
        name: "Cultivation",
        description: "Seed selection and growing process tracked",
        icon: "🌱",
        duration: "90-120 days"
      },
      {
        id: "testing",
        name: "Laboratory Testing",
        description: "Potency, pesticides, and contaminants analysis",
        icon: "🔬",
        duration: "3-5 days"
      },
      {
        id: "processing",
        name: "Processing & Packaging",
        description: "Product creation and sealed packaging",
        icon: "📦",
        duration: "1-2 days"
      },
      {
        id: "compliance",
        name: "Compliance Verification",
        description: "State tracking system integration (METRC, BioTrack)",
        icon: "✓",
        duration: "1 day"
      },
      {
        id: "distribution",
        name: "Distribution",
        description: "Chain of custody to licensed retailers",
        icon: "🚚",
        duration: "1-3 days"
      }
    ],
    storyTemplate: "This {productName} was cultivated from premium {strain} genetics, grown in {location} under strict quality controls. Each plant was monitored throughout its lifecycle, tested for safety and potency, and packaged with precision to preserve its natural qualities.",
    authenticityFeatures: [
      "Strain DNA verification",
      "Terpene profile analysis",
      "Cannabinoid potency testing",
      "Batch tracking number",
      "State compliance seal"
    ]
  },

  luxury: {
    id: "luxury",
    name: "Luxury Goods",
    description: "High-end fashion, jewelry, watches, and accessories",
    keywords: ["luxury", "designer", "watch", "jewelry", "handbag", "fashion", "rolex", "gucci", "louis vuitton", "hermes"],
    icon: "💎",
    marketSize: "$340B",
    workflowSteps: [
      {
        id: "design",
        name: "Design & Craftsmanship",
        description: "Original design creation and authentication",
        icon: "✏️",
        duration: "Varies"
      },
      {
        id: "materials",
        name: "Material Sourcing",
        description: "Premium materials verified and documented",
        icon: "🧵",
        duration: "30-60 days"
      },
      {
        id: "manufacturing",
        name: "Manufacturing",
        description: "Artisan craftsmanship in authorized facilities",
        icon: "🏭",
        duration: "30-90 days"
      },
      {
        id: "quality",
        name: "Quality Inspection",
        description: "Multi-point quality control and certification",
        icon: "🔍",
        duration: "2-5 days"
      },
      {
        id: "serialization",
        name: "Serialization",
        description: "Unique serial number and hologram assignment",
        icon: "🔢",
        duration: "1 day"
      },
      {
        id: "retail",
        name: "Authorized Retail",
        description: "Distribution to verified luxury retailers",
        icon: "🏪",
        duration: "5-10 days"
      }
    ],
    storyTemplate: "This {productName} by {brand} represents the pinnacle of luxury craftsmanship. Created by master artisans using the finest materials, each piece undergoes rigorous quality inspection to meet the exacting standards that define {brand}'s heritage of excellence.",
    authenticityFeatures: [
      "Serial number verification",
      "Holographic authentication seal",
      "Material composition analysis",
      "Craftsmanship documentation",
      "Certificate of authenticity"
    ]
  },

  electronics: {
    id: "electronics",
    name: "Electronics & Technology",
    description: "Consumer electronics, smartphones, computers, and tech accessories",
    keywords: ["electronics", "smartphone", "laptop", "computer", "tablet", "headphones", "camera", "apple", "samsung", "sony"],
    icon: "📱",
    marketSize: "$1.5T",
    workflowSteps: [
      {
        id: "components",
        name: "Component Sourcing",
        description: "Genuine components from verified suppliers",
        icon: "⚙️",
        duration: "30-60 days"
      },
      {
        id: "assembly",
        name: "Assembly",
        description: "Manufacturing in certified facilities",
        icon: "🏭",
        duration: "1-3 days"
      },
      {
        id: "testing",
        name: "Quality Testing",
        description: "Comprehensive electrical and functional testing",
        icon: "🔌",
        duration: "1-2 days"
      },
      {
        id: "firmware",
        name: "Firmware Validation",
        description: "Official firmware installation and verification",
        icon: "💾",
        duration: "Hours"
      },
      {
        id: "packaging",
        name: "Packaging & Sealing",
        description: "Tamper-evident packaging with QR codes",
        icon: "📦",
        duration: "1 day"
      },
      {
        id: "distribution",
        name: "Distribution",
        description: "Shipment to authorized retailers",
        icon: "🚚",
        duration: "3-7 days"
      }
    ],
    storyTemplate: "This {productName} was assembled using genuine {brand} components in an ISO-certified manufacturing facility. Each unit underwent rigorous quality testing to ensure it meets strict performance and safety standards before receiving its unique IMEI/serial number.",
    authenticityFeatures: [
      "IMEI/Serial number validation",
      "Firmware signature verification",
      "Component authenticity check",
      "Warranty registration",
      "Tamper-evident packaging"
    ]
  },

  pharmaceutical: {
    id: "pharmaceutical",
    name: "Pharmaceuticals",
    description: "Prescription drugs, OTC medications, and medical supplies",
    keywords: ["pharmaceutical", "medicine", "drug", "prescription", "medication", "pills", "vaccine", "medical"],
    icon: "💊",
    marketSize: "$1.4T",
    workflowSteps: [
      {
        id: "synthesis",
        name: "Active Ingredient Synthesis",
        description: "API production in GMP facilities",
        icon: "⚗️",
        duration: "30-90 days"
      },
      {
        id: "formulation",
        name: "Formulation",
        description: "Drug formulation and stability testing",
        icon: "🧪",
        duration: "14-30 days"
      },
      {
        id: "testing",
        name: "Quality Control Testing",
        description: "Potency, purity, and safety verification",
        icon: "🔬",
        duration: "7-14 days"
      },
      {
        id: "packaging",
        name: "Packaging",
        description: "Tamper-evident packaging with serialization",
        icon: "📦",
        duration: "1-3 days"
      },
      {
        id: "regulatory",
        name: "Regulatory Compliance",
        description: "FDA/regulatory approval verification",
        icon: "✓",
        duration: "1-2 days"
      },
      {
        id: "distribution",
        name: "Cold Chain Distribution",
        description: "Temperature-controlled distribution tracking",
        icon: "🚚",
        duration: "1-5 days"
      }
    ],
    storyTemplate: "This {productName} was manufactured in a GMP-certified pharmaceutical facility following strict FDA guidelines. Every batch undergoes comprehensive testing for potency, purity, and safety, with full chain of custody tracking from production to patient.",
    authenticityFeatures: [
      "NDC number verification",
      "Batch number tracking",
      "Expiration date validation",
      "2D barcode serialization",
      "Temperature monitoring data"
    ]
  },

  fashion: {
    id: "fashion",
    name: "Fashion & Apparel",
    description: "Clothing, footwear, and fashion accessories",
    keywords: ["fashion", "clothing", "apparel", "shoes", "sneakers", "shirt", "dress", "jacket", "nike", "adidas"],
    icon: "👔",
    marketSize: "$1.7T",
    workflowSteps: [
      {
        id: "design",
        name: "Design Creation",
        description: "Original design and pattern development",
        icon: "✏️",
        duration: "30-90 days"
      },
      {
        id: "materials",
        name: "Textile Sourcing",
        description: "Authentic fabric and material procurement",
        icon: "🧵",
        duration: "20-40 days"
      },
      {
        id: "manufacturing",
        name: "Manufacturing",
        description: "Production in authorized facilities",
        icon: "🏭",
        duration: "14-30 days"
      },
      {
        id: "quality",
        name: "Quality Control",
        description: "Inspection for defects and consistency",
        icon: "🔍",
        duration: "2-3 days"
      },
      {
        id: "tagging",
        name: "Authentication Tagging",
        description: "NFC tags and hologram application",
        icon: "🏷️",
        duration: "1 day"
      },
      {
        id: "retail",
        name: "Retail Distribution",
        description: "Shipment to authorized retailers",
        icon: "🏪",
        duration: "5-15 days"
      }
    ],
    storyTemplate: "This {productName} by {brand} was crafted using premium materials and authentic design specifications. Each piece is manufactured in authorized facilities and undergoes quality inspection to ensure it meets {brand}'s standards for style and durability.",
    authenticityFeatures: [
      "NFC authentication chip",
      "Holographic label",
      "QR code verification",
      "Style/SKU number validation",
      "Material composition tag"
    ]
  },

  automotive: {
    id: "automotive",
    name: "Automotive Parts",
    description: "Original equipment and aftermarket automotive parts",
    keywords: ["automotive", "car", "parts", "engine", "brake", "filter", "tire", "battery", "oem"],
    icon: "🚗",
    marketSize: "$400B",
    workflowSteps: [
      {
        id: "engineering",
        name: "Engineering Specification",
        description: "OEM design and specification verification",
        icon: "📐",
        duration: "Varies"
      },
      {
        id: "manufacturing",
        name: "Manufacturing",
        description: "Production in certified facilities",
        icon: "🏭",
        duration: "7-30 days"
      },
      {
        id: "testing",
        name: "Performance Testing",
        description: "Quality and safety standard compliance",
        icon: "🔧",
        duration: "3-7 days"
      },
      {
        id: "certification",
        name: "Certification",
        description: "ISO/SAE standard certification",
        icon: "✓",
        duration: "1-3 days"
      },
      {
        id: "packaging",
        name: "Packaging",
        description: "Part number labeling and sealing",
        icon: "📦",
        duration: "1 day"
      },
      {
        id: "distribution",
        name: "Distribution",
        description: "Shipment to authorized dealers",
        icon: "🚚",
        duration: "3-10 days"
      }
    ],
    storyTemplate: "This {productName} is a genuine {brand} part manufactured to exact OEM specifications. Each component undergoes rigorous testing to ensure it meets safety and performance standards for reliable vehicle operation.",
    authenticityFeatures: [
      "OEM part number verification",
      "Manufacturing date code",
      "Batch/lot tracking",
      "Certification marks",
      "Holographic label"
    ]
  },

  food: {
    id: "food",
    name: "Food & Beverage",
    description: "Premium food products, beverages, and specialty ingredients",
    keywords: ["food", "beverage", "wine", "spirits", "coffee", "chocolate", "gourmet", "organic"],
    icon: "🍷",
    marketSize: "$8.5T",
    workflowSteps: [
      {
        id: "sourcing",
        name: "Ingredient Sourcing",
        description: "Origin verification and quality grading",
        icon: "🌾",
        duration: "Seasonal"
      },
      {
        id: "production",
        name: "Production",
        description: "Manufacturing in food-safe facilities",
        icon: "🏭",
        duration: "1-30 days"
      },
      {
        id: "testing",
        name: "Safety Testing",
        description: "Microbiological and contaminant testing",
        icon: "🔬",
        duration: "2-5 days"
      },
      {
        id: "packaging",
        name: "Packaging",
        description: "Sealed packaging with batch codes",
        icon: "📦",
        duration: "1 day"
      },
      {
        id: "certification",
        name: "Certification",
        description: "USDA/FDA/organic certification",
        icon: "✓",
        duration: "1-2 days"
      },
      {
        id: "distribution",
        name: "Distribution",
        description: "Temperature-controlled logistics",
        icon: "🚚",
        duration: "1-7 days"
      }
    ],
    storyTemplate: "This {productName} was crafted using premium ingredients sourced from verified suppliers. Each batch is produced in certified facilities and undergoes safety testing to ensure it meets the highest standards for quality and freshness.",
    authenticityFeatures: [
      "Batch/lot number tracking",
      "Origin verification",
      "Organic certification",
      "Expiration date validation",
      "Temperature monitoring"
    ]
  },

  art: {
    id: "art",
    name: "Art & Collectibles",
    description: "Fine art, collectibles, and limited edition items",
    keywords: ["art", "painting", "sculpture", "collectible", "limited edition", "gallery", "artist"],
    icon: "🎨",
    marketSize: "$65B",
    workflowSteps: [
      {
        id: "creation",
        name: "Creation",
        description: "Original artwork creation by artist",
        icon: "🖌️",
        duration: "Varies"
      },
      {
        id: "authentication",
        name: "Expert Authentication",
        description: "Third-party expert verification",
        icon: "🔍",
        duration: "7-30 days"
      },
      {
        id: "documentation",
        name: "Documentation",
        description: "Provenance and history documentation",
        icon: "📜",
        duration: "3-7 days"
      },
      {
        id: "photography",
        name: "High-Res Photography",
        description: "Professional documentation photography",
        icon: "📸",
        duration: "1 day"
      },
      {
        id: "certification",
        name: "Certificate Issuance",
        description: "Certificate of authenticity creation",
        icon: "📄",
        duration: "1-2 days"
      },
      {
        id: "registry",
        name: "Art Registry",
        description: "Registration in global art databases",
        icon: "📚",
        duration: "1-3 days"
      }
    ],
    storyTemplate: "This {productName} is an original work by {artist}, authenticated by leading art experts. The piece comes with complete provenance documentation and is registered in international art databases, ensuring its authenticity and investment value.",
    authenticityFeatures: [
      "Artist signature verification",
      "Provenance documentation",
      "Expert authentication report",
      "High-resolution photography",
      "Registry database entry"
    ]
  },

  cosmetics: {
    id: "cosmetics",
    name: "Cosmetics & Beauty",
    description: "Skincare, makeup, fragrances, and beauty products",
    keywords: ["cosmetics", "makeup", "skincare", "perfume", "fragrance", "beauty", "serum", "cream"],
    icon: "💄",
    marketSize: "$511B",
    workflowSteps: [
      {
        id: "formulation",
        name: "Formulation",
        description: "Product formulation and testing",
        icon: "⚗️",
        duration: "30-90 days"
      },
      {
        id: "testing",
        name: "Safety Testing",
        description: "Dermatological and safety testing",
        icon: "🔬",
        duration: "14-30 days"
      },
      {
        id: "manufacturing",
        name: "Manufacturing",
        description: "Production in GMP facilities",
        icon: "🏭",
        duration: "7-14 days"
      },
      {
        id: "quality",
        name: "Quality Control",
        description: "Batch consistency and contamination testing",
        icon: "✓",
        duration: "3-5 days"
      },
      {
        id: "packaging",
        name: "Packaging",
        description: "Brand packaging with batch codes",
        icon: "📦",
        duration: "1-2 days"
      },
      {
        id: "retail",
        name: "Retail Distribution",
        description: "Distribution to authorized retailers",
        icon: "🏪",
        duration: "5-10 days"
      }
    ],
    storyTemplate: "This {productName} by {brand} was formulated using premium ingredients and underwent extensive safety testing. Each batch is manufactured in certified facilities and tested for consistency to deliver the quality and performance {brand} is known for.",
    authenticityFeatures: [
      "Batch number verification",
      "Holographic seal",
      "QR code authentication",
      "Ingredient list validation",
      "Manufacturing date code"
    ]
  },

  sports: {
    id: "sports",
    name: "Sports Equipment",
    description: "Athletic equipment, sportswear, and fitness gear",
    keywords: ["sports", "equipment", "athletic", "fitness", "ball", "racket", "club", "gear", "training"],
    icon: "⚽",
    marketSize: "$180B",
    workflowSteps: [
      {
        id: "design",
        name: "Performance Design",
        description: "Engineering for optimal performance",
        icon: "📐",
        duration: "60-180 days"
      },
      {
        id: "materials",
        name: "Material Selection",
        description: "High-performance material sourcing",
        icon: "🧵",
        duration: "30-60 days"
      },
      {
        id: "manufacturing",
        name: "Manufacturing",
        description: "Precision manufacturing process",
        icon: "🏭",
        duration: "14-30 days"
      },
      {
        id: "testing",
        name: "Performance Testing",
        description: "Professional athlete testing and validation",
        icon: "🔬",
        duration: "7-14 days"
      },
      {
        id: "certification",
        name: "Certification",
        description: "Sport federation approval",
        icon: "✓",
        duration: "3-7 days"
      },
      {
        id: "distribution",
        name: "Distribution",
        description: "Shipment to authorized dealers",
        icon: "🏪",
        duration: "5-15 days"
      }
    ],
    storyTemplate: "This {productName} by {brand} was engineered for peak athletic performance. Each piece undergoes rigorous testing to meet professional sport standards, ensuring it delivers the quality and durability athletes demand.",
    authenticityFeatures: [
      "Product ID verification",
      "Holographic label",
      "Serial number",
      "Sport certification marks",
      "QR code authentication"
    ]
  }
};

/**
 * Classify product into industry category
 */
export function classifyIndustry(keywords: string[], productName: string, description: string): string {
  const searchText = `${productName} ${description} ${keywords.join(" ")}`.toLowerCase();

  let bestMatch = "electronics"; // default
  let bestScore = 0;

  for (const [industryId, config] of Object.entries(INDUSTRIES)) {
    let score = 0;
    for (const keyword of config.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = industryId;
    }
  }

  return bestMatch;
}

/**
 * Generate industry-specific workflow
 */
export function generateWorkflow(industryId: string): WorkflowStep[] {
  const industry = INDUSTRIES[industryId];
  return industry ? industry.workflowSteps : INDUSTRIES.electronics.workflowSteps;
}

/**
 * Generate AI story for product
 */
export function generateStory(
  industryId: string,
  productName: string,
  brand: string,
  metadata: Record<string, any> = {}
): string {
  const industry = INDUSTRIES[industryId];
  if (!industry) return "";

  let story = industry.storyTemplate;
  story = story.replace(/\{productName\}/g, productName);
  story = story.replace(/\{brand\}/g, brand || "our brand");

  // Replace any other metadata placeholders
  for (const [key, value] of Object.entries(metadata)) {
    story = story.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }

  return story;
}

/**
 * Get industry configuration
 */
export function getIndustry(industryId: string): IndustryConfig | null {
  return INDUSTRIES[industryId] || null;
}

/**
 * Get all industries
 */
export function getAllIndustries(): IndustryConfig[] {
  return Object.values(INDUSTRIES);
}

/**
 * Calculate total addressable market
 */
export function getTotalMarketSize(): string {
  // Sum of all markets: ~$14T
  return "$14T+";
}
