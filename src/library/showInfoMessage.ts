import * as vscode from "vscode";

export function showInfoMessage(message: string) {
  vscode.window.showInformationMessage(`VSCode UI Scripting: ${message}`);
}
