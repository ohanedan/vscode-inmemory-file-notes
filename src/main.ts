import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { MemFS } from './MemFS';
import ExplorerTreeDataProvider from './view/ExplorerTreeDataProvider';
import TreeDataCollector from './view/TreeDataCollector';

export function activate(context: vscode.ExtensionContext) {
	const scheme = "inmemory-file-notes";

	const memfs = new MemFS(scheme);
	context.subscriptions.push(vscode.workspace.registerFileSystemProvider(scheme, memfs, { isCaseSensitive: true }));

	const explorerDataCollector = new TreeDataCollector(context);
	const explorerTreeView = vscode.window.createTreeView('inmemoryFileNotes-explorer', { treeDataProvider: explorerDataCollector });

	explorerDataCollector.addProvider(new ExplorerTreeDataProvider(context, memfs, explorerTreeView));

	registerCommands(context, memfs, explorerDataCollector, explorerTreeView);
}

export function deactivate() { }
