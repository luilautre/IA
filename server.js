// server.js
import express from "express";
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ta clé OpenAI ici
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
