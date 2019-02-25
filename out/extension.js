"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const loadConfiguration_1 = require("./library/loadConfiguration");
const promptCommand_1 = require("./library/promptCommand");
const showInfoMessage_1 = require("./library/showInfoMessage");
const promptCommandQuestions_1 = require("./library/promptCommandQuestions");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "scriptUI" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("extension.scriptUI", (fileInfo) => __awaiter(this, void 0, void 0, function* () {
        // Display a message box to the user
        showInfoMessage_1.showInfoMessage("Loading configration...");
        const config = loadConfiguration_1.loadConfiguration(fileInfo);
        if (config) {
            console.log("config", config);
            const command = yield promptCommand_1.promptCommand(config);
            if (command) {
                const answers = yield promptCommandQuestions_1.promptCommandQuestions(command);
                console.log("answers", answers);
            }
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map