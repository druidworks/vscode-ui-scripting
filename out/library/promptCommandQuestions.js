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
function promptCommandQuestions(command) {
    return __awaiter(this, void 0, void 0, function* () {
        showInfoMessage_1.showInfoMessage("Please answer the following command questions");
        const answers = [];
        for (let i = 0; i < command.questions.length; i++) {
            const question = command.questions[i];
            let answer;
            if (Array.isArray(question.values) && question.values.length > 0) {
                let questionOptions = {
                    ignoreFocusOut: true
                };
                if (question.placeholder) {
                    questionOptions["placeHolder"] = question.placeholder;
                }
                if (question.canPickMany) {
                    questionOptions["canPickMany"] = question.canPickMany;
                }
                answer = yield vscode.window.showQuickPick(question.values, questionOptions);
            }
            else {
                let questionOptions = {
                    prompt: question.prompt,
                    ignoreFocusOut: true
                };
                if (question.placeholder) {
                    questionOptions["placeHolder"] = question.placeholder;
                }
                if (question.isPassword !== undefined) {
                    questionOptions["password"] = question.isPassword;
                }
                answer = yield vscode.window.showInputBox(questionOptions);
            }
            answers.push(answer);
        }
        return answers;
    });
}
exports.promptCommandQuestions = promptCommandQuestions;
//# sourceMappingURL=promptCommandQuestions.js.map