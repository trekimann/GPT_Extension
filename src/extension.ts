import * as vscode from 'vscode';
import * as path from 'path';
const fs = require('fs');


export function activate(context: vscode.ExtensionContext) {
    console.log("ChatGPT extension loaded!");

    // create a new webview panel
    const panel = vscode.window.createWebviewPanel(
        'webview',
        'ChatGPT',
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );
    vscode.commands.registerCommand('webview.show', () => {
        console.log("Showing/Hiding Webview")
        // Create and show the webview

        if (!panel.visible) {
            panel.reveal(vscode.ViewColumn.One);
        }
    });

    // set the webview's HTML content
    const filePath = path.join(context.extensionPath, 'out', 'webview.html');
    fs.readFile(filePath, 'utf8', (err: any, data: string) => {
        if (err) {
            console.error(err);
            return;
        }
        panel.webview.html = data;
    });   

}
