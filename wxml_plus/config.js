"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const vscode_1 = require("vscode");
let listener;
exports.config = {
    activeColor: {},
    // cache: false,
    // onSaveFormat: false,
    activeDisable: false,
    tagNoActiveArr: [],
};
function getConfig(e) {
    if (e && !e.affectsConfiguration('freedomHelper'))
        return;
    const wxml = vscode_1.workspace.getConfiguration('freedomHelper');
    exports.config.activeColor = wxml.get('wxml-activeColor', {});
    exports.config.activeDisable = wxml.get('wxml-activeDisable', false);
    exports.config.tagNoActiveArr = wxml.get('wxml-tagNoActiveArr', []);
    // exports.config.onSaveFormat = wxml.get('format-save-code', false);
    // exports.config.cache = false;
}
exports.getConfig = getConfig;
function configActivate(activeText, saveFormat) {
    listener = vscode_1.workspace.onDidChangeConfiguration((e) => {
        getConfig(e);
        saveFormat();
        let tid = null;
        if (tid)
            clearTimeout(tid);
        tid = setTimeout(() => {
            activeText.onChange(vscode_1.window.activeTextEditor, true);
        }, 500);
    });
}
exports.configActivate = configActivate;
function configDeactivate() {
    listener.dispose();
}
exports.configDeactivate = configDeactivate;