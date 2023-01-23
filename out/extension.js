"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require('fs');
function activate(context) {
    console.log("ChatGPT extension loaded!");
    // create a new webview panel
    const panel = vscode.window.createWebviewPanel('webview', 'ChatGPT', vscode.ViewColumn.One, {
        enableScripts: true,
        retainContextWhenHidden: true
    });
    vscode.commands.registerCommand('webview.show', () => {
        console.log("Showing/Hiding Webview");
        // Create and show the webview
        if (!panel.visible) {
            panel.reveal(vscode.ViewColumn.One);
        }
    });
    // set the webview's HTML content
    const filePath = path.join(context.extensionPath, 'out', 'webview.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        panel.webview.html = data;
    });
}
exports.activate = activate;
