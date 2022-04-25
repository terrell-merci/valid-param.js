import { throwRequiredParamError, throwTypeError } from './errors.js'

/**
 * Validates parameters against a given object of valid types. Throws relevant error if parameter is invalid
 * @param {object} parameters 
 * @param {object} type_assignment <parameter_name: valid_type>
 */
export default class {
	constructor(parameters, type_assignment) {
		if (!isObject(parameters))
			throwTypeError('parameters', 'object')

		if (!isObject(parameters))
			throwTypeError('type_assignment', 'object')

		this.params = parameters

		this.assignments = type_assignment

		this.validate()
	}

	validate() {
		for (const key in this.assignments) {
			let value = this.params[key]

			let type = typeof value

			let string = this.assignments[key]

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

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'

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