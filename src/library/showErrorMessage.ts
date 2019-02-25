import * as vscode from "vscode";

export function showErrorMessage(errorMessage: string) {
  vscode.window.showErrorMessage(`VSCode UI Scripting: ${errorMessage}`);
}
