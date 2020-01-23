'use strict';
const { expect } = require('chai');
const Web3 = require('web3');
const EightPay = require('..');
const FixedRecurring = require('../lib/fixed-recurring');
const ContractLoader = require('../lib/core/contract-loader');
const Transaction = require('../lib/core/transaction');
const { InvalidPlanIdError, InvalidSubscriptionIdError, NotAnArrayError } = require('../lib/errors');

describe('Fixed Recurring', () => {
  const planId = '0x57b2059e526841b3dfd964144513359c9fcfd6d91040b6c47f589c1e032b6bf4';
  const subscriptionIds = ['0xe63ba761797e289076f80a7c0916a31740684806aaf507da85f81ee785fec6ba'];

  before(function () {
    this.web3 = new Web3('http://localhost:8545');
    this.contractLoader = new ContractLoader(this.web3, EightPay.Network.PRIVATE);
    this.fixedRecurring = new FixedRecurring(this.web3, this.contractLoader);
  });

  context('bill', function () {
    it('should bill subscriptions', function () {
      const contract = this.contractLoader.load('FixedRecurringSubscriptionsManagement');
      const method = contract.methods.bill(planId, subscriptionIds);
      const transaction = this.fixedRecurring.bill(planId, subscriptionIds);

      expect(transaction).be.instanceOf(Transaction);
      expect(transaction.to).be.equal(contract.options.address);
      expect(transaction.data).be.equal(method.encodeABI());
    });

    it('should throw an error if planId in invalid', function () {
      const invalidPlanId = 'my-plan-id';
      const error = new InvalidPlanIdError(invalidPlanId);
      const fn = () => this.fixedRecurring.bill(invalidPlanId, subscriptionIds);

      expect(fn).to.throw(error.message).and.be.instanceOf(InvalidPlanIdError);
    });

    it('should throw an error if subscriptionIds in not an array', function () {
      const error = new NotAnArrayError('subscriptionIds');
      const fn = () => this.fixedRecurring.bill(planId, {});

      expect(fn).to.throw(error.message).and.be.instanceOf(NotAnArrayError);
    });

    it('should throw an error if a subscriptionId in invalid', function () {
      const invalidSubscriptionId = 'invalid-subscription-id';
      const error = new InvalidSubscriptionIdError(invalidSubscriptionId);
      const fn = () => this.fixedRecurring.bill(planId, [invalidSubscriptionId]);

      expect(fn).to.throw(error.message).and.be.instanceOf(InvalidSubscriptionIdError);
    });
  });

  context('terminate', function () {
    it('should terminate subscriptions', async function () {
      const contract = this.contractLoader.load('FixedRecurringSubscriptionsManagement');
      const method = contract.methods.terminate(planId, subscriptionIds);
      const transaction = this.fixedRecurring.terminate(planId, subscriptionIds);

      expect(transaction).be.instanceOf(Transaction);
      expect(transaction.to).be.equal(contract.options.address);
      expect(transaction.data).be.equal(method.encodeABI());
    });

    it('should throw an error if planId in invalid', function () {
      const invalidPlanId = 'my-plan-id';
      const error = new InvalidPlanIdError(invalidPlanId);
      const fn = () => this.fixedRecurring.terminate(invalidPlanId, subscriptionIds);

      expect(fn).throw(error.message).and.be.instanceOf(InvalidPlanIdError);
    });

    it('should throw an error if subscriptionIds in not an array', function () {
      const error = new NotAnArrayError('subscriptionIds');
      const fn = () => this.fixedRecurring.terminate(planId, {});

      expect(fn).throw(error.message).and.be.instanceOf(NotAnArrayError);
    });

    it('should throw an error if a subscriptionId in invalid', function () {
      const invalidSubscriptionId = 'invalid-subscription-id';
      const error = new InvalidSubscriptionIdError(invalidSubscriptionId);
      const fn = () => this.fixedRecurring.terminate(planId, [invalidSubscriptionId]);

      expect(fn).throw(error.message).and.be.instanceOf(InvalidSubscriptionIdError);
    });
  });
});
