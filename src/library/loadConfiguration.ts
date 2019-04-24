import * as vscode from 'vscode';
import { loadWorkspaceFile } from './loadWorkspaceFile';
import { showErrorMessage } from './showErrorMessage';
import { IConfig, ICommand } from '../models/config';
import { getLocationContext } from './getLocationContext';
import { FileInfo } from '../models/fileInfo';
import { getMetaContext } from './getMetaContext';
import { getLocationContextDirectory } from './getLocationContextDirectory';
import { COMMAND_TEMPLATES } from '../config/constants';

export function loadConfiguration(fileInfo: FileInfo): IConfig | null {
  try {
    console.log('fileInfo', fileInfo);
    const configFileData = loadWorkspaceFile('vus-config.json');
    if (configFileData && typeof configFileData === 'string') {
      const config = JSON.parse(configFileData);
      if (config && config.commands) {
        config.commands = initializeCommands(config.commands);
        config.projectRoot = vscode.workspace.rootPath;
        config.locationContext = getLocationContext(config.projectRoot, fileInfo);
        config.locationContextDirectory = getLocationContextDirectory(config);
        config.metaContext = getMetaContext(config);
        config.isLocationRoot = config.projectRoot === config.locationContext;
        return config;
      }
    }
    throw new Error('Invalid config');
  } catch (e) {
    console.error(e.stack);
    showErrorMessage('Invalid config found');
  }
  return null;
}

function initializeCommands(commands: ICommand[]) {
  if (Array.isArray(commands)) {
    return commands.map(command => {
      if (!command.commandTemplate || command.commandTemplate === '' || command.commandTemplate === 'default') {
        command.commandTemplate = `${COMMAND_TEMPLATES.baseCommand} ${COMMAND_TEMPLATES.directoryContext} ${COMMAND_TEMPLATES.answers}`;
      } else if (command.commandTemplate === 'baseCommandOnly') {
        command.commandTemplate = `${COMMAND_TEMPLATES.baseCommand}`;
      }
      return command;
    });
  }
}
