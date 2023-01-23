export function getFormatParts(urlFormatString) {
    return urlFormatString.split('/');
}

export function getURLInstanceParts(urlInstanceString) {
    return urlInstanceString.replace(/\?.*/,"").split('/');
}

export function getSearchParamParts(urlInstanceString) {
    return urlInstanceString.split('?')[1]?.split('&');
}

export function getSearchParamPairs(urlInstanceString) {
    const searchParamParts = getSearchParamParts(urlInstanceString);

    if(!searchParamParts)
      return [];

    return searchParamParts.map(
        searchParamPart => searchParamPart.split('=')
    );
}

export function removeEmptyPairs(pairs) {
    return pairs.filter(pair => pair.length);
}

export function getPathPairs(urlParts, urlInstanceParts){
  const filterOutNonVariablePathParts = (key, index) => {
    return key.startsWith(':')
      ? [key.replace(":",""), urlInstanceParts[index]]
      : [];
  }
  const pairs = urlParts.map( filterOutNonVariablePathParts )
  return pairs;
}

export function urlToHash(urlFormatString, urlInstanceString) {
  const urlFormatParts = getFormatParts(urlFormatString);
  const urlInstanceParts = getURLInstanceParts(urlInstanceString);
  
  const pathPairs = getPathPairs(urlFormatParts, urlInstanceParts);
  const searchParamPairs = getSearchParamPairs(urlInstanceString);
  
  const allPairs = removeEmptyPairs([...pathPairs, ...searchParamPairs]);
  return Object.fromEntries(allPairs);
}