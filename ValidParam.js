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
	new ValidParam(parameters, valid_types = {
		name: '?string',
		company_name: '?string',
		street: 'string',
		street_2: '?string',
		city: 'string',
		state: 'string',
		zip: 'string|number',
	})

	const lines = [
		'<b>{name}</b><br>',
		'{company_name}<br>',
		'{street}<br>',
		'{street_2}<br>',
		'{city}, {state} {zip}',
	]

	let address = ""

	lines.forEach(function (line) {
		let keys = getKeys(line)

		if (!parameters[keys[0]])
			return

		keys.forEach((key) => line = line.replace(`{${key}}`, parameters[key]))

		address += line
	})

	return address
}

console.log(getAddressBlock({ name: 'James Roberts', company_name: 'Matoaka Rails Inc', street: '1178 Industrial Blvd', city: 'Matoaka', state: 'WV', zip: 24736 }))







/**
 * Returns the keys hinted inside a given address line
 * @param {string} str 
 * @param {string} start_delim 
 * @param {string} end_delim 
 * @returns 
 */
function getKeys(str, start_delim = '{', end_delim = '}') {
	let arr = []

	str.split(start_delim).forEach(function (split) {
		if (!split.includes(end_delim))
			return

		arr.push(split.split(end_delim)[0])
	})

	return arr
}







// --------------------------------------------------------------------------------------------
// js/helpers/validation.js
// (Normally I would place validation helper functions (if used) in their own js file for reuse)
// --------------------------------------------------------------------------------------------

/**
 * Validates parameters against a given object of valid types. Throws relevant error if parameter is invalid
 * @param {object} parameters 
 * @param {object} valid_types <parameter_name: valid_type>
 */
function validateParameterTypes(parameters, valid_types) {
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

/**
 * Throws a Required Parameter error
 * @param {string} required_param
 */
function throwRequiredParamError(required_param) {
	throw new Error(`Missing required parameter '${required_param}'`)
}

/**
 * Throws a Type error
 * @param {string} param 
 * @param {string} valid_type 
 * @param {string} given_type 
 */
function throwTypeError(param, valid_type, given_type) {
	throw new Error(`Expected type ${valid_type.toString().replace(',', '|')} for parameter '${param}'; received type ${given_type}`)
}