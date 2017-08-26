## Coding Standards

1. Tabs not spaces
2. Variables are in camelCase
```js
var hello_world // Bad

var helloWorld // Good
```
3. Classes should be documented in JsDoc
4. Don't Abbreviate variables
```js
var getBP // Bad

var getBodyParser // Good
```
5. Multiline If statements and for loops must all have brackets
```js
// Bad
if (true)
	return;

// Good
if (true) {
	return;
}

// Good
if (true) return;
```
6. Brackets must have a space before the parenthesis and keyword
```js
	// Bad
	if(true){
	}

	// Good
	if (true) {
	}
```
7. Nested functions should be written in arrow notation
```js
	// Good
	forEach(() => {
	});

	// Bad
	forEach(function() {
	});
```
8. Requiring modules must be declared with `const`
```js
var module = require('module'); // Bad

const module = require('module'); // Good
```

9. Use javascript truthy and falsy values whenever necessary
```js
	// Bad
	if (myVar == null) {
	}

	// Good
	if (!myVar) {
	}
```

10. Prefer forEach over for loops to iterate over arrays
```js
	// Bad
	const arr = [1, 2, 3, 4, 5];
	for (let i = 0; i < arr.length; i++) {
		console.log(arr[i]);
	}

	// Good
	const arr = [1, 2, 3, 4, 5];
	arr.forEach((value) => {
		console.log(value);
	});
```

11. Prefer single quotes over double quotes
```js
const message = "Hello, World" // Bad

const message = 'Hello, World' // Good
```

12. Prefer string interpolation over concatenation on variabes in the middle of the string
```js
	const myString = 'five plus one is ' + (5 + 1) + '. More text'; // Bad

	const myString = `five plus one is ${5 + 1}. More text`; // Good
	const myString = 'five plus one is ' + (5 + 1); // Fine
```

13. Don't chain variable assignments
```js
// Bad
let a = b = c = 1;

// Good
let a = 1;
let b = a;
let c = a;
```

14. Add spaces inside curly braces
```js
// bad
const json = {foo: 'bar'};

// good
const json = { foo: 'bar' };
```

15. Use the literal syntax for object creation.
```js
// bad
const object = new Object();

// good
const object = {};
```
