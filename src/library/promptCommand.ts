import * as vscode from 'vscode';
import { basename } from 'path';
import { IConfig, ICommand } from '../models/config';
import { showInfoMessage } from './showInfoMessage';

export async function promptCommand(config: IConfig): Promise<ICommand> {
  const commandNames = [];
  let commandDictionary: { [prop: string]: any } = {};
  config.commands.map(command => command.name);
  for (let i = 0; i < config.commands.length; i++) {
    const allowedCommands = [];
    const commandName = config.commands[i].name;

    if (config && config.metaContext) {
      if (config.metaContext.allowedFileCommands && config.metaContext.allowedFileCommands[basename(config.locationContext)]) {
        const fileCommands = config.metaContext.allowedFileCommands[basename(config.locationContext)];
        if (Array.isArray(fileCommands) && fileCommands.length > 0) {
          allowedCommands.push(...fileCommands);
        }
      } else if (Array.isArray(config.metaContext.allowedDirectoryCommands) && config.metaContext.allowedDirectoryCommands.length > 0) {
        allowedCommands.push(...config.metaContext.allowedDirectoryCommands);
      }
    }

    if (allowedCommands.indexOf(commandName) >= 0) {
      commandNames.push(commandName);
      commandDictionary[commandName] = config.commands[i];
    }
  }

  let commandName;
  if (commandNames.length > 1) {
    showInfoMessage('Please select a command from the pick list');
    commandName = await vscode.window.showQuickPick(commandNames);
  } else if (commandNames.length === 1) {
    commandName = commandNames[0];
    showInfoMessage(`'${commandName}' command initializing...`);
  }

  return commandName ? commandDictionary[commandName] : null;
}
