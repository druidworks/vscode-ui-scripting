import { QuickPickItem } from 'vscode';

export interface IQuestion {
  prompt: string;
  placeholder?: string;
  isPassword?: boolean;
  values?: QuickPickItem[];
  canPickMany?: boolean;
}

export interface ICommand {
  name: string;
  command: string;
  commandTemplate?: string;
  questions?: IQuestion[];
  inherit?: boolean;
}

export interface IFileCommands {
  [file: string]: string[];
}

export interface IMetaContext {
  allowedDirectoryCommands: string[];
  allowedFileCommands?: IFileCommands;
  inherit?: boolean;
}

export interface IConfig {
  commands: ICommand[];
  projectRoot: string;
  metaContext: IMetaContext;
  locationContext: string;
  locationContextDirectory: string;
  isLocationRoot: boolean;
  defaultAnswerValue: string;
}
