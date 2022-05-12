function obfuscateConnectionString (stringToObfuscate) {
  return stringToObfuscate.replace(/(.*:\/\/).*:.*(@.*)$/g, '$1####$2');
}

function obfuscateUrl (urlToObfuscate) {
  if (urlToObfuscate.includes('@')) {
    return urlToObfuscate.replace(/(\/recons\/\w+\/)(.+@.+\.\w+)(\/\w+)(.*)/g, '$1####$3$4');
  } else return urlToObfuscate;
}

module.exports = {
  obfuscateConnectionString, obfuscateUrl
};
