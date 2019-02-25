"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function getMetaContext(config) {
    try {
        const stats = fs_1.lstatSync(config.locationContext);
        const meta = findClosestMeta(config.projectRoot, config.locationContext);
        return JSON.parse(meta);
    }
    catch (e) {
        console.log(`Error parsing meta JSON: ${e.stack}`);
    }
    return null;
}
exports.getMetaContext = getMetaContext;
function findClosestMeta(root, path) {
    let meta;
    const stats = fs_1.lstatSync(path);
    if (stats.isFile()) {
        const directoryPath = path_1.dirname(path);
        meta = findClosestMeta(root, directoryPath);
    }
    else if (stats.isDirectory()) {
        const directory = fs_1.readdirSync(path);
        if (Array.isArray(directory) && directory.length > 0) {
            const metaFile = directory.find(file => file === "vus-meta.json");
            if (metaFile && fs_1.existsSync(path_1.join(path, metaFile))) {
                meta = fs_1.readFileSync(path_1.join(path, metaFile), {
                    encoding: "UTF-8"
                });
            }
            else if (path !== root) {
                const parentDirectory = path_1.dirname(path);
                meta = findClosestMeta(root, parentDirectory);
            }
        }
    }
    return meta;
}
//# sourceMappingURL=getMetaContext.js.map