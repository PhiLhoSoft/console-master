// The module 'vscode' contains the VS Code extensibility API.
// Import the module and reference it with the alias vscode in your code below.
import * as vscode from 'vscode';

import { isCaretOnIdentifier, isSelectionEmpty } from './functions';

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
		() =>
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
			let { start } = selection;
			const currentLine = document.lineAt(start.line);
			const lineText = currentLine.text;
			let selectedText = document.getText(selection);

			// If no selection, try to get the word under the caret.
			let insertEmpty = false;
			if (isSelectionEmpty(selection) && isCaretOnIdentifier(lineText, selection.start.character))
			{
				// selectedText = getIdentifierUnderCaret(lineText, start.character, 'includeThis');
				selectedText = document.getText(document.getWordRangeAtPosition(selection.start, /[\w$.!?]+/));
			}
			else
			{
				// Maybe with a setting, if requested.
				// With this case, we insert the console statement right where the caret is, without newline nor semicolon.
				// Eg. we might want it at the ~ place: `tap(() => ~)`
				insertEmpty = true;
			}

			let fileName = '';
			if (addFileNameAndLineNumber)
			{
				// Take name at the end of the full path (Windows / Posix)
				const documentFileName = document.fileName.replace(/^.*[\\/]([^\\//]+)$/, '$1');
				fileName = insertEmpty ?
					`${documentFileName} (${start.line})` :
					`${documentFileName} (${start.line}) ${elementSeparator}`;
			}

			// Take whitespace at the start of the line (spaces or tabs, whatever).
			const indentation = lineText.slice(0, currentLine.firstNonWhitespaceCharacterIndex);

			const insertPosition = insertEmpty ? start : new vscode.Position(start.line + 1, 0);

			editor.edit(
				(edit: vscode.TextEditorEdit) =>
				{
					edit.insert(insertPosition,
						insertEmpty ?
							`console.log(${
								quoteCharacter
							}${
								fileName
							}${
								quoteCharacter
							})`
						:
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
							}`
					);
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
