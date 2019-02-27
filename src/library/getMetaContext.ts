import { lstatSync, readdirSync, existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { IConfig } from '../models/config';
import { showErrorMessage } from './showErrorMessage';

export function getMetaContext(config: IConfig) {
  try {
    const meta = findClosestMeta(config.projectRoot, config.locationContext);
    return JSON.parse(meta);
  } catch (e) {
    showErrorMessage("No 'vus-meta.json' found");
  }
  return null;
}

function findClosestMeta(root: string, path: string): any {
  let meta;
  const stats = lstatSync(path);
  if (stats.isFile()) {
    const directoryPath = dirname(path);
    meta = findClosestMeta(root, directoryPath);
  } else if (stats.isDirectory()) {
    const directory = readdirSync(path);
    if (Array.isArray(directory) && directory.length > 0) {
      const metaFile = directory.find(file => file === 'vus-meta.json');
      if (metaFile && existsSync(join(path, metaFile))) {
        meta = readFileSync(join(path, metaFile), {
          encoding: 'UTF-8'
        });
      } else if (path !== root) {
        const parentDirectory = dirname(path);
        meta = findClosestMeta(root, parentDirectory);
      }
    }
  }
  return meta;
}
