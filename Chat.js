const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
  const reply = data.choices?.[0]?.message?.content ?? "Une erreur est survenue.";

  return {
    statusCode: 200,
    body: JSON.stringify({ reply })
  };
};
