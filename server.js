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
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Tu es un assistant pour le site ia-qdqq.onrender.com. Tu sais que l'utilisateur est sur cette page et tu peux fournir des infos contextuelles sur le site."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
