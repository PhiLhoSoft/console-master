import * as vscode from 'vscode';

export type Configuration =
{
	addSemicolon: boolean;
	quoteCharacter: string;
	addFileNameAndLineNumber: boolean;
	elementSeparator: string;
};

export type DocumentContext =
{
	fileName: string;
	eol: string;
};

export type LineContext =
{
	insertEmpty: boolean;
	lineNumber: number;
	indentation: string;
	selectedText: string;
	insertPosition: vscode.Position;
};

export type TemplateVariables = Configuration & DocumentContext & LineContext;
