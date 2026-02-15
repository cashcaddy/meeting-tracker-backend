import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/analyze", async (req, res) => {
  const { notes } = req.body;

  if (!notes) {
    return res.status(400).json({ error: "No notes provided" });
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Extract clear action items with task, owner, and deadline."
        },
        {
          role: "user",
          content: notes
        }
      ]
    })
  });

  const data = await response.json();

  res.json({
    result: data.choices[0].message.content
  });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
