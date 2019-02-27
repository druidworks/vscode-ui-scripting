import { dirname } from 'path';
import { lstatSync } from 'fs';
import { IConfig } from '../models/config';

export function getLocationContextDirectory(config: IConfig) {
  const locationTarget = lstatSync(config.locationContext);
  return locationTarget.isDirectory() ? config.locationContext : dirname(config.locationContext);
}
