import * as vscode from 'vscode';
import { MemFS } from '../../MemFS';
import TreeDataProvider from '../TreeDataProvider';
import TreeItem from './TreeItem';

export default class ExplorerTreeDataProvider extends TreeDataProvider {

	memFS: MemFS;
	treeView: vscode.TreeView<TreeItem>;

	constructor(context: vscode.ExtensionContext, memFS: MemFS, treeView: vscode.TreeView<TreeItem>) {
		super(context);
		this.memFS = memFS;
		this.treeView = treeView;

		this.memFS.onDidChangeFile(() => {
			this.getData();
		});

		this.getData();
	}

	async getData() {
		this.data = [];
		this.refresh();
	}
}