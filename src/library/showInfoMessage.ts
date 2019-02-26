import * as vscode from 'vscode';
import { MESSAGE_PREFIX } from '../config/constants';

export function showInfoMessage(message: string) {
  vscode.window.showInformationMessage(`${MESSAGE_PREFIX}: ${message}`);
}
