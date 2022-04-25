# valid-param.js
> Convenient method of validating function parameters when passed as properties of an object (object literal).

## Installation
### NPM
```
npm install valid-param.js
```
### From CDN
1. Visit https://cdnjs.com/libraries/valid-param.js
2. Add CDN link to your site with <script>
### Using build / minified version
1. Download valid-param.min.js
2. Add to your site with `<script>`
### Tip
valid-param.js was designed with the intent of validating function parameters passed as properties of an object, but really can be used to validate properties of any object.
## Use
Simply call the `ValidParam` class and pass in the parameters object as the first argument, along with a 'type assignment' object as the second argument. The 'type assignment' object associates each expected parameter with an acceptable type. If any parameter value is passed with an incorrect type, the appropriate error is thrown.
```js
function getProfileBlock(parameters = {}) {
	new ValidParam(parameters, {
		name: 'string',
		age: 'number',
	})

	return `${name}<br>${age}`
}	
```
### Assigning types
Parameter types are assigned inside of the 'type assignment' object. The key should refer to the paramenter name while the value refers to that parameter's type assignment.
```js
	{
		age: 'number',
	}
``` 
#### Default types
If you would like to assign a default type to non-typed parameters, you can you simply add a `default` property to the 'type assignment' object.
```js
	{
		age: 'number',
		default: 'string'
	}
```
Any parameter (or object-property) that is not explicitly typed in the 'type assignment' object will default to this setting. If a default is not set, all non-typed paramaters will be ignored.
#### Multiple types
To assign multiple acceptable types, simply separate each type with a `|` mark.
```js
	{
		age: 'string|number',
	}
```
#### Allowing null values
A parameter can be made nullable by simply adding the `null` type to the assignment string.
```js
	{
		age: 'string|number|null',
	}
```
If there is only a single acceptable type, then simply add `?` at the beginning of the string.
```js
	{
		age: '?string',
	}
```
#### Assigning `mixed` and `any`
If parameter can be of any type, including `null`, programmer may use the `mixed` or `any` types. Either will allow any value through, regardless of type.
```js
	{
		age: 'mixed',
	}
``` 
## Contribute
Pull requests are welcomed to this project
