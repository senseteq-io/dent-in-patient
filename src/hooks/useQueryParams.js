const useQueryParams = (variable) => {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1])
    }
  }
}

export default useQueryParams
