"use client"

import { ProductClassificationCard } from "@/components/ui/product-classification-card"
import { SeedToSaleTimeline } from "@/components/ui/seed-to-sale-timeline"
import { AIStoryPlayer } from "@/components/ui/ai-story-player"

export default function ComponentsDemo() {
  // Example data for Product Classification Card
  const categories = [
    { name: "Food & Beverage", level: 0 },
    { name: "Organic Products", level: 1 },
    { name: "Fresh Produce", level: 2 },
    { name: "Leafy Greens", level: 3 },
  ]

  const features = [
    { name: "Color", value: "Dark Green" },
    { name: "Texture", value: "Crisp" },
    { name: "Origin", value: "Organic Farm" },
    { name: "Weight", value: "250g" },
  ]

  // Example data for Seed-to-Sale Timeline
  const checkpoints = [
    {
      id: "1",
      title: "Seed Planted",
      date: "January 15, 2024",
      description: "Organic spinach seeds planted in greenhouse",
      verified: true,
      icon: "seed" as const,
      details: [
        { label: "Location", value: "Greenhouse A-12" },
        { label: "Seed Type", value: "Organic Spinach" },
        { label: "Quantity", value: "500 seeds" },
        { label: "Temperature", value: "22°C" },
      ],
    },
    {
      id: "2",
      title: "First Watering",
      date: "January 16, 2024",
      description: "Initial watering with organic nutrient solution",
      verified: true,
      icon: "water" as const,
      details: [
        { label: "Water Amount", value: "5 liters" },
        { label: "pH Level", value: "6.5" },
        { label: "Nutrients", value: "Organic Mix" },
      ],
    },
    {
      id: "3",
      title: "Growth Phase",
      date: "February 1, 2024",
      description: "Plants reached 10cm height with healthy leaves",
      verified: true,
      icon: "grow" as const,
      details: [
        { label: "Height", value: "10cm" },
        { label: "Leaf Count", value: "6-8 leaves" },
        { label: "Health Status", value: "Excellent" },
      ],
    },
    {
      id: "4",
      title: "Harvested",
      date: "February 20, 2024",
      description: "Fresh spinach harvested at peak quality",
      verified: true,
      icon: "harvest" as const,
      details: [
        { label: "Total Weight", value: "25 kg" },
        { label: "Quality Grade", value: "A+" },
        { label: "Harvester", value: "John Smith" },
      ],
    },
    {
      id: "5",
      title: "Packaged",
      date: "February 21, 2024",
      description: "Packaged in eco-friendly containers",
      verified: true,
      icon: "package" as const,
      details: [
        { label: "Package Type", value: "Recyclable" },
        { label: "Batch Number", value: "SP-2024-021" },
      ],
    },
    {
      id: "6",
      title: "Shipped",
      date: "February 22, 2024",
      description: "En route to distribution center",
      verified: false,
      icon: "ship" as const,
    },
  ]

  // Example data for AI Story Player
  const transcript = [
    {
      timestamp: 0,
      text: "Welcome to the story of this organic spinach.",
      speaker: "Narrator",
    },
    {
      timestamp: 5,
      text: "It all began in January, when we carefully selected premium organic seeds.",
      speaker: "Narrator",
    },
    {
      timestamp: 12,
      text: "Each seed was planted with care in our state-of-the-art greenhouse facility.",
      speaker: "Narrator",
    },
    {
      timestamp: 20,
      text: "Over the next few weeks, we nurtured the plants with sustainable practices.",
      speaker: "Narrator",
    },
    {
      timestamp: 28,
      text: "The result is the fresh, healthy spinach you see today.",
      speaker: "Narrator",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AuthiChain Custom Components
          </h1>
          <p className="text-lg text-gray-600">
            Beautiful, interactive components for product tracking and storytelling
          </p>
        </div>

        {/* Product Classification Card */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Product Classification Card
            </h2>
            <p className="text-gray-600">
              AI-powered product classification with confidence scoring and feature detection
            </p>
          </div>
          <ProductClassificationCard
            categories={categories}
            confidence={94}
            features={features}
            onEdit={() => alert("Edit clicked!")}
          />
        </section>

        {/* Seed-to-Sale Timeline */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Seed-to-Sale Timeline
            </h2>
            <p className="text-gray-600">
              Track the complete journey from seed to consumer with blockchain verification
            </p>
          </div>
          <SeedToSaleTimeline checkpoints={checkpoints} />
        </section>

        {/* AI Story Player */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              AI Story Player
            </h2>
            <p className="text-gray-600">
              Engaging audio stories with synchronized transcripts and waveform visualization
            </p>
          </div>
          <AIStoryPlayer
            title="The Journey of Organic Spinach"
            audioUrl="/audio/story.mp3" // Replace with actual audio URL
            duration={35}
            transcript={transcript}
            onDownload={() => alert("Download clicked!")}
          />
        </section>

        {/* Usage Examples */}
        <section className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Usage Examples
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Classification Card</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { ProductClassificationCard } from "@/components/ui/product-classification-card"

<ProductClassificationCard
  categories={[
    { name: "Food & Beverage", level: 0 },
    { name: "Organic Products", level: 1 },
  ]}
  confidence={94}
  features={[
    { name: "Color", value: "Dark Green" },
    { name: "Texture", value: "Crisp" },
  ]}
  onEdit={() => console.log("Edit")}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Seed-to-Sale Timeline</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { SeedToSaleTimeline } from "@/components/ui/seed-to-sale-timeline"

<SeedToSaleTimeline
  checkpoints={[
    {
      id: "1",
      title: "Seed Planted",
      date: "January 15, 2024",
      description: "Organic seeds planted",
      verified: true,
      icon: "seed",
      details: [{ label: "Location", value: "Greenhouse A-12" }]
    }
  ]}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">AI Story Player</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { AIStoryPlayer } from "@/components/ui/ai-story-player"

<AIStoryPlayer
  title="Product Story"
  audioUrl="/audio/story.mp3"
  duration={35}
  transcript={[
    { timestamp: 0, text: "Welcome...", speaker: "Narrator" }
  ]}
  onDownload={() => console.log("Download")}
/>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
