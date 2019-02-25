import { readFileSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { showErrorMessage } from "./showErrorMessage";

export function loadWorkspaceFile(...pathArray: string[]) {
  try {
    const projectPath = vscode.workspace.rootPath;
    if (projectPath) {
      pathArray.unshift(projectPath);
      return readFileSync(path.join(...pathArray), {
        encoding: "UTF-8"
      });
    }
    throw new Error("Workspace file not found!");
  } catch (e) {
    console.error(e.stack);
    showErrorMessage(`Failed to load ${pathArray.join("/")}`);
  }
}
