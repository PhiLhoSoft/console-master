import * as vscode from 'vscode';

import { Configuration, DocumentContext, LineContext, TemplateVariables } from './model';
import { isCaretOnIdentifier } from './vsc-functions';

export function buildEmptyConsoleLog(v: TemplateVariables): string
{
	return `console.log(${
			v.quoteCharacter
		}${
			buildFileNameAndLineNumber(v)
		}${
			v.quoteCharacter
		})`;
}

export function buildFullConsoleLog(v: TemplateVariables): string
{
	return `${
			v.indentation
		}console.log(${
			v.quoteCharacter
		}${
			buildFileNameAndLineNumber(v)
		}${
			v.selectedText
		}${
			v.quoteCharacter
		}, ${
			v.selectedText
		})${
			v.addSemicolon ? ';' : ''
		}${
			v.eol
		}`;
}

export function buildFileNameAndLineNumber(v: TemplateVariables): string
{
	if (!v.addFileNameAndLineNumber) { return ''; }
	if (v.insertEmpty)
	{
		return `${v.fileName} (${v.lineNumber})`;
	}
	return `${v.fileName} (${v.lineNumber}) ${v.elementSeparator} `;
}

export function readConfiguration(): Configuration
{
	const configuration = vscode.workspace.getConfiguration('consoleMaster');
	const as: boolean | undefined = configuration.get('addSemicolon');
	const addSemicolon: boolean = as === undefined ? true : as;
	const quoteCharacter: string = configuration.get('quoteCharacter') ?? '\'';
	const afnaln: boolean | undefined = configuration.get('addFileNameAndLineNumber');
	const addFileNameAndLineNumber: boolean = afnaln === undefined ? true : afnaln;
	const elementSeparator: string = configuration.get('elementSeparator') ?? '#';

	return { addSemicolon, quoteCharacter, addFileNameAndLineNumber, elementSeparator };
}

export function computeDocumentContext(): DocumentContext
{
	const editor = vscode.window.activeTextEditor;
	if (!editor) { return { eol: '\n', fileName: '?' }; }

	// const { tabSize, insertSpaces } = activeTextEditor.options;
	const document = editor.document;

	const eol = document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
	// Take name at the end of the full path (Windows / Posix)
	const fileName = document.fileName.replace(/^.*[\\/]([^\\//]+)$/, '$1');

	const documentContext: DocumentContext = { eol, fileName };
	return documentContext;
}

export function computeLineContext(
	selection: vscode.Selection,
	document: vscode.TextDocument,
): LineContext
{
	const { start } = selection;
	const lineNumber = start.line;
	const currentLine = document.lineAt(start.line);
	const lineText = currentLine.text;
	let selectedText = document.getText(selection);
	// Take whitespace at the start of the line (spaces or tabs, whatever).
	const indentation = lineText.slice(0, currentLine.firstNonWhitespaceCharacterIndex);

	let insertEmpty = false;
	// If no selection, try to get the word under the caret.
	if (selectedText === '')
	{
		if (isCaretOnIdentifier(lineText, selection.start.character))
		{
			// selectedText = getIdentifierUnderCaret(lineText, start.character, 'includeThis');
			selectedText = document.getText(document.getWordRangeAtPosition(selection.start, /[\w$.!?]+/));
		}
		else
		{
			// With this case, we insert the console statement right where the caret is, without newline nor semicolon.
			// Eg. we might want it at the ~ place: `tap(() => ~)`
			// (Maybe will to this with a setting, if requested.)
			insertEmpty = true;
		}
	}
	const insertPosition = insertEmpty ? start : new vscode.Position(start.line + 1, 0);

	const lineContext: LineContext = { lineNumber, selectedText, indentation, insertEmpty, insertPosition };
	return lineContext;
}
