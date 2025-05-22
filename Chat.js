const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("Réponse brute GPT :", data);

    const reply = data.choices?.[0]?.message?.content || "Réponse non disponible.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("Erreur GPT :", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "❗Erreur lors de l'appel à GPT." })
    };
  }
};
