import * as vscode from 'vscode';
import TreeDataProvider from './TreeDataProvider';
import TreeItem from './items/TreeItem';

export default class TreeDataCollector extends TreeDataProvider {

    providers: { provider: TreeDataProvider, data: TreeItem[] }[];

    constructor(context: vscode.ExtensionContext) {
        super(context);
        this.providers = [];
    }

    addProvider(provider: TreeDataProvider) {
        this.providers.push({
            provider: provider,
            data: provider.data
        });

        provider.onDidChangeTreeData(() => {
            const p = this.providers.find(p => p.provider === provider);
            if (!p) {
                return;
            }
            p.data = provider.data;

            this.data = [];
            this.providers.map(p => p.data).forEach(d => {
                this.data = this.data.concat(d);
            });

            this.refresh();
        });
    }

    refreshData() {
        this.providers.forEach(p => {
            p.provider.getData();
        });
    }

}