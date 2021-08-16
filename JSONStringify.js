const stringifyJSON = (obj) => {
  //base case is if obj is primitive, null, or undefined
  if (typeof(obj) === 'string') {
    return `\"${obj}\"`;
  } else if (typeof(obj) === 'number' || typeof(obj) === 'boolean') {
    return obj.toString();
  } else if (obj === null) {
    return 'null';
  } else if (obj === undefined) {
    return;
  } else if (Array.isArray(obj)) {
    return `[${obj.map(function(input) {
      return stringifyJSON(input);
    })}]`
  } else if (typeof(obj) === 'object') {
    if (Object.keys(obj).length === 0) {
      return '{}'
    }
    let result = '{'
    for (let key in obj) {
            if (typeof(obj[key]) === 'function') {
              result += '';
            } else {
              result += `${stringifyJSON(key)}:${stringifyJSON(obj[key])},`;
            }
          }
          return `${result.substring(0, result.length - 1)}}`
        }
}
export default stringifyJSON