import express from "express";
import OpenAI from "openai";
import path from "path";

const app = express();
app.use(express.json());

// Pour servir le dossier /public
app.use(express.static(path.join(process.cwd(), "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint pour le chat
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

// Route par défaut pour renvoyer index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
