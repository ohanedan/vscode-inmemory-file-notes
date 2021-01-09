import * as vscode from 'vscode';
import { MemFS } from '../MemFS';
import TreeDataProvider from './TreeDataProvider';
import TreeItem from './items/TreeItem';
import FileTreeItem from './items/FileTreeItem';
import { FORMERR } from 'dns';

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
		const treeItems: FileTreeItem[] = [];

		this.memFS.getFiles().forEach(uri => {
			treeItems.push(new FileTreeItem(this.context, this.treeView, uri.path.substring(1), uri));
		});

		this.data = treeItems;
		this.refresh();
	}
}