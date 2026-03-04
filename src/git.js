import { execSync } from "child_process"

export function getGitDiff() {
  try {
    const diff = execSync("git diff --cached").toString()
    return diff
  } catch {
    console.error("Failed to get git diff")
    process.exit(1)
  }
}