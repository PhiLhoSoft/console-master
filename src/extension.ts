// The module 'vscode' contains the VS Code extensibility API.
// Import the module and reference it with the alias vscode in your code below.
import * as vscode from 'vscode';

import {
	buildEmptyConsoleLog,
	buildFullConsoleLog,
	computeDocumentContext,
	computeLineContext,
	readConfiguration,
} from './console-functions';
import { Configuration, DocumentContext } from './model';

// This method is called when your extension is activated.
// Your extension is activated the very first time the command is executed.
export function activate(context: vscode.ExtensionContext): void
{
	const disposable = vscode.commands.registerCommand('consoleMaster.addConsole',
		() =>
		{
			const configuration = readConfiguration();

			const editor = vscode.window.activeTextEditor;
			if (!editor) { return; }
			if (editor.selections.length === 1 && !editor.selection.isSingleLine)
			{
				// Display a message box to the user.
				void vscode.window.showInformationMessage('Console Master: no usable selection.');
				return;
			}

			const variables: Configuration & DocumentContext = { ...configuration, ...computeDocumentContext() };
			void editor.edit(
				(edit: vscode.TextEditorEdit) =>
				{
					// Handle multiple selections
					editor.selections.forEach(
						(selection) =>
						{
							const templateVariables = { ...variables, ...computeLineContext(selection, editor.document) };

							edit.insert(templateVariables.insertPosition,
								templateVariables.insertEmpty ?
									buildEmptyConsoleLog(templateVariables) :
									buildFullConsoleLog(templateVariables),
							);
						},
					);
				},
			);
		},
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
// export function deactivate() {}
