import { QuickPickItem } from "vscode";

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
  questions: IQuestion[];
}

export interface IFileCommands {
  [file: string]: string[];
}

export interface IMetaContext {
  allowedDirectoryCommands: string[];
  allowedFileCommands?: IFileCommands;
}

export interface IConfig {
  commands: ICommand[];
  projectRoot: string;
  metaContext: IMetaContext;
  locationContext: string;
  isLocationRoot: boolean;
}
