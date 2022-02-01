/**
 * Is a given value undefined?
 *
 * (c) https://github.com/jashkenas/underscore/blob/b713f5a6d75b12c8c57fb3f410df029497c2a43f/modules/isUndefined.js
 *
 * @param {any} value
 * @returns {boolean}
 */
function isUndefined(value) {
  return value === void 0;
}

module.exports.isUndefined = isUndefined;
