#!/usr/bin/env node

import { Command } from "commander"
import readline from "readline"
import { execSync } from "child_process"
import { getGitDiff } from "./git.js"
import { generateCommit } from "./ai.js"

const program = new Command()

program
  .name("smartcommit")
  .description("Generate conventional git commit messages using AI")
  .version("1.0.1")
  .option("--auto", "Automatically commit without confirmation")

program.parse()

const options = program.opts()

async function run() {
  const diff = getGitDiff()

  if (!diff) {
    console.log("No staged changes found.")
    process.exit(0)
  }

  const message = await generateCommit(diff)

  if (options.auto) {
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, {
      stdio: "inherit",
    })
    return
  }

  console.log("\nSuggested commit message:\n")
  console.log(message)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question("\nUse this commit? (y/n): ", (answer) => {
    if (answer.toLowerCase() === "y") {
      execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, {
        stdio: "inherit",
      })
    } else {
      console.log("Commit cancelled.")
    }

    rl.close()
  })
}

run()