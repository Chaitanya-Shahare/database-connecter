import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Your extension "database-connector" is now active!');

  const treeDataProvider = new DatabaseExplorerProvider();
  vscode.window.registerTreeDataProvider("databaseView", treeDataProvider);

  let disposableAddConnection = vscode.commands.registerCommand(
    "database-connector.addConnection",
    () => {
      vscode.window
        .showInputBox({ prompt: "Enter MongoDB Connection String" })
        .then((connectionString) => {
          if (connectionString) {
            // Here you could add logic to save the connection string and refresh the tree view
            vscode.window.showInformationMessage("Connection added!");
          }
        });
    }
  );

  let disposableHelloWorld = vscode.commands.registerCommand(
    "database-connector.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello from your Database Connector!"
      );
    }
  );

  context.subscriptions.push(disposableAddConnection, disposableHelloWorld);
}

class DatabaseExplorerProvider implements vscode.TreeDataProvider<string> {
  private _onDidChangeTreeData: vscode.EventEmitter<string | undefined | null> =
    new vscode.EventEmitter<string | undefined | null>();
  readonly onDidChangeTreeData: vscode.Event<string | undefined | null> =
    this._onDidChangeTreeData.event;

  getTreeItem(element: string): vscode.TreeItem {
    let treeItem = new vscode.TreeItem(element);
    if (element === "Add MongoDB Connection") {
      treeItem.iconPath = new vscode.ThemeIcon("add");
      treeItem.command = {
        command: "database-connector.addConnection",
        title: "Add Connection",
      };
      treeItem.tooltip = "Add a new MongoDB connection";
    } else {
      treeItem.contextValue = "database";
      treeItem.tooltip = `Manage your ${element} database`;
    }
    return treeItem;
  }

  getChildren(element?: string): Thenable<string[]> {
    if (!element) {
      // Return the MongoDB and the add connection button at the root level
      return Promise.resolve(["MongoDB", "Add MongoDB Connection"]);
    } else if (element === "MongoDB") {
      // Return MongoDB collections or options here
      return Promise.resolve(["Collection1", "Collection2"]);
    } else {
      return Promise.resolve([]);
    }
  }

  // Use this method to refresh the tree view after adding a new connection
  refresh(): void {
    this._onDidChangeTreeData.fire(null);
  }
}

export function deactivate() {}
