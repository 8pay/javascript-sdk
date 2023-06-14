'use strict';
const Accounts = require('../accounts');
const promiEventWrapper = require('../helpers/promi-event-wrapper');

class Transaction {
  constructor(web3, to, data) {
    this._web3 = web3;
    this.to = to;
    this.data = data;
  }

  send(options) {
    if (!options) {
      throw Error('No options provided');
    }

    const promise = options.privateKey ? this._signAndSend(options) : this._send(options);
    const events = ['sending', 'sent', 'transactionHash', 'receipt', 'confirmation', 'error'];

    return promiEventWrapper(promise, events);
  }

  estimateGas(options) {
    const { privateKey, ...opt } = options;

    const rawTx = { to: this.to, data: this.data, ...opt };

    if (options.privateKey) {
      rawTx.from = Accounts.fromPrivateKey(privateKey).address;
    }

    return this._web3.eth.estimateGas(rawTx);
  }

  async _send(options) {
    const rawTx = { to: this.to, data: this.data, ...options };
    const gasEstimate = await this._web3.eth.estimateGas(rawTx);
    const rawTxWithGas = { ...rawTx, gas: Math.floor(gasEstimate * 1.2) };

    return { promiEvent: this._web3.eth.sendTransaction(rawTxWithGas) };
  }

  async _signAndSend(options) {
    const { privateKey, ...opt } = options;

    const account = Accounts.fromPrivateKey(privateKey);
    const rawTx = { from: account.address, to: this.to, data: this.data, ...opt };
    const gasEstimate = await this._web3.eth.estimateGas(rawTx);
    const rawTxWithGas = { ...rawTx, gas: Math.floor(gasEstimate * 1.2) };
    const signedTx = await this._web3.eth.accounts.signTransaction(rawTxWithGas, account.privateKey);

    return { promiEvent: this._web3.eth.sendSignedTransaction(signedTx.rawTransaction) };
  }
}

module.exports = Transaction;
