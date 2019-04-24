// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { loadConfiguration } from './library/loadConfiguration';
import { promptCommand } from './library/promptCommand';
import { showInfoMessage } from './library/showInfoMessage';
import { promptCommandQuestions } from './library/promptCommandQuestions';
import { getTerminal } from './library/getTerminal';
import { defaultAnswers } from './library/defaultAnswers';
import { prepareCommandText } from './library/prepareCommandText';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.scriptUI', async (fileInfo: any) => {
    showInfoMessage('Loading configration...');
    const config = loadConfiguration(fileInfo);

    if (config && config.metaContext) {
      const command = await promptCommand(config);
      if (command) {
        const answers = await promptCommandQuestions(command);
        const terminal = await getTerminal();
        if (terminal) {
          const terminalText = prepareCommandText(config, command, answers);
          if (terminalText) {
            terminal.sendText(terminalText);
          }
        }
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
