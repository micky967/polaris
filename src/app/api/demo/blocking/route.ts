// POST localhost:3000/api/demo/blocking
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';

// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
// });


export async function POST () {
    const response = await generateText({
    model: google('gemini-2.5-flash-lite') || anthropic('claude-3-haiku-20240307'),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
    });
    return Response.json({ response });
}