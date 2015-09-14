/**
 * Module dependencies.
 */

var t = require('t-component');
var config = require('../../config');

/**
 * Load localization dictionaries to translation application
 */

var en = require('./lib/en');
var es = require('./lib/es');

module.exports.t = t;

// English
t.en = en;

// Spanish
t.es = es;

t.lang(config.locale);
