import express from "express";
import OpenAI from "openai";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  const { message, sessionHistory } = req.body;

  let reply;

  // Vérifie si l'assistant a déjà parlé
  const assistantHasSpoken = sessionHistory.some(m => m.role === "assistant");

  if (!assistantHasSpoken) {
    reply = "Bonjour ! Je suis votre assistant. Comment puis-je vous aider aujourd'hui ?";
  } else {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: sessionHistory.concat([{ role: "user", content: message }])
      });
      reply = completion.choices[0].message.content;
    } catch (err) {
      console.error(err);
      reply = "Oups, une erreur est survenue !";
    }
  }

  res.json({ reply });
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
