#!/usr/bin/env node

import { getGitDiff } from "./git.js"
import { generateCommit } from "./ai.js"
import { execSync } from "child_process"
import readline from "readline"

async function main() {
  const diff = getGitDiff()

  if (!diff) {
    console.log("No staged changes found.")
    return
  }

  const message = await generateCommit(diff)

  console.log("\nSuggested commit message:\n")
  console.log(message)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question("\nUse this commit? (y/n): ", (answer) => {
    if (answer.toLowerCase() === "y") {
      execSync(`git commit -m "${message}"`, { stdio: "inherit" })
      console.log("✅ Commit created.")
    } else {
      console.log("❌ Commit cancelled.")
    }

    rl.close()
  })
}

main()