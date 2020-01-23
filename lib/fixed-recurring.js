'use strict';
const validator = require('./helpers/validator');
const Transaction = require('./core/transaction');
const { InvalidPlanIdError, InvalidSubscriptionIdError, NotAnArrayError } = require('./errors');

class FixedRecurring {
  constructor(web3, contracts) {
    this._web3 = web3;
    this._subscriptionsManagement = contracts.load('FixedRecurringSubscriptionsManagement');
  }

  bill(planId, subscriptionIds) {
    if (!validator.isHash(planId)) {
      throw new InvalidPlanIdError(planId);
    }
    if (!Array.isArray(subscriptionIds)) {
      throw new NotAnArrayError('subscriptionIds');
    }
    for (let i = 0; i < subscriptionIds.length; i++) {
      if (!validator.isHash(subscriptionIds[i])) {
        throw new InvalidSubscriptionIdError(subscriptionIds[i]);
      }
    }

    const to = this._subscriptionsManagement.options.address;
    const method = this._subscriptionsManagement.methods.bill(planId, subscriptionIds);

    return new Transaction(this._web3, to, method.encodeABI());
  }

  terminate(planId, subscriptionIds) {
    if (!validator.isHash(planId)) {
      throw new InvalidPlanIdError(planId);
    }
    if (!Array.isArray(subscriptionIds)) {
      throw new NotAnArrayError('subscriptionIds');
    }
    for (let i = 0; i < subscriptionIds.length; i++) {
      if (!validator.isHash(subscriptionIds[i])) {
        throw new InvalidSubscriptionIdError(subscriptionIds[i]);
      }
    }

    const to = this._subscriptionsManagement.options.address;
    const method = this._subscriptionsManagement.methods.terminate(planId, subscriptionIds);

    return new Transaction(this._web3, to, method.encodeABI());
  }
}

module.exports = FixedRecurring;
