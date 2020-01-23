'use strict';

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class InvalidPlanIdError extends CustomError {
  constructor(planId) {
    super(planId + ' is not a valid plan id');
  }
}

class InvalidSubscriptionIdError extends CustomError {
  constructor(subscriptionId) {
    super(subscriptionId + ' is not a valid subscription id');
  }
}

class InvalidAmountError extends CustomError {
  constructor(amount) {
    super(amount + ' is not a valid amount');
  }
}

class NotAnArrayError extends CustomError {
  constructor(name) {
    super(name + ' is not an array');
  }
}

class LengthMismatchError extends CustomError {
  constructor(param1, param2) {
    super(param1 + ' and ' + param2 + ' lengths must be equal');
  }
}

module.exports = {
  InvalidPlanIdError,
  InvalidSubscriptionIdError,
  InvalidAmountError,
  NotAnArrayError,
  LengthMismatchError
};
