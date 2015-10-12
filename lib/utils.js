'use strict';

var _ = require('lodash');

module.exports = {
  /**
   * Trace up the ancestry of objects that have a `parent` key, finding the
   * first instance of the provided key.
   *
   * @param {Object} options The options object with potential parents.
   * @param {String} key The key for which to look.
   */
  getInheritedOption: function(options, key) {
    var target = options;
    while (target) {
      if (_.has(target, key)) {
        return target[key];
      }
      target = target.parent;
    }
  },
  /**
   * Override a value with supplied environment variable if present.
   *
   * @param {String} envname The environment variable to override.
   * @param {String} value The default value if no env is set.
   * @param {Function} coerce A function that returns the environment
   *   variable in an acceptable format. If this throws an error, the
   *   default value will be used.
   * @returns {String} The fully resolved value
   */
  envOverride: function(envname, value, coerce) {
    if (process.env[envname] && process.env[envname].length) {
      if (coerce) {
        try {
          return coerce(process.env[envname], value);
        } catch (e) {
          return value;
        }
      }
      return process.env[envname];
    }
    return value;
  },

  /**
   * Add a subdomain to the specified HTTP origin.
   * @param {String} origin The HTTP origin (e.g. https://example.com)
   * @param {String} subdomain The subdomain to add
   * @returns {String} The origin for the domain with a subdomain
   */
  addSubdomain: function(origin, subdomain) {
    return origin.replace('//', '//' + subdomain + '.');
  }
};
