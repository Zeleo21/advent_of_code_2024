import * as path from "path";
import * as fs from 'node:fs'
import { fileURLToPath } from "url";
import * as readline from "readline";
import * as events from "events";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export async function readLines(filePath) {
    const res = []
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        res.push(line)
    });
    await events.once(rl,'close');
    return res
}