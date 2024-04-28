import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Your extension "database-connecter" is now active!');

  const treeDataProvider = new DatabaseExplorerProvider();
  vscode.window.registerTreeDataProvider("databaseView", treeDataProvider);

  let disposable = vscode.commands.registerCommand(
    "database-connecter.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello from your Database Connector!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

class DatabaseExplorerProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(element: string): vscode.TreeItem {
    return new vscode.TreeItem(element);
  }

  getChildren(element?: string): Thenable<string[]> {
    return Promise.resolve(["MongoDB", "PostgreSQL", "MySQL"]);
  }
}

export function deactivate() {}
