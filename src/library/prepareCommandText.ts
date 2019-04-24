import { defaultAnswers } from './defaultAnswers';
import { IConfig, ICommand } from '../models/config';
import { COMMAND_TEMPLATES } from '../config/constants';
import { showErrorMessage } from './showErrorMessage';

export function prepareCommandText(config: IConfig, command: ICommand, answers: (string | undefined)[]) {
  let terminalCommand = command.commandTemplate as string; // this has been defaulted in loadConfiguration
  if (terminalCommand.indexOf(COMMAND_TEMPLATES.baseCommand) < 0) {
    showErrorMessage('Unable to execute command, invalid template');
  } else {
    try {
      terminalCommand = terminalCommand.replace(COMMAND_TEMPLATES.baseCommand, command.command);
      terminalCommand = terminalCommand.replace(COMMAND_TEMPLATES.directoryContext, config.locationContextDirectory);
      terminalCommand = terminalCommand.replace(COMMAND_TEMPLATES.answers, defaultAnswers(config, answers).join(' '));
    } catch (e) {
      showErrorMessage('Unable to execute command template');
    }
    return terminalCommand;
  }
  return false;
}
