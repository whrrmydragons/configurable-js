const notNullOrUndefined = obj => obj !== null && obj !== undefined;
const isNullOrUndefined = obj => obj === null && obj === undefined;

/**
 *
 * @param {*} obj object to get values from
 * @param {*} accessString describes the path of keys to access in obj seperated by "."
 */
function getValueFromObjectUsingAccessString(obj, accessString) {
  return accessString.split(".").reduce((memory, key) => memory[key], obj);
}

/**
 *
 * @param {*} obj object to get values from
 * @param {*} accessString describes the path of keys to access in obj seperated by "."
 */
function pluck(obj, accessString = "") {
  return notNullOrUndefined(accessString)
    ? getValueFromObjectUsingAccessString(obj, accessString)
    : obj;
}
/**
 *
 * @param {*} initialObject will add key/values to this object through accessStringsAndValuesMap
 * @param {*} accessStringsAndValuesMap every key describes a deep "path" (keys separated by ".") in the object where the value will be set
 */
function generate(initialObject = {}, accessStringsAndValuesMap = {}) {
  accessStrings = Object.keys(accessStringsAndValuesMap);
  accessStrings.map(function(accessString) {
    deepSetObject(
      initialObject,
      accessString,
      accessStringsAndValuesMap[accessString]
    );
  });
  return initialObject;
}

function deepSetObject(obj, accessString, value) {
  if (isNullOrUndefined(accessString)) return obj;
  const accessKeys = accessString.split(".");
  const lastKey = accessKeys.pop();
  let deepObjectPointer = obj;
  //make sure path is defined
  accessKeys.map(function(key) {
    if (!(key in deepObjectPointer)) {
      deepObjectPointer[key] = {};
    }
    deepObjectPointer = deepObjectPointer[key];
  });
  //set value in path
  deepObjectPointer[lastKey] = value;
  return obj;
}

module.exports = {
  pluck,
  generate
};

console.log(generate({ "1": "1" }, { "x.y.z": 5, "x.y.x": 6 }));
