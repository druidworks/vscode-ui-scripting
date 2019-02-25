import * as vscode from "vscode";
import { loadWorkspaceFile } from "./loadWorkspaceFile";
import { showErrorMessage } from "./showErrorMessage";
import { IConfig } from "../models/config";
import { getLocationContext } from "./getLocationContext";
import { FileInfo } from "../models/fileInfo";
import { getMetaContext } from "./getMetaContext";

export function loadConfiguration(fileInfo: FileInfo): IConfig | null {
  try {
    console.log("fileInfo", fileInfo);
    const configFileData = loadWorkspaceFile("vus-config.json");
    if (configFileData && typeof configFileData === "string") {
      const config = JSON.parse(configFileData);
      if (config && config.commands) {
        config.projectRoot = vscode.workspace.rootPath;
        config.locationContext = getLocationContext(
          config.projectRoot,
          fileInfo
        );
        config.metaContext = getMetaContext(config);
        config.isLocationRoot = config.projectRoot === config.locationContext;
        return config;
      }
    }
    throw new Error("Invalid config");
  } catch (e) {
    console.error(e.stack);
    showErrorMessage("Invalid config found");
  }
  return null;
}
