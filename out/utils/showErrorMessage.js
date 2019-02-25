"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function showErrorMessage(errorMessage) {
    vscode.window.showErrorMessage(`VSCode UI Scripting: ${errorMessage}`);
}
exports.showErrorMessage = showErrorMessage;
//# sourceMappingURL=showErrorMessage.js.map