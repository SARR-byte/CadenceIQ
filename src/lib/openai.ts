import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateInsights(linkedInUrl: string, facebookUrl: string) {
  const prompt = `Please analyze the following social media profiles and provide insights about the person and their company:
LinkedIn: ${linkedInUrl}
Facebook: ${facebookUrl}

Please provide a summary of:
1. Company information
2. Personal interests and hobbies
3. Notable achievements
4. Potential conversation starters`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}