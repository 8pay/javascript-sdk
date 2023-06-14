'use strict';
const Deployments = require('@8pay/deployments');
const ContractLoader = require('./lib/core/contract-loader');
const FixedRecurring = require('./lib/fixed-recurring');
const VariableRecurring = require('./lib/variable-recurring');
const OnDemand = require('./lib/on-demand');
const accounts = require('./lib/accounts');
const Utils = require('./lib/utils');

class EightPay {
  constructor(web3, network) {
    this._web3 = web3;
    this._contractLoader = new ContractLoader(web3, network);
    this.accounts = accounts;
    this.fixedRecurring = new FixedRecurring(web3, this._contractLoader);
    this.variableRecurring = new VariableRecurring(web3, this._contractLoader);
    this.onDemand = new OnDemand(web3, this._contractLoader);
    this.utils = new Utils(network);
  }
}

module.exports = EightPay;
module.exports.Network = Deployments.Network;
