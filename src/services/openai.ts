import OpenAI from 'openai';
import { env } from '../config/env';
import { MethodologyResponse, UserResponse } from '../types/questionnaire';

// Debug logging
console.log('Environment variables check:', {
  OPENAI_API_KEY_EXISTS: !!process.env.OPENAI_API_KEY,
  OPENAI_API_KEY_LENGTH: process.env.OPENAI_API_KEY?.length,
  ENV_OPENAI_KEY_EXISTS: !!env.OPENAI_API_KEY,
  ENV_OPENAI_KEY_LENGTH: env.OPENAI_API_KEY?.length,
  NODE_ENV: process.env.NODE_ENV,
  ALL_ENV_KEYS: Object.keys(process.env),
});

if (!env.OPENAI_API_KEY) {
  console.error('OpenAI API key is missing. Environment state:', {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ENV_KEYS: Object.keys(process.env).filter(key => key.includes('OPENAI')),
    FULL_ENV: process.env
  });
  throw new Error('OpenAI API key is required');
}

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateMethodology(
  userResponses: UserResponse[]
): Promise<MethodologyResponse> {
  try {
    console.log('Generating methodology with OpenAI...', {
      apiKey: env.OPENAI_API_KEY ? 'Present' : 'Missing',
      responsesCount: userResponses.length
    });

    const prompt = `You are a world-class productivity coach analyzing a professional's work style.

Based on these responses:
${JSON.stringify(userResponses, null, 2)}

Create a personalized productivity methodology that includes:
1. Ideal work/focus intervals
2. Energy management strategy
3. Top 3 productivity recommendations
4. Potential productivity blockers to watch
5. Suggested tools/techniques
6. A detailed weekly schedule that:
   - Shows typical weekday and weekend schedules
   - Uses hourly time blocks from 06:00 to 22:00
   - Aligns with their energy patterns
   - Incorporates recommended work intervals
   - Schedules deep work during peak focus times
   - Includes breaks, exercise, and personal time
   - Allocates time for meetings and shallow work
   - Provides a lighter schedule for weekends focused on rest and personal activities

Response should be:
- Specific to the individual
- Actionable
- Under 500 words for the methodology section
- Written in motivational, coaching tone

Format the response in JSON with the following structure:
{
  "workIntervals": "string",
  "energyStrategy": "string",
  "recommendations": ["string", "string", "string"],
  "productivityBlockers": ["string", "string", "string"],
  "suggestedTools": ["string", "string", "string"],
  "weeklySchedule": {
    "schedule": [
      {
        "day": "Monday",
        "blocks": [
          {
            "startTime": "06:00",
            "endTime": "07:00",
            "activity": "Morning Exercise",
            "category": "exercise",
            "description": "Start the day with energizing workout"
          },
          {
            "startTime": "09:00",
            "endTime": "10:30",
            "activity": "Deep Work: Priority Tasks",
            "category": "deep-work",
            "description": "Focus on most important tasks when energy is high"
          }
        ]
      },
      {
        "day": "Saturday",
        "blocks": [
          {
            "startTime": "09:00",
            "endTime": "10:00",
            "activity": "Leisure Reading",
            "category": "personal",
            "description": "Start weekend with relaxing activity"
          }
        ]
      }
    ],
    "notes": [
      "Schedule is flexible and can be adjusted based on daily energy levels",
      "Deep work blocks can be swapped with other deep work activities as needed",
      "Weekend schedule is intentionally lighter to allow for rest and spontaneity"
    ]
  }
}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
    });

    const rawResponse = completion.choices[0].message.content || '{}';
    const parsedResponse = JSON.parse(rawResponse);

    return {
      ...parsedResponse,
      rawResponse,
    };
  } catch (error) {
    console.error('Error generating methodology:', error);
    throw new Error(`Failed to generate methodology: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 