import express from "express";
import OpenAI from "openai";
import path from "path";

const app = express();
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", (req, res) => {
  const { message, sessionHistory } = req.body;

  let reply;

  // Vérifie si l'assistant a déjà parlé
  const assistantHasSpoken = sessionHistory.some(m => m.role === "assistant");

  if (!assistantHasSpoken) {
    reply = "Bonjour ! Je suis votre assistant. Comment puis-je vous aider aujourd'hui ?";
  } else {
    // Logique normale pour générer la réponse à l'utilisateur
    reply = generateReply(message, sessionHistory); 
  }

  res.json({ reply });
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
