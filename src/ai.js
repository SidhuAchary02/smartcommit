import "dotenv/config"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function generateCommit(diff) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "Generate a concise git commit message using conventional commits format."
      },
      {
        role: "user",
        content: diff
      }
    ]
  })

  return response.choices[0].message.content
  .replace(/```.*?```/gs, "")
  .replace(/#+/g, "")
  .trim()
}
