'use strict';
const Tokens = require('@8pay/tokens');

class Utils {
  constructor(network) {
    this._tokens = new Tokens(network);
  }

  parseAmount(amount, tokenOrSymbol) {
    return this._tokens.parseAmount(amount, tokenOrSymbol);
  }

  formatAmount(amount, tokenOrSymbol) {
    return this._tokens.formatAmount(amount, tokenOrSymbol);
  }
}

module.exports = Utils;
