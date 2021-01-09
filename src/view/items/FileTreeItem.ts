import * as vscode from 'vscode';
import TreeItem from "./TreeItem";

var path = require('path');

export default class FileTreeItem extends TreeItem {

    constructor(context: vscode.ExtensionContext, treeView: vscode.TreeView<TreeItem>, label: string, uri: vscode.Uri) {
        super(context, treeView, label, uri);

        this.iconPath = {
            light: this.context.asAbsolutePath(path.join('resources', 'svg', 'light', 'file.svg')),
            dark: this.context.asAbsolutePath(path.join('resources', 'svg', 'dark', 'file.svg'))
        };

        this.contextValue = "inmemoryFileNotes-fileitem";
    }
}