import * as vscode from "vscode";
import { IConfig, ICommand } from "../models/config";
import { showInfoMessage } from "./showInfoMessage";

export async function promptCommand(config: IConfig): Promise<ICommand> {
  showInfoMessage("Please select a command from the pick list");
  const commandNames = [];
  let commandDictionary: { [prop: string]: any } = {};
  config.commands.map(command => command.name);
  for (let i = 0; i < config.commands.length; i++) {
    const commandName = config.commands[i].name;
    commandNames.push(commandName);
    commandDictionary[commandName] = config.commands[i];
  }
  const commandName = await vscode.window.showQuickPick(commandNames);
  return commandName ? commandDictionary[commandName] : null;
}
