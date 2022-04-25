/**
 * Throws a Required Parameter error
 * @param {string} required_param
 */
export function throwRequiredParamError(required_param) {
	throw new Error(`Missing required parameter '${required_param}'`)
}

/**
 * Throws a Type error
 * @param {string} param 
 * @param {string} valid_type 
 * @param {string} given_type 
 */
export function throwTypeError(param, valid_type, given_type = null) {
	let err_msg = `Expected type ${valid_type.toString().replace(',', '|')} for parameter '${param}'`

	if (given_type)
		err_msg += `; received type ${given_type}`

	throw new Error(err_msg)
}