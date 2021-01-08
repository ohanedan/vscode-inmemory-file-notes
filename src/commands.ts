import * as vscode from 'vscode';
import { MemFS } from './MemFS';
import TreeItem from './view/items/TreeItem';
import TreeDataCollector from './view/TreeDataCollector';

export function registerCommands(context: vscode.ExtensionContext, memfs: MemFS, explorerDataCollector: TreeDataCollector, explorerTreeView: vscode.TreeView<TreeItem>) {

    context.subscriptions.push(vscode.commands.registerCommand(
        "inmemoryFileNotes.refresh.explorer", () => {
            explorerDataCollector.refreshData();
        }
    ));
}