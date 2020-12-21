import * as vscode from 'vscode';

export function isSelectionEmpty(selection: vscode.Selection): boolean
{
	return isSelectionOnOneLine(selection) && selection.start.character === selection.end.character;
}

export function isSelectionOnOneLine(selection: vscode.Selection): boolean
{
	return selection.start.line === selection.end.line;
}

export function isIdentifierChar(char: string): boolean
{
	// alphanumerical or _ or $
	return /[\w$]/.test(char);
}

export function isCaretOnIdentifier(line: string, caretIndex: number): boolean
{
	return caretIndex > 0 && isIdentifierChar(line.charAt(caretIndex - 1)) ||
		caretIndex < line.length && isIdentifierChar(line.charAt(caretIndex + 1));
}

export function getIdentifierUnderCaret(line: string, caretIndex: number, options?: 'includeThis'): string
{
	let start = caretIndex;
	let end = caretIndex;
	while (start > 0 && isIdentifierChar(line.charAt(start - 1))) { start--; }
	if (options === 'includeThis' && start >= 5)
	{
		if (line.slice(start - 5, start) === 'this.')
		{
			start -= 5;
		}
	}
	while (end < line.length && isIdentifierChar(line.charAt(end + 1))) { end++; }
	return line.slice(start, end + 1);
}

export function isCaretAfterThis(line: string, caretIndex: number): boolean
{
	if (caretIndex < 5) { return false; }
	const previousChars = line.slice(caretIndex - 5, caretIndex);
	return previousChars === 'this.';
}

export async function selectWord(line: string, caretIndex: number): Promise<void>
{
	if (isCaretOnIdentifier(line, caretIndex))
	{
		// Go to start of word (unless VSC stops on camel-case…)
		await vscode.commands.executeCommand('cursorWordLeft');
	}
	// Select to end of word
	await vscode.commands.executeCommand('cursorWordRightSelect');
}
