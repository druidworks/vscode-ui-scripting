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
const vscode = require("vscode");
const showInfoMessage_1 = require("./showInfoMessage");
function promptCommand(config) {
    return __awaiter(this, void 0, void 0, function* () {
        showInfoMessage_1.showInfoMessage("Please select a command from the pick list");
        const commandNames = [];
        let commandDictionary = {};
        config.commands.map(command => command.name);
        for (let i = 0; i < config.commands.length; i++) {
            const commandName = config.commands[i].name;
            commandNames.push(commandName);
            commandDictionary[commandName] = config.commands[i];
        }
        const commandName = yield vscode.window.showQuickPick(commandNames);
        return commandName ? commandDictionary[commandName] : null;
    });
}
exports.promptCommand = promptCommand;
//# sourceMappingURL=promptCommand.js.map