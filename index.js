import { throwRequiredParamError, throwTypeError } from './errors.js'

/**
 * Validates parameters against a given object of valid types. Throws relevant error if parameter is invalid
 * @param {object} parameters 
 * @param {object} valid_types <parameter_name: valid_type>
 */
export default class {
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