import typescript from "rollup-plugin-typescript2";
import * as fs from "fs";
import { spawn } from "child_process";

const readJSONFile = (filePath) => {
    const data = fs.readFileSync(filePath, { encoding: "utf8" });
    return JSON.parse(data);
};

const tsx_link = readJSONFile("./tsx-link.json");

export default {
    input: tsx_link["input"],
    output: {
        file: tsx_link["output"],
        format: "iife",
        name: "MyApp",
    },
    plugins: [
        typescript({
            tsconfig: "tsconfig.json",
        }),
        {
            name: "clean-dist-folder",
            buildStart() {
                return new Promise((resolve, reject) => {
                    const command = spawn("npm", ["run", "clean"], { stdio: "inherit", shell: true });
                    command.on("exit", (code, signal) => {
                        if (code !== 0) {
                            reject(new Error(`Command failed with code ${code} and signal ${signal}`));
                        } else {
                            resolve();
                        }
                    });
                });
            },
        },
    ],
};
