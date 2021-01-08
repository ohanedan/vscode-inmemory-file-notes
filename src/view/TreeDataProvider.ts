import * as vscode from 'vscode';
import TreeItem from './items/TreeItem';

export default class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;
  
	data: TreeItem[] = [];
	context: vscode.ExtensionContext;
	treeView: vscode.TreeView<TreeItem>|undefined;

	constructor(context: vscode.ExtensionContext, view?: vscode.TreeView<TreeItem>) {
		this.context = context;
		this.treeView = view;
	}

	getTreeItem(element: TreeItem): TreeItem|Thenable<TreeItem> {
		return element;
	}
  
	getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
	  if (element === undefined) {
		return this.data;
	  }
	  return element.children;
	}

	refresh(element? : TreeItem): void {
		this._onDidChangeTreeData.fire(element);
	}

	getParent(element: TreeItem): vscode.ProviderResult<TreeItem> {
		if(element  === undefined) {
			return undefined;
		}
		return element.parent;
	};

	getData() {
		throw new Error("not implemented");
	}
  }