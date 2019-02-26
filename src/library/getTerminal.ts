import * as vscode from 'vscode';
import { showErrorMessage } from './showErrorMessage';
import { showInfoMessage } from './showInfoMessage';
import { TERMINAL_NAME } from '../config/constants';

export async function getTerminal(): Promise<vscode.Terminal> {
  let terminal = vscode.window.terminals.find(terminal => terminal.name === TERMINAL_NAME);
  if (!terminal) {
    showInfoMessage('Creating new VUS terminal');
    terminal = await vscode.window.createTerminal(TERMINAL_NAME);
    await terminal.show();
  }
  return terminal;
}
