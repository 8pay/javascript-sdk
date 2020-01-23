'use strict';
const { expect } = require('chai');
const Web3 = require('web3');
const EightPay = require('..');
const OnDemand = require('../lib/on-demand');
const Transaction = require('../lib/core/transaction');
const ContractLoader = require('../lib/core/contract-loader');
const {
  InvalidPlanIdError,
  InvalidSubscriptionIdError,
  NotAnArrayError,
  InvalidAmountError,
  LengthMismatchError
} = require('../lib/errors');

describe('On Demand', () => {
  const planId = '0x57b2059e526841b3dfd964144513359c9fcfd6d91040b6c47f589c1e032b6bf4';
  const subscriptionIds = ['0xe63ba761797e289076f80a7c0916a31740684806aaf507da85f81ee785fec6ba'];
  const amounts = ['10000'];

  before(function () {
    this.web3 = new Web3('http://localhost:8545');
    this.contractLoader = new ContractLoader(this.web3, EightPay.Network.PRIVATE);
    this.onDemand = new OnDemand(this.web3, this.contractLoader);
  });

  context('bill', function () {
    it('should bill subscriptions', function () {
      const contract = this.contractLoader.load('OnDemandSubscriptionsManagement');
      const method = contract.methods.bill(planId, subscriptionIds, amounts);
      const transaction = this.onDemand.bill(planId, subscriptionIds, amounts);

      expect(transaction).to.be.instanceOf(Transaction);
      expect(transaction.to).to.be.equal(contract.options.address);
      expect(transaction.data).to.be.equal(method.encodeABI());
    });

    it('should throw an error if planId in invalid', function () {
      const invalidPlanId = 'my-plan-id';
      const error = new InvalidPlanIdError(invalidPlanId);
      const fn = () => this.onDemand.bill(invalidPlanId, subscriptionIds, amounts);

      expect(fn).to.throw(error.message).and.be.instanceOf(InvalidPlanIdError);
    });

    it('should throw an error if subscriptionIds in not an array', function () {
      const error = new NotAnArrayError('subscriptionIds');
      const fn = () => this.onDemand.bill(planId, {}, amounts);

      expect(fn).to.throw(error.message).and.be.instanceOf(NotAnArrayError);
    });

    it('should throw an error if amounts in not an array', function () {
      const error = new NotAnArrayError('amounts');
      const fn = () => this.onDemand.bill(planId, subscriptionIds, {});

      expect(fn).to.throw(error.message).and.be.instanceOf(NotAnArrayError);
    });

    it('should throw an error if subscriptionIds and amounts length are different', function () {
      const error = new LengthMismatchError('subscriptionIds', 'amounts');
      const fn = () => this.onDemand.bill(planId, subscriptionIds, []);

      expect(fn).to.throw(error.message).and.be.instanceOf(LengthMismatchError);
    });

    it('should throw an error if a subscriptionId in invalid', function () {
      const invalidSubscriptionId = 'invalid-subscription-id';
      const error = new InvalidSubscriptionIdError(invalidSubscriptionId);
      const fn = () => this.onDemand.bill(planId, [invalidSubscriptionId], amounts);

      expect(fn).to.throw(error.message).and.be.instanceOf(InvalidSubscriptionIdError);
    });

    it('should throw an error if an amount in invalid', function () {
      const invalidAmount = 'amount';
      const error = new InvalidAmountError(invalidAmount);
      const fn = () => this.onDemand.bill(planId, subscriptionIds, [invalidAmount]);

      expect(fn).to.throw(error.message).and.be.instanceOf(InvalidAmountError);
    });
  });

  context('terminate', function () {
    it('should terminate subscriptions', function () {
      const contract = this.contractLoader.load('OnDemandSubscriptionsManagement');
      const method = contract.methods.terminate(planId, subscriptionIds);
      const transaction = this.onDemand.terminate(planId, subscriptionIds);

      expect(transaction).to.be.instanceOf(Transaction);
      expect(transaction.to).to.be.equal(contract.options.address);
      expect(transaction.data).to.be.equal(method.encodeABI());
    });

    it('should throw an error if planId in invalid', function () {
      const invalidPlanId = 'my-plan-id';
      const error = new InvalidPlanIdError(invalidPlanId);
      const fn = () => this.onDemand.terminate(invalidPlanId, subscriptionIds);

      expect(fn).to.throw(error.message).and.be.instanceOf(InvalidPlanIdError);
    });

    it('should throw an error if subscriptionIds in not an array', function () {
      const error = new NotAnArrayError('subscriptionIds');
      const fn = () => this.onDemand.terminate(planId, {});

      expect(fn).to.throw(error.message).and.be.instanceOf(NotAnArrayError);
    });

    it('should throw an error if a subscriptionId in invalid', function () {
      const invalidSubscriptionId = 'invalid-subscription-id';
      const error = new InvalidSubscriptionIdError(invalidSubscriptionId);
      const fn = () => this.onDemand.terminate(planId, [invalidSubscriptionId]);

      expect(fn).to.throw(error.message).and.be.instanceOf(InvalidSubscriptionIdError);
    });
  });
});
