import * as path from "path";
import { FileInfo } from "../models/fileInfo";

export function getLocationContext(projectRoot: string, fileInfo: FileInfo) {
  if (fileInfo && fileInfo.path) {
    return path.join(fileInfo.fsPath);
  }
  return projectRoot;
}
