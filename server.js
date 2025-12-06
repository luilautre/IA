import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

// NE PAS mélanger avec l'ancienne Configuration/OpenAIApi
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
