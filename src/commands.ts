import * as vscode from 'vscode';
import { MemFS } from './MemFS';
import FileTreeItem from './view/items/FileTreeItem';
import TreeItem from './view/items/TreeItem';
import TreeDataCollector from './view/TreeDataCollector';

import fs = require("fs");

export function registerCommands(context: vscode.ExtensionContext, memfs: MemFS, explorerDataCollector: TreeDataCollector, explorerTreeView: vscode.TreeView<TreeItem>) {

    context.subscriptions.push(vscode.commands.registerCommand(
        "inmemoryFileNotes.refresh.explorer", () => {
            explorerDataCollector.refreshData();
        }
    ));

    context.subscriptions.push(vscode.commands.registerCommand(
        "inmemoryFileNotes.note.new", () => {
            vscode.window.showInputBox({ placeHolder: 'Enter Inmemory File Name (backup.json, service.cpp, profile.go...)' }).then(async name => {
                if (name === undefined) {
                    return false;
                }
                const uri = memfs.getMemFSUri(name);
                memfs.writeFile(uri, Buffer.from(''), { create: true, overwrite: false });
                vscode.commands.executeCommand('vscode.open', uri, { preview: true, viewColumn: vscode.ViewColumn.One });
            });
        }
    ));

    context.subscriptions.push(vscode.commands.registerCommand(
        "inmemoryFileNotes.note.delete", (event) => {
            if (!(event instanceof FileTreeItem)) {
                return;
            }
            if (!event.uri) {
                return;
            }

            vscode.window.showQuickPick(["Yes", "No"], { placeHolder: 'Do you want to delete file?' }).then(async selected => {
                if (!selected || selected === "No") {
                    return;
                }
                memfs.delete(event.uri!);
            });
        }
    ));

    context.subscriptions.push(vscode.commands.registerCommand(
        "inmemoryFileNotes.note.rename", (event) => {
            if (!(event instanceof FileTreeItem)) {
                return;
            }
            if (!event.uri) {
                return;
            }

            vscode.window.showInputBox({ placeHolder: 'Enter New Inmemory File Name (backup.json, service.cpp, profile.go...)' }).then(async name => {
                if (name === undefined) {
                    return false;
                }
                memfs.rename(event.uri!, memfs.getMemFSUri(name), { overwrite: false });
            });
        }
    ));

    context.subscriptions.push(vscode.commands.registerCommand(
        "inmemoryFileNotes.note.show", (event) => {
            if (!(event instanceof FileTreeItem)) {
                return;
            }
            if (!event.uri) {
                return;
            }
            vscode.commands.executeCommand('vscode.open', event.uri, { preview: false, viewColumn: vscode.ViewColumn.One });
        }
    ));

    context.subscriptions.push(vscode.commands.registerCommand(
        "inmemoryFileNotes.note.saveAsFile", (event) => {
            if (!(event instanceof FileTreeItem)) {
                return;
            }
            if (!event.uri) {
                return;
            }

            vscode.window.showSaveDialog({ title: event.uri.path.substring(1) }).then(uri => {
                if (!uri) {
                    return;
                }
                vscode.workspace.openTextDocument(event.uri!).then(doc => {
                    fs.writeFileSync(uri.path, doc.getText());
                    memfs.delete(event.uri!);
                });
            });
        }
    ));
}