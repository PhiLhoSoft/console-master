// The module 'vscode' contains the VS Code extensibility API.
// Import the module and reference it with the alias vscode in your code below.
import * as vscode from 'vscode';

// This method is called when your extension is activated.
// Your extension is activated the very first time the command is executed.
export function activate(context: vscode.ExtensionContext)
{
	// Use the console to output diagnostic information (console.log) and errors (console.error).
	// This line of code will only be executed once when your extension is activated.
	// console.log('Congratulations, your extension "console-master" is now active!');

	// The command has been defined in the package.json file.
	// Now provide the implementation of the command with registerCommand.
	// The commandId parameter must match the command field in package.json.
	const disposable = vscode.commands.registerCommand('consoleMaster.addConsole',
		async () =>
		{
			// The code you place here will be executed every time your command is executed.
			const configuration = vscode.workspace.getConfiguration('consoleMaster');
			const addSemicolon = configuration.get('addSemicolon');
			const quoteCharacter = configuration.get('quoteCharacter');
			const addFileNameAndLineNumber = configuration.get('addFileNameAndLineNumber');
			const elementSeparator = configuration.get('elementSeparator');

			const editor = vscode.window.activeTextEditor;
			if (!editor) { return; }

			// const { tabSize, insertSpaces } = activeTextEditor.options;
			const document = editor.document;
			if (!document) { return; }
			const eol = document.eol;

			let selection = editor.selection;
			let { start, end } = selection;
			const currentLine = document.lineAt(start.line);
			const lineText = currentLine.text;
			// If no selection, try to get the word under the caret.
			if (start.line === end.line && start.character === end.character)
			{
				const previousChar = lineText.charAt(start.character - 1);
				// If left char exists and is alphanumerical or $ or _
				if (start.character > 0 && /[\w$]/.test(previousChar))
				{
					// Go to start of word (unless VSC stops on camel-case…)
					await vscode.commands.executeCommand('cursorWordLeft');
				}
				// Select to end of word
				await vscode.commands.executeCommand('cursorWordRightSelect');
				// Update selection
				selection = editor.selection;
			}

			let fileName = '';
			if (addFileNameAndLineNumber)
			{
				// Take name at the end of the full path (Windows / Posix)
				const documentFileName = document.fileName.replace(/^.*[\\/]([^\\//]+)$/, '$1');
				fileName = `${documentFileName} (${start.line}) ${elementSeparator}`;
			}

			// Take whitespace at the start of the line (spaces or tabs, whatever).
			const indentation = lineText.slice(0, currentLine.firstNonWhitespaceCharacterIndex);

			const selectedText = document.getText(selection);

			const insertPosition = new vscode.Position(start.line + 1, 0);

			editor.edit(
				(edit: vscode.TextEditorEdit) =>
				{
					edit.insert(insertPosition,
						`${
							indentation
						}console.log(${
							quoteCharacter
						}${
							fileName
						} ${
							selectedText
						}${
							quoteCharacter
						}, ${
							selectedText
						})${
							addSemicolon ? ';' : ''
						}${
							eol === vscode.EndOfLine.LF ? '\n' : '\r\n'
						}`);
				}
			);

			// Display a message box to the user.
			// vscode.window.showInformationMessage('console-master inserted a console.log call!');
		}
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
