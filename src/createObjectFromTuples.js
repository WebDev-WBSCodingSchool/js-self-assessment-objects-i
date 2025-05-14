/**
 * Creates an object from an array of tuples.
 *
 * Each tuple in the input array should have two elements: the first element will be the key
 * and the second element will be the value in the resulting object.
 *
 * Not all JavaScript values can be valid object keys directly.
 *
 * @param {Array<Array<any>>} arrOfTuples - An array of tuples, where each inner array (tuple)
 * is expected to have two elements: `[key, value]`.
 * @returns {object} An object constructed from the tuples. The properties are the first
 * elements of the tuples, and the values are the second elements.
 * @example
 * // Basic usage
 * createObjectFromTuples([["one", 1], ["two", 2]]);
 * // Expected output: { one: 1, two: 2 }
 *
 * @example
 * // Handling null keys
 * createObjectFromTuples([["one", 1], [null, "value for null"]]);
 * // Expected output: { one: 1, null: "value for null" }
 *
 * @example
 * // Ignoring [object Object] keys
 * createObjectFromTuples([["a", 1], [{}, "ignored"], ["b", 2]]);
 * // Expected output: { a: 1, b: 2 }
 *
 * @example
 * // Not overwriting existing keys
 * createObjectFromTuples([["key1", "initialValue"], ["key1", "newValue"]]);
 * // Expected output: { key1: "initialValue" }
 *
 * @example
 * // Mixed data types
 * createObjectFromTuples([["name", "Alice"], ["age", 30], [Symbol("id"), "xyz123"]]);
 * // Expected output: { name: "Alice", age: 30, [Symbol(id)]: "xyz123" }
 */
function createObjectFromTuples(arrOfTuples) {
  // TODO: Given an Array of Tuples - [["one", 1], ["two", 2]] - return an object, where the properties are tuple[0], the values tuple[1] - { one: 1, two: 2 }
  // not everything in JavaScript can be key in an object, but some things can be made keys - ignore all other
  // if a key is set already, don't overwrite it

  return 'NOT IMPLEMENTED';
}

export default createObjectFromTuples;
