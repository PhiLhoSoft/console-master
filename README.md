# console-master README

This extension for VSC (Visual Studio Code) aims to provide a quick and easy way to insert a console message into a source code (designed for JS / TS, but might be usable with other languages in the future).

## Features

Out of the box, the extension offers to insert a `console.log` call just below the line where the caret is.
The call has, by default, a message with file name and the line number where the caret was, and if an identifier was selected, or the caret was in such identifier, the identifier name is inserted in the message, and added at the end of the call, as parameter.

For example, given the following code snippet:
```typescript
	if (keySource in recordSource) {
		const value = recordSource[keySource];
		if (value === undefined || (typeof value === 'string' && value.length === 0)) {
			return;
		}
		recordTarget[keyTarget] = value;
	}
```
If the caret is in the `value` declaration, when you hit Ctrl+Shift+L (Cmd+Shift+L on Mac), you will get the following line below the declaration:
```typescript
		console.log('functions.ts (25) # value', value);
```
If the user selects `recordTarget[keyTarget]`, the inserted line, below the selection, will be:
```typescript
		console.log('functions.ts (29) # recordTarget[keyTarget]', recordTarget[keyTarget]);
```
In some cases, console-master can autoselect the variable. For example, in the following code snippet:
```typescript
	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.style.position = 'fixed'; // Avoid scrolling to bottom of page in Microsoft Edge.
	document.body.appendChild(textarea);
	textarea.select();
```
if the caret is on `position`, you will get:
```typescript
	console.log('service.ts (55) # textarea.style.position', textarea.style.position);
```

Lastly, if there is no selection, and if the caret isn't on an identifier, console-master will insert a simplified call, to be filled by yourself.
For example, with the snippet:
```typescript
	readonly isAuthenticated$ = this.authenticationState$.pipe(
		tap((state) => ~),
		map((state) => state === 'AUTHENTICATED'),
		distinctUntilChanged(),
	);
```
(the ~ marks the caret position), after typing the shortcut, you will have the following line:
```typescript
		tap((state) => console.log('service.ts (133)'))
```
Ie. no identifier, no semicolon (even if the setting says otherwise), you can add yourself the `state` variable or other information if you need it.

## Motivation

Why use these primitive logs when you can just put some breakpoints, trace runs, and examine variables?
I find this useful for various reasons, particularly when dealing with asynchronous events (primitives, RxJS flow): in these cases, sometime, stopping the process can break it, particularly if relying on timing.
It is also useful to trace complex data, to study how the various events are laid out (one before the other?), to log data variations over time, and so on.

## Requirements

No special requirements, should work out of the box in any text editor of VSC.

## Extension settings

This extension contributes the following settings:

* `consoleMaster.addSemicolon`: if true (default), add a semicolon at the end of the added line.
* `consoleMaster.quoteCharacter`: quotes around the message. Defaults to single quote, can be that, double quote or backticks.
* `addFileNameAndLineNumber`: if true (default), add the file name and the line number to the message.
* `consoleMaster.elementSeparator`: a character to separate the different message elements (file name, line number and selected variable name). Default to `#`.

## Known issues and limitations

Currently, it is relative inflexible, despite its options.
In the future, it should give more liberty for the user and their preferences.

## Planned features

- Commands to comment out, uncomment, and remove all the console calls in the opened buffer.
- A command to offer various choices, and insert the customized console call (group, time, etc.).
- Perhaps, in TS / JS source code, detect the function name / class name where the caret is, to add them to the message, and add after the sentence, not just the line.

## Release notes

### 0.1.0

Initial release of console-master.
