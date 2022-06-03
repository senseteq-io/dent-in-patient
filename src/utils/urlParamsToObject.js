const urlParamsToObject = (searchString) => {
  if (!searchString || typeof searchString !== 'string') return null
  // Remove '?' symbol from search query
  const paramsString = searchString.substring(1)

  // Convert paramsString to JSON object and then parse
  // To convert unto JSON object we remove & symbols, replace '=' to ':'
  // and wrap all into {} than parse as JSON structure

  // second parameter to JSON parse specifies how to convert JSON object
  // as some values can be encoded - we decode them with native function
  return JSON.parse(
    '{"' + paramsString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === '' ? value : decodeURIComponent(value)
    }
  )
}

export default urlParamsToObject
