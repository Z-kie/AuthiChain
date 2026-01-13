import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    // Use GPT-4 Vision to analyze the product image
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this product image and provide:
              1. Product name
              2. Category (Electronics, Fashion, Luxury, Food & Beverage, Pharmaceuticals, Automotive, or Other)
              3. Brand (if identifiable)
              4. Brief description

              Respond in JSON format:
              {
                "name": "product name",
                "category": "category",
                "brand": "brand name or Unknown",
                "description": "brief description",
                "confidence": 0.95
              }`,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      )
    }

    // Parse the JSON response
    const result = JSON.parse(content)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Classification error:', error)
    return NextResponse.json(
      { error: 'Failed to classify image' },
      { status: 500 }
    )
  }
}
