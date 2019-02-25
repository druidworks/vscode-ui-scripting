"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
const vscode = require("vscode");
function loadWorkspaceFile(...pathArray) {
    try {
        const projectPath = vscode.workspace.rootPath;
        if (projectPath) {
            pathArray.unshift(projectPath);
            return fs_1.readFileSync(path.join(...pathArray), {
                encoding: "UTF-8"
            });
        }
        throw new Error("Workspace file not found!");
    }
    catch (e) {
        console.error(e.stack);
        vscode.window.showErrorMessage(`Failed to load ${pathArray.join("/")}`);
    }
}
exports.loadWorkspaceFile = loadWorkspaceFile;
//# sourceMappingURL=file.js.map