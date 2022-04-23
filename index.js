import { throwRequiredParamError, throwTypeError } from './errors.js'

/**
 * Validates parameters against a given object of valid types. Throws relevant error if parameter is invalid
 * @param {object} parameters 
 * @param {object} valid_types <parameter_name: valid_type>
 */
class ValidParam {
	constructor(parameters, valid_types) {
		for (const key in valid_types) {
			let value = parameters[key]

			let type = typeof value

			let string = valid_types[key]

			if (!string)
				string = 'null'

			if (!isNullable(string) && !value)
				throwRequiredParamError(key)

			if (isNullable(string))
				string = handleNull(string)

			let types = string.split('|')

			if (!isValid(value, types))
				throwTypeError(key, types, type)
		}
	}
}

/**
 * Returns a given address formatted as an HTML block.
 * Utilizes the object literal syntax; expects the parameters to be passed as an object {}
 * @param {*} parameters 
 * @returns {string} String with HTML tags included
 */
function getAddressBlock(parameters = {}) {
	new ValidParam(parameters, {
		name: '?string',
		company_name: '?string',
		street: 'string',
		street_2: '?string',
		city: 'string',
		state: 'string',
		zip: 'string|number',
	})

	return `${parameters.name}<br>${parameters.company_name}<br>${parameters.street}<br>${parameters.street_2}<br>${parameters.city}, ${parameters.state} ${parameters.zip}<br>`
}

console.log(getAddressBlock({ name: 'James Roberts', company_name: 'Matoaka Rails Inc', street: '1178 Industrial Blvd', city: 'Matoaka', state: 'WV', zip: 24736 }))





function isNullable(str) {
	return str.charAt(0) == '?' || str.includes('null')
}

function handleNull(str) {
	if (str.includes('?'))
		str = str.replace('?', '')

	if (!str.includes('null'))
		str = `${str}|null`

	return str
}

function isValid(str, types) {
	let bool = false

	types.forEach(function (type) {
		if (type == 'null' && (typeof str === 'null' || typeof str === 'undefined')) {
			bool = true

			return
		}

		if (typeof str === type)
			bool = true
	})

	return bool
}







// --------------------------------------------------------------------------------------------
// js/helpers/error.js
// (Normally I would place error functions (if used) in their own js file for reuse)
// --------------------------------------------------------------------------------------------