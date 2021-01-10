# Console Master, the logging utility for TS & JS

This extension for VSC (Visual Studio Code) aims to provide a quick and easy way to insert a console message into a source code (designed for JS / TS, but might be usable with other languages in the future).

## Features

Out of the box, the extension offers to insert a `console.log` call just below the line where the caret is (or where the carets are, the extension supports multiple carets / selections) with just a keyboard shortcut.
The call has, by default, a message with the file name and the line number where the caret is, and if an identifier was selected, or the caret was in such identifier, the identifier itself. The identifier is also added as a parameter of the function call.

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
In some cases, Console Master can autofind the variable. For example, in the following code snippet:
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
The identifier detection includes dots, but also `!.` and `?.`. It includes the whole chain, ie. if the caret is on `body`, all `document.body.appendChild` will be included, you will have to remove the function name yourself.

Lastly, if there is no selection, and if the caret isn't on an identifier, Console Master will insert a simplified call, to be filled by yourself.
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
Ie. no identifier, no semicolon (even if the settings say otherwise), you can add yourself the `state` variable or other information if you need it.

## Usage notes

- If the selection isn't usable (eg. multilines), the extension will warn you and do nothing.
- Garbage in, garbage out: if you select random things (with spaces, etc.), Console Master will trust you and use this string as if it was an identifier.
- Console Master always inserts after the current line. If you want the log elsewhere, just move the line (default shortcut: Alt+Up or Alt+Down).

## Motivation

Why use these primitive logs when you can just put some breakpoints, run step-by-step, and examine variables?
I find this useful for various reasons, particularly when dealing with asynchronous events (primitives, RxJS flow): in these cases, sometime, timing is important, stopping the process can break it.
And this can be faster than putting breakpoints in lot of places, running / stepping lot of time, to see the results.
It is also useful to trace complex data (no need to memorize them), to study how the various events are laid out (one before the other?), to log data variations over time, and so on.

Linter can flag out these logs as warning, as they are often unwanted in production code (slow down, spam the browser's console). It is not important in the development process, as long as you remove them before commiting the code. The Problems tab can list them, so you can find them quickly this way.

## Requirements

No special requirements, should work out of the box in any text editor of VSC.

## Extension settings

This extension contributes the following settings:

* `consoleMaster.addSemicolon`: if true (default), add a semicolon at the end of the added line.
* `consoleMaster.quoteCharacter`: style of quotes around the message. Defaults to single quote, can be that, double quote or backticks.
* `addFileNameAndLineNumber`: if true (default), add the file name and the line number to the message.
* `consoleMaster.elementSeparator`: a character to separate the different message elements (file name & line number and selected variable name). Default to `#`.

## Known issues and limitations

Currently, it is relatively inflexible, despite its options.
In the future, it should give more liberty for the user and their preferences.

## Planned features

- Commands to comment out, uncomment, and remove all the console calls in the opened buffer.
- A command to offer various choices, and insert the customized console call (group, time, etc.).
- Perhaps, in TS / JS source code, detect the function name / class name where the caret is, to add them to the message, and add after the sentence, not just the line.

## Release notes

### 1.0.0

- Handle multiple cursors.
- Various refactors for code flexibility and some fixes.

### 0.1.0

Initial release of Console Master.
