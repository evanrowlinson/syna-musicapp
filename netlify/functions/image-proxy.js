const OpenAI = require('openai');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body' }),
    };
  }

  const { prompt, size = '1024x1024', quality = 'standard' } = body;

  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'prompt is required' }),
    };
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size,
      quality,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.error('DALL-E error:', err.message);
    return {
      statusCode: err.status ?? 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};