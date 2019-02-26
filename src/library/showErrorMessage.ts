import * as vscode from 'vscode';
import { MESSAGE_PREFIX } from '../config/constants';

export function showErrorMessage(errorMessage: string) {
  vscode.window.showErrorMessage(`${MESSAGE_PREFIX}: ${errorMessage}`);
}
