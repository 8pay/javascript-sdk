'use strict';
const { expect } = require('chai');
const EightPay = require('..');
const Utils = require('../lib/utils');

describe('Utils', () => {
  before(function () {
    this.utils = new Utils(EightPay.Network.PRIVATE);
  });

  it('should parse an amount', function () {
    const rawAmount = '1';
    const expectedParsedAmount = '1000000000000000000';
    const actualParsedAmount = this.utils.parseAmount(rawAmount, 'BNB');

    expect(expectedParsedAmount).to.be.equal(actualParsedAmount);
  });

  it('should format an amount', function () {
    const rawAmount = '1000000000000000000';
    const expectedFormattedAmount = '1';
    const actualFormattedAmount = this.utils.formatAmount(rawAmount, 'BNB');

    expect(expectedFormattedAmount).to.be.equal(actualFormattedAmount);
  });
});
