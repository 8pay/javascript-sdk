'use strict';
const validator = require('validator');

validator.isHash = hash => /^0x([A-Fa-f0-9]{64})$/.test(hash);

module.exports = validator;
