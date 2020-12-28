import * as vscode from 'vscode';

export type Configuration =
{
	addSemicolon: boolean,
	quoteCharacter: string,
	addFileNameAndLineNumber: boolean,
	elementSeparator: string,
};

export type DocumentContext =
{
	fileName: string,
	eol: string,
};

export type LineContext =
{
	insertEmpty: boolean;
	lineNumber: number,
	indentation: string,
	selectedText: string,
};

export type TemplateVariables = Configuration & DocumentContext & LineContext;

export function readConfiguration(): Configuration {
	const configuration = vscode.workspace.getConfiguration('consoleMaster');
	const as: boolean | undefined = configuration.get('addSemicolon');
	const addSemicolon: boolean = as === undefined ? true : as;
	const quoteCharacter: string = configuration.get('quoteCharacter') || '\'';
	const afnaln: boolean | undefined = configuration.get('addFileNameAndLineNumber');
	const addFileNameAndLineNumber: boolean = afnaln === undefined ? true : afnaln;
	const elementSeparator: string = configuration.get('elementSeparator') || '#';

	return { addSemicolon, quoteCharacter, addFileNameAndLineNumber, elementSeparator };
}
