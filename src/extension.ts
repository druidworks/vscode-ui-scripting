// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { loadConfiguration } from './library/loadConfiguration';
import { promptCommand } from './library/promptCommand';
import { showInfoMessage } from './library/showInfoMessage';
import { promptCommandQuestions } from './library/promptCommandQuestions';
import { getTerminal } from './library/getTerminal';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.scriptUI', async fileInfo => {
    showInfoMessage('Loading configration...');
    const config = loadConfiguration(fileInfo);

    if (config) {
      const command = await promptCommand(config);
      if (command) {
        const answers = await promptCommandQuestions(command);
        console.log('answers', answers);
        const terminal = await getTerminal();
        if (terminal) {
          terminal.sendText(`${command.command} ${answers.join(' ')}`);
        }
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
