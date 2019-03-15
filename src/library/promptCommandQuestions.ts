import * as vscode from 'vscode';
import { ICommand } from '../models/config';
import { showInfoMessage } from './showInfoMessage';

export async function promptCommandQuestions(command: ICommand): Promise<(string | undefined)[]> {
  const answers = [];

  if (command && command.questions) {
    showInfoMessage('Quesion prompts to follow');
    for (let i = 0; i < command.questions.length; i++) {
      const question = command.questions[i];

      let answer;
      if (Array.isArray(question.values) && question.values.length > 0) {
        let questionOptions: vscode.QuickPickOptions = {
          ignoreFocusOut: true
        };
        if (question.placeholder) {
          questionOptions['placeHolder'] = question.placeholder;
        }
        if (question.canPickMany) {
          questionOptions['canPickMany'] = question.canPickMany;
        }

        const quickPickAnswer = await vscode.window.showQuickPick(question.values, questionOptions);
        if (Array.isArray(quickPickAnswer)) {
          answer = quickPickAnswer.map(qpAnswer => qpAnswer.detail).join(',');
        } else if (quickPickAnswer) {
          answer = quickPickAnswer.detail;
        }
      } else {
        let questionOptions: vscode.InputBoxOptions = {
          prompt: question.prompt,
          ignoreFocusOut: true
        };
        if (question.placeholder) {
          questionOptions['placeHolder'] = question.placeholder;
        }
        if (question.isPassword !== undefined) {
          questionOptions['password'] = question.isPassword;
        }
        answer = await vscode.window.showInputBox(questionOptions);
      }

      answers.push(answer);
    }
  }

  return answers;
}
