# User Guide — Test Tools: JSHint, Jalangi2, Snyk & Madge

This document explains how to use and test the four analysis and QA tools integrated into the repo:
- **JSHint** — static code style and syntax linter.
- **Jalangi2** — dynamic runtime analysis (coverage, taint, and fuzzing).
- **Snyk** — dependency vulnerability and license scanner.
- **Madge** — module dependency visualizer and circular import detector.

---

## 🚀 General Setup & Prerequisites

Before using any tools, ensure you have **Node.js** and **npm** installed.

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**: All tools are listed as `devDependencies` in `package.json`. Install them by running:
    ```bash
    npm install
    ```
This guide assumes all tools are run from the project's root directory. Most commands are wrapped in **npm scripts** for convenience. Check the `"scripts"` section of `package.json` for the exact names used in this project.

---

## 🧹 JSHint (Static Linter)

JSHint scans your JavaScript files for common errors, potential bugs, and code style violations without executing the code.

### Configuration

All rules are defined in the `.jshintrc` file in the project root. You can modify this file to enforce or relax specific rules for the project.

### How to Run

You can run JSHint on the entire codebase using the designated npm script:

```bash
# This is the recommended way
npm run lint
Alternatively, to run it on a specific file or directory, you can call it directly from your node_modules:

Bash

# Run on the entire 'src' directory
npx jshint src

# Run on a single file
npx jshint src/app.js
Interpreting Output
JSHint will list any violations it finds, along with the file name, line number, and a description of the error. Your goal is to run npm run lint with zero errors reported.

Example Error: src/app.js: line 10, col 5, 'myVar' is defined but never used. (W098)

🔬 Jalangi2 (Dynamic Analysis)
Jalangi2 analyzes your code as it runs. This allows it to perform complex tasks like tracking code coverage or finding security issues (like Taint Analysis).

How it Works
Jalangi2 first instruments your code (rewrites it to add tracking hooks) and then executes the instrumented code using a specific analysis script.

How to Run
Dynamic analysis is complex and is always run via npm scripts.

1. Code Coverage
To check which lines of code are executed during your tests:

Bash

# This will run your test suite using Jalangi's coverage analysis
npm run coverage
After the run, check the console output or look for a coverage.json file for a detailed report.

2. Taint Analysis
Taint analysis tracks the flow of "tainted" (untrusted) data, such as user input, to see if it reaches a "sink" (a sensitive operation like eval() or database query) without being sanitized.

Bash

# This runs the app with taint tracking enabled
npm run taint
The console will log any detected flow of untrusted data to a sensitive sink, helping you identify potential injection vulnerabilities.

🛡️ Snyk (Vulnerability & License Scanner)
Snyk scans your project's dependencies (listed in package.json and package-lock.json) for known security vulnerabilities and identifies the licenses of your packages.

First-Time Setup
Before your first scan, you need to authenticate the Snyk CLI with your account.

Create a free Snyk account.

Run the following command and follow the browser prompts:

Bash

npx snyk auth
How to Run
1. Test for Vulnerabilities
To run a one-time scan and see a report of all current issues:

Bash

# Recommended: Use the npm script
npm run security-check

# Or run Snyk directly
npx snyk test
Snyk will display a tree of your dependencies, highlighting vulnerabilities and their severity (Low, Medium, High, Critical). It will often suggest a npm update or npm override command to fix them.

2. Monitor Project
To continuously monitor the project, take a snapshot of its current dependencies and upload it to the Snyk dashboard:

Bash

npx snyk monitor
Snyk will now alert you via email if new vulnerabilities are discovered in any of the dependencies you are using.

📈 Madge (Dependency Visualizer)
Madge helps you understand your module dependencies. Its two primary uses are generating a visual graph and, most importantly, detecting circular dependencies.

A circular dependency (e.g., A imports B, and B imports A) can lead to subtle bugs and undefined modules at runtime.

How to Run
1. Check for Circular Dependencies
This is the most critical function. This command should be run frequently, especially before committing new code.

Bash

# Recommended: Use the npm script
npm run deps:check

# Or run Madge directly on your project's entry point
npx madge --circular src/index.js
If no circular dependencies are found, the command will exit silently. If it finds a circular dependency, it will print the chain and exit with an error code (which will fail a CI build).

Example Error: ✖ Found 1 circular dependency: 1) src/moduleA.js > src/moduleB.js > src/moduleA.js