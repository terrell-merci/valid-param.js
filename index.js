import { throwRequiredParamError, throwTypeError } from './src/errors.js'

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

			let string = this.assignments[key].toLowerCase()

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

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function isValid(str, types) {
	const available_types = [
		['string', 'str'],
		['number', 'num', 'int'],
		['boolean', 'bool'],
		['array', 'arr'],
		['object', 'obj'],
		['null', 'undefined'],
		['mixed', 'any'],
	]

	let bool = false

	types.forEach(function (type) {
		available_types.forEach(function (variations) {
			variations.forEach(function (variation) {
				if (type == variation) {
					if (eval(`is${capitalizeFirstLetter(variations[0])}(str)`))
						bool = true
				}
			})
		})
	})

	return bool
}

const isString = (value) => typeof value === "string"

const isNumber = (value) => typeof value === "number"

const isBoolean = (value) => typeof value === "boolean"

const isArray = (value) => Array.isArray(value)

const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]'

const isNull = (value) => !value || typeof value === 'undefined'

const isMixed = (value) => typeof value !== 'undefined'

