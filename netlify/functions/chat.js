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
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      })
    });

    const data = await response.json();
console.log("🔑 Clé API détectée :", OPENAI_API_KEY ? "Oui" : "Non");

let reply;

if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
  reply = data.choices[0].message.content;
} else {
  reply = "❗Réponse GPT vide ou erreur. Vérifie ta clé ou ton modèle.";
  console.error("⚠️ Réponse inattendue d'OpenAI :", data);
}

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("Erreur GPT :", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "❗Erreur GPT : " + error.message })
    };
  }
};
