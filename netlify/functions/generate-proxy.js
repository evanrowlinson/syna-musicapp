const OpenAI = require("openai");
const fetch = require("node-fetch");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }
    let body;
    try {
        body = JSON.parse(event.body);
    } catch {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid JSON" }),
        };
    }
    const { moodInputs } = body;

    if (!moodInputs) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing moodInputs" }),
        };
    }

    try {
        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const gptResponse = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "Return JSON only. Include: playlist (5 songs), artPrompt (for DALL-E), museumIds (3 artwork IDs)",
                },
                {
                    role: "user",
                    content: `Generate a playlist, art prompt, and museum IDs based on the mood inputs: ${JSON.stringify(
                        moodInputs
                    )}`,
                },
            ],
            response_format: { type: "json_object" },
        });

        const {playlist, artPrompt, museumIds} = JSON.parse(gptResponse.choices[0].message.content);
        const dalleResponse = await client.images.generate({
            model: "dall-e-3",
            prompt: artPrompt,
            n: 1,
            size: "1024x1024",
        });
        const coverArt= dalleResponse.data[0].url;

        const museumArt = await Promise.all(
            museumIds.map(async (id) => {
                const museumResponse = await fetch(
                    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                );
                return await response.json();
            })
        );

        const results = {
            playlist,
            coverArt,
            museumArt,
        };
        
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(results),
        };
    } catch (err) {
        console.error("Serverless error:", err);
        return {
            statusCode: err.status ?? 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};  
