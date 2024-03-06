import fetch from 'node-fetch';

export default async function (req, res) {
    // extracting artworkId and artist from the request body
    const { title, artist } = req.body;
    const prompt = `Tell me more about "${title}" by ${artist}.`;

    try {
        // try making a request to the OpenAI API
                const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4-0125-preview", // change model here
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API responded with ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json({text: data.choices[0].text});

    } catch (error) {

        console.error("Error fetching information: ", error);
        res.status(500).send("An error occurred while fetching information.");
    }
}
