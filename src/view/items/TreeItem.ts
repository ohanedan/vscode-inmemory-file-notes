import * as vscode from 'vscode';

export default class TreeItem extends vscode.TreeItem {
	parent: TreeItem | undefined;
	children: TreeItem[] | undefined;
	uri: vscode.Uri | undefined;
	treeView: vscode.TreeView<TreeItem>;

	constructor(treeView: vscode.TreeView<TreeItem>, label: string, uri?: vscode.Uri) {
		super(label);
		this.children = [] as TreeItem[];
		this.uri = uri;
		this.treeView = treeView;
	}

	addChild(child: TreeItem): TreeItem {
		this.children!.push(child);
		this.sortChilds();
		child.parent = this;
		return child;
	}

	addChilds(childs: TreeItem[]) {
		childs.forEach(child => {
			this.children!.push(child);
			child.parent = this;
		});
		this.sortChilds();
	}

	sortChilds() {
		this.children!.sort(function (a, b) {
			if (a.label! < b.label!) { return -1; }
			if (a.label! > b.label!) { return 1; }
			return 0;
		});
	}
}