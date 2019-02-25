"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function showInfoMessage(message) {
    vscode.window.showInformationMessage(`VSCode UI Scripting: ${message}`);
}
exports.showInfoMessage = showInfoMessage;
//# sourceMappingURL=showInfoMessage.js.map