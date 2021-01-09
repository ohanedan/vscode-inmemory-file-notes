import * as vscode from 'vscode';

export default class TreeItem extends vscode.TreeItem {
	context: vscode.ExtensionContext;
	parent: TreeItem | undefined;
	children: TreeItem[] | undefined;
	uri: vscode.Uri | undefined;
	treeView: vscode.TreeView<TreeItem>;

	constructor(context: vscode.ExtensionContext, treeView: vscode.TreeView<TreeItem>, label: string, uri?: vscode.Uri) {
		super(label);
		this.context = context;
		this.children = [] as TreeItem[];
		this.uri = uri;
		this.treeView = treeView;

		if (uri) {
			this.command = {
				command: "vscode.open",
				arguments: [uri, { preview: true, viewColumn: vscode.ViewColumn.One }],
				title: "Open File"
			};
		}
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