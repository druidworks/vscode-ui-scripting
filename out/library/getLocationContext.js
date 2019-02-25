"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function getLocationContext(projectRoot, fileInfo) {
    if (fileInfo && fileInfo.path) {
        return path.join(fileInfo.fsPath);
    }
    return projectRoot;
}
exports.getLocationContext = getLocationContext;
//# sourceMappingURL=getLocationContext.js.map