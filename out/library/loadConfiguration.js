"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const loadWorkspaceFile_1 = require("./loadWorkspaceFile");
const showErrorMessage_1 = require("./showErrorMessage");
const getLocationContext_1 = require("./getLocationContext");
const getMetaContext_1 = require("./getMetaContext");
function loadConfiguration(fileInfo) {
    try {
        console.log("fileInfo", fileInfo);
        const configFileData = loadWorkspaceFile_1.loadWorkspaceFile("vus-config.json");
        if (configFileData && typeof configFileData === "string") {
            const config = JSON.parse(configFileData);
            if (config && config.commands) {
                config.projectRoot = vscode.workspace.rootPath;
                config.locationContext = getLocationContext_1.getLocationContext(config.projectRoot, fileInfo);
                config.metaContext = getMetaContext_1.getMetaContext(config);
                config.isLocationRoot = config.projectRoot === config.locationContext;
                return config;
            }
        }
        throw new Error("Invalid config");
    }
    catch (e) {
        console.error(e.stack);
        showErrorMessage_1.showErrorMessage("Invalid config found");
    }
    return null;
}
exports.loadConfiguration = loadConfiguration;
//# sourceMappingURL=loadConfiguration.js.map