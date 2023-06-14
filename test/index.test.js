'use strict';
const { expect } = require('chai');
const Web3 = require('web3');
const Deployments = require('@8pay/deployments');
const EightPay = require('..');
const FixedRecurring = require('../lib/fixed-recurring');
const VariableRecurring = require('../lib/variable-recurring');
const OnDemand = require('../lib/on-demand');
const Accounts = require('../lib/accounts');
const Utils = require('../lib/utils');

describe('EightPay', function () {
  it('should create an instance of EightPay', function () {
    const web3 = new Web3('http://localhost:8545');
    const eightPay = new EightPay(web3, EightPay.Network.PRIVATE);

    expect(eightPay.fixedRecurring).to.be.instanceOf(FixedRecurring);
    expect(eightPay.variableRecurring).to.be.instanceOf(VariableRecurring);
    expect(eightPay.onDemand).to.be.instanceOf(OnDemand);
    expect(eightPay.utils).to.be.instanceOf(Utils);
    expect(eightPay.accounts).to.be.equal(Accounts);
  });

  it('should expose networks', () => {
    expect(EightPay.Network).to.be.equal(Deployments.Network);
  });
});
