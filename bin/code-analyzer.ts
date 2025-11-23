#!/usr/bin/env node
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { createRequire } from "module";

// ----------------- helpers -----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nodeRequire = createRequire(import.meta.url);

function parseArgs(): { forceDev?: boolean; forceProd?: boolean } {
  const args = process.argv.slice(2);
  return {
    forceDev: args.includes("--dev"),
    forceProd: args.includes("--prod"),
  };
}

// ----------------- main -----------------
async function startServer() {
  const { forceDev, forceProd } = parseArgs();

  const projectRoot = process.cwd();
  const reportDir = path.join(projectRoot, ".code-analyzer");
  const libRoot = path.resolve(__dirname, "..");
  const buildDir = path.join(libRoot, ".next");
  const configPath = path.join(projectRoot, "code-analyzer.config.cjs");

  // prepare report dir
  await fs.remove(reportDir);
  await fs.ensureDir(reportDir);
  console.log(chalk.green(`📂 Report directory: ${reportDir}`));

  // load config safely
  let configJson = "{}";
  if (fs.existsSync(configPath)) {
    try {
      configJson = JSON.stringify(nodeRequire(configPath));
    } catch (err) {
      console.warn(chalk.red(`⚠️ Failed to load config: ${err}`));
    }
  } else {
    console.warn(chalk.yellow("⚠️ No config file found, using defaults"));
  }

  // determine mode
  let isProd: boolean;
  if (forceDev) {
    isProd = false;
  } else if (forceProd) {
    isProd = true;
  } else {
    isProd = fs.existsSync(buildDir);
  }

  const command = isProd ? `npx next start -p 3001` : `npx next dev -p 3001`;

  console.log(chalk.yellow(`🚀 Mode: ${isProd ? "production" : "development"}`));
  console.log(chalk.gray(`🔧 Command: ${command}`));

  // run Next.js
  const server = exec(command, {
    cwd: libRoot,
    env: {
      ...process.env,
      NEXT_PUBLIC_PROJECT_ROOT: projectRoot,
      NEXT_PUBLIC_REPORT_DIR: reportDir,
      NEXT_PUBLIC_LIB_ROOT: libRoot,
      NEXT_PUBLIC_CONFIG_JSON: configJson,
    },
  });

  server.stdout?.on("data", d => console.log(chalk.gray(`[Next] ${d}`)));
  server.stderr?.on("data", d => console.log(chalk.red(`[Next Error] ${d}`)));
  server.on("close", code => console.log(chalk.blue(`Server exited with code ${code}`)));
}

startServer().catch(err => {
  console.error(chalk.red("💥 Fatal Error"), err);
  process.exit(1);
});
