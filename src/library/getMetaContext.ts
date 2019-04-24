import { lstatSync, readdirSync, existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { IConfig, IMetaContext, ICommand } from '../models/config';
import { showErrorMessage } from './showErrorMessage';

export function getMetaContext(config: IConfig): IMetaContext | undefined {
  const inheritableCommands: ICommand[] = config.commands.filter(command => command.inherit !== false);

  const meta = findClosestMeta(config.projectRoot, config.locationContext, inheritableCommands);
  if (!meta) {
    showErrorMessage("No inhertiable 'vus-meta.json' found");
  }
  return meta;
}

function findClosestMeta(root: string, path: string, inheritableCommands: ICommand[], isInitialDirectory: boolean = true): IMetaContext | undefined {
  let meta;
  const stats = lstatSync(path);
  if (stats.isFile()) {
    const directoryPath = dirname(path);
    meta = findClosestMeta(root, directoryPath, inheritableCommands);
  } else if (stats.isDirectory()) {
    const directory = readdirSync(path);
    if (Array.isArray(directory) && directory.length > 0) {
      const metaFile = directory.find(file => file === 'vus-meta.json');
      if (metaFile) {
        const metaFilePath = join(path, metaFile);
        if (existsSync(metaFilePath)) {
          const rawMeta = readFileSync(metaFilePath, {
            encoding: 'UTF-8'
          });
          try {
            const preMeta = JSON.parse(rawMeta) as IMetaContext;
            /*
              We need to validate to see if the meta config file can be inherited by child directories.
            */
            if (preMeta && (isInitialDirectory || preMeta.inherit !== false)) {
              /* 
                If meta is not is not from the origin directory (from where the user initiated the context menu) 
                  Then we need to validate if each command is inhertiable, even if the meta file is
              */
              if (!isInitialDirectory) {
                if (preMeta.allowedDirectoryCommands) {
                  preMeta.allowedDirectoryCommands = filterCommandNamesByInheritable(preMeta.allowedDirectoryCommands, inheritableCommands);
                }

                if (preMeta.allowedFileCommands) {
                  const preMetaFileNames = Object.keys(preMeta.allowedFileCommands);
                  for (const fileName of preMetaFileNames) {
                    preMeta.allowedFileCommands[fileName] = filterCommandNamesByInheritable(
                      preMeta.allowedFileCommands[fileName],
                      inheritableCommands
                    );
                  }
                }
              }

              meta = preMeta;
            }
          } catch (e) {
            showErrorMessage(`the following vus-meta cannot be read, ${metaFilePath}`);
          }
        }
      }

      if (meta === undefined && path !== root) {
        const parentDirectory = dirname(path);
        meta = findClosestMeta(root, parentDirectory, inheritableCommands, false);
      }
    }
  }
  return meta;
}

function filterCommandNamesByInheritable(commandNames: string[], inheritableCommands: ICommand[]) {
  return commandNames.filter(commandName => inheritableCommands.find(command => command.name === commandName) !== undefined);
}
