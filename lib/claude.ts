import Anthropic from '@anthropic-ai/sdk';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import Constants from 'expo-constants';
import { NutritionResult } from '@/types/nutrition';

const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_ANTHROPIC_API_KEY ||
               process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

if (!apiKey) {
  console.warn('Anthropic API key not found. Set EXPO_PUBLIC_ANTHROPIC_API_KEY in .env');
}

const client = new Anthropic({
  apiKey: apiKey || 'dummy-key',
  dangerouslyAllowBrowser: true,
});

async function resizeImage(uri: string): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1024 } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
}

export async function analyzeFood(imageUri: string): Promise<NutritionResult> {
  try {
    // Resize image to reduce API payload
    const resizedUri = await resizeImage(imageUri);

    // Read image as base64
    const base64 = await FileSystem.readAsStringAsync(resizedUri, {
      encoding: 'base64',
    });

    const ext = resizedUri.split('.').pop()?.toLowerCase();
    const mediaType = ext === 'png' ? 'image/png' : 'image/jpeg';

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            {
              type: 'text',
              text: `You are a professional nutritionist and food recognition AI.
Analyze this food image and return ONLY a valid JSON object with no markdown fences, no explanation.

Required format:
{
  "foodName": "Specific dish name",
  "confidence": <integer 70-99>,
  "calories": <integer kcal for one serving>,
  "servingSize": "e.g. 1 plate (350g)",
  "carbs": <grams, integer>,
  "protein": <grams, integer>,
  "fat": <grams, integer>,
  "fiber": <grams, integer>,
  "sugar": <grams, integer>,
  "saturatedFat": <grams, one decimal>,
  "sodium": <mg, integer>,
  "potassium": <mg, integer>,
  "cholesterol": <mg, integer>,
  "calcium": <mg, integer>,
  "iron": <mg, one decimal>,
  "vitaminC": <mg, integer>,
  "insight": "2-3 sentence nutritional commentary specific to this dish with actionable advice.",
  "alternatives": [
    {"name": "Healthier alternative 1", "calories": <integer>, "diff": <negative integer>},
    {"name": "Healthier alternative 2", "calories": <integer>, "diff": <negative integer>},
    {"name": "Lighter version", "calories": <integer>, "diff": <negative integer>}
  ]
}

Rules:
- Be specific (e.g. "Butter Chicken with Basmati Rice", not just "Indian food")
- Estimate for a typical restaurant or home serving
- insight must reference specific nutrients found in THIS dish
- alternatives must be genuinely related foods with fewer calories
- Return ONLY the JSON object, nothing else`,
            },
          ],
        },
      ],
    });

    const text = response.content
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')
      .trim();

    // Remove markdown code fences if present
    const jsonText = text.replace(/^```json?\s*/i, '').replace(/\s*```\s*$/i, '').trim();

    const result = JSON.parse(jsonText) as NutritionResult;

    // Validate result
    if (!result.foodName || result.confidence < 50) {
      throw new Error('Food not recognized with sufficient confidence');
    }

    return result;
  } catch (error) {
    console.error('Claude API error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to analyze food: ${error.message}`);
    }
    throw error;
  }
}
