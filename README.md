# valid-param.js
Convenient and dependency free method of validating function parameters

```js
function getAddressBlock(parameters = {}) {
	new ValidParam(parameters, valid_types = {
		name: '?string',
		company_name: '?string',
		street: 'string',
		street_2: '?string',
		city: 'string',
		state: 'string',
		zip: 'string|number',
	})

	return `${name}<br>${company_name}<br>${street}<br>${street_2}<br>${city}, ${state} ${zip}`
}
```
