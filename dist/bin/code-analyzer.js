#!/usr/bin/env node
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { exec } from "child_process";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function startServer() {
    const projectRoot = process.cwd();
    const reportDir = path.join(projectRoot, ".code-analyzer");
    const libRoot = path.resolve(__dirname, "..");
    await fs.remove(reportDir);
    await fs.ensureDir(reportDir);
    console.log(chalk.green(`✅ Prepared report directory: ${reportDir}`));
    console.log(chalk.green(`✅ Using library root directory: ${libRoot}`));
    console.log(chalk.green(`✅ Using project root directory: ${projectRoot}`));
    const command = `npx next start -p 3001`;
    const server = exec(command, {
        cwd: libRoot,
        env: {
            ...process.env,
            NEXT_PUBLIC_PROJECT_ROOT: projectRoot,
            NEXT_PUBLIC_REPORT_DIR: reportDir,
            NEXT_PUBLIC_LIB_ROOT: libRoot
        },
    }, (err) => {
        console.log(chalk.red(`[Server] ${err?.toString()}`));
    });
    server.stdout?.on("data", (data) => {
        console.log(chalk.gray(`[Server] ${data.toString()}`));
    });
    server.stderr?.on("data", (data) => {
        console.error(chalk.red(`[Server Error] ${data}`));
    });
    server.on("close", (code) => {
        console.log(chalk.blue(`Server process exited with code ${code}`));
    });
}
async function run() {
    try {
        await startServer();
    }
    catch (err) {
        console.error(chalk.red("[Error]"), err);
        process.exit(1);
    }
}
run();
