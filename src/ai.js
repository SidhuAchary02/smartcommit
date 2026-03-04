import "dotenv/config"
import Groq from "groq-sdk"

if (!process.env.GROQ_API_KEY) {
  console.error("Please set GROQ_API_KEY environment variable.")
  process.exit(1)
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})


export async function generateCommit(diff) {
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `
You are a git expert.

Return ONLY a commit message using Conventional Commits format.

Rules:
- return ONLY the commit message
- no explanations
- no markdown
- max 12 words

Example:
feat(auth): add JWT verification middleware
`
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
