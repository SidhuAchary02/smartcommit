# smartcommit

### Overview

Smartcommit is a lightweight, AI-powered CLI tool that generates short Conventional Commits–style messages from your staged Git changes. It reads your staged diff, sends it to Groq’s chat completions API, and then prompts you to confirm and run the corresponding `git commit -m` command. This section covers everything you need to install and configure smartcommit on your machine.

### watch the video!!

[![Watch the video](https://i9.ytimg.com/vi/DCd9rhrY6wI/mqdefault.jpg?sqp=CKTXoM0G-oaymwEmCMACELQB8quKqQMa8AEB-AHSCIAC0AWKAgwIABABGEogTShlMA8=&rs=AOn4CLC_e7R6dEfaKxfbFtw3X_LjFc-VjQ)](https://www.youtube.com/watch?v=DCd9rhrY6wI)   

`smartcommit` reads the current `git diff`, sends it to an LLM, and proposes a concise commit message following the **Conventional Commits** format.

---

## Installation

Install globally:

```bash
npm install -g @sidhuachary/smartcommit
```


## 1. Getting Started 


### Prerequisites

- **Node.js >= 18**
- **npm**
- **Git**

smartcommit shells out to `git diff --cached` to read your staged changes and to `git commit -m` to create the commit. Ensure the `git` command is available in your `$PATH`:


#### Local (Dev) Installation

To add smartcommit as a development dependency in your project:

```bash
npm install --save-dev smartcommit
```

Then invoke it via `npx`:

```bash
npx smartcommit
```

#### Installation from Source

If you prefer to run directly from the cloned repository:

```bash
git clone https://github.com/SidhuAchary02/smartcommit.git
cd smartcommit
npm install
```

This installs the following runtime dependencies as declared in `package.json`:

- chalk
- commander
- dotenv
- groq-sdk

### Project Structure and Packaging

- **Entry point**: `./src/cli.js`

Exported as the `smartcommit` executable via the `bin` field .

- **Source code**: All implementation files live under `src/`:- `src/cli.js` – CLI orchestration
- `src/git.js` – Git diff retrieval
- `src/ai.js`  – AI completion integration

- **Package contents**: Only the `src/` directory is included in the published npm package, as specified by:

```json
  "files": [
    "src"
  ]
```

- **Environment variables**:

smartcommit uses `dotenv/config` to load `GROQ_API_KEY` from a local `.env` file if present. Ensure you set:

```bash
  export GROQ_API_KEY=your_api_key_here
```

### Verifying Installation

After installation, confirm that all tools are available:

```bash
node --version    # should be >=18
npm --version
git --version
smartcommit --help
```

If everything is configured correctly, `smartcommit --help` will display usage instructions and available options.

## Quickstart

Follow these steps to generate and apply a commit message for your staged changes.

### 1. Stage Your Changes

Use Git to add your modifications to the index:

```bash
git add .
```

### 2. Run smartcommit


```bash
smartcommit
```


### 3. Handle “No staged changes”

If you haven’t staged anything, smartcommit will detect an empty diff and exit immediately:

```plaintext
No staged changes found.
```

### 4. View the Suggested Commit Message

When staged changes exist, smartcommit contacts the AI service and prints:

```plaintext
Suggested commit message:

<your-proposed-message>
```

### 5. Confirm or Cancel

You’ll be prompted:

```plaintext
Use this commit? (y/n):
```

– Type y and press Enter to commit with the suggested message.

– Type n and press Enter to cancel without committing.

#### Example Session

```bash
$ git add src/parser.js
$ smartcommit

Suggested commit message:

feat(parser): support recursive include statements

Use this commit? (y/n): y
[master 1a2b3c4] feat(parser): support recursive include statements
 1 file changed, 25 insertions(+), 3 deletions(-)
✅ Commit created.
```


### Commit Style

The generated message follows Conventional Commits:

Examples:

- feat(api): add user authentication endpoint
- fix(cli): handle empty git diff
- docs(readme): update installation instructions
- refactor(core): simplify diff parser

