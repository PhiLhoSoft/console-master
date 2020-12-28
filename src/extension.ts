// The module 'vscode' contains the VS Code extensibility API.
// Import the module and reference it with the alias vscode in your code below.
import * as vscode from 'vscode';

import { buildEmptyConsoleLog, buildFullConsoleLog, isCaretOnIdentifier } from './functions';
import { DocumentContext, LineContext, readConfiguration } from './model';

// This method is called when your extension is activated.
// Your extension is activated the very first time the command is executed.
export function activate(context: vscode.ExtensionContext)
{
	const disposable = vscode.commands.registerCommand('consoleMaster.addConsole',
		() =>
		{
			const configuration = readConfiguration();
			const documentContext: DocumentContext = {} as DocumentContext;

			const editor = vscode.window.activeTextEditor;
			if (!editor) { return; }
			let selection = editor.selection;
			if (!selection.isSingleLine)
			{
				// Display a message box to the user.
				vscode.window.showInformationMessage('Console Master: no usable selection.');
				return;
			}

			// const { tabSize, insertSpaces } = activeTextEditor.options;
			const document = editor.document;
			if (!document) { return; }
			documentContext.eol = document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
			// Take name at the end of the full path (Windows / Posix)
			documentContext.fileName = document.fileName.replace(/^.*[\\/]([^\\//]+)$/, '$1');

			const lineContext: LineContext = {} as LineContext;
			let { start } = selection;
			const currentLine = document.lineAt(start.line);
			const lineText = currentLine.text;
			lineContext.selectedText = document.getText(selection);

			let insertEmpty = false;
			// If no selection, try to get the word under the caret.
			if (lineContext.selectedText === '')
			{
				if (isCaretOnIdentifier(lineText, selection.start.character))
				{
					// selectedText = getIdentifierUnderCaret(lineText, start.character, 'includeThis');
					lineContext.selectedText = document.getText(document.getWordRangeAtPosition(selection.start, /[\w$.!?]+/));
				}
				else
				{
					// With this case, we insert the console statement right where the caret is, without newline nor semicolon.
					// Eg. we might want it at the ~ place: `tap(() => ~)`
					// (Maybe will to this with a setting, if requested.)
					insertEmpty = true;
				}
			}

			lineContext.lineNumber = start.line;

			// Take whitespace at the start of the line (spaces or tabs, whatever).
			lineContext.indentation = lineText.slice(0, currentLine.firstNonWhitespaceCharacterIndex);

			const insertPosition = insertEmpty ? start : new vscode.Position(start.line + 1, 0);

			const templateVariables = { ...configuration, ...documentContext, ...lineContext };

			editor.edit(
				(edit: vscode.TextEditorEdit) =>
				{
					edit.insert(insertPosition,
						insertEmpty ? buildEmptyConsoleLog(templateVariables) : buildFullConsoleLog(templateVariables)
					);
				}
			);
		}
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
