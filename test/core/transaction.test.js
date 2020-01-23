'use strict';
const { expect } = require('chai');
const Web3 = require('web3');
const Transaction = require('../../lib/core/transaction');
const Token = require('../artifacts/erc20.json');

describe('Transaction', () => {
  const privateKey = '0x1aba488300a9d7297a315d127837be4219107c62c61966ecdf7a75431d75cc61';
  const address = '0x2B522cABE9950D1153c26C1b399B293CaA99FcF9';

  before(async function () {
    this.web3 = new Web3('http://localhost:8545');

    const accounts = await this.web3.eth.getAccounts();

    this.accounts = {
      bob: accounts[0],
      alice: accounts[1],
      private: address
    };
  });

  before(async function () {
    const instance = new this.web3.eth.Contract(Token.abi);
    const options = { from: this.accounts.bob, gas: 6700000 };

    this.token = await instance.deploy({ data: Token.bytecode }).send(options);
  });

  before(async function () {
    await this.web3.eth.sendTransaction({
      from: this.accounts.bob,
      to: this.accounts.private,
      value: this.web3.utils.toWei('0.05', 'ether')
    });
  });

  it('should send with unlocked account', async function () {
    const method = this.token.methods.transfer(this.accounts.private, this.web3.utils.toWei('0.1', 'ether'));
    const transaction = new Transaction(this.web3, this.token.options.address, method.encodeABI());
    const receipt = await transaction.send({ from: this.accounts.bob });

    expect(receipt.status).to.be.true;
  });

  it('should send with private key', async function () {
    const method = this.token.methods.transfer(this.accounts.private, this.web3.utils.toWei('0.1', 'ether'));
    const transaction = new Transaction(this.web3, this.token.options.address, method.encodeABI());
    const receipt = await transaction.send({ privateKey });

    expect(receipt.from).be.equal(address.toLowerCase());
    expect(receipt.status).be.true;
  });

  it('should check promievent events', async function () {
    const method = this.token.methods.transfer(this.accounts.private, this.web3.utils.toWei('0.1', 'ether'));
    const transaction = new Transaction(this.web3, this.token.options.address, method.encodeABI());
    const promiEvent = transaction.send({ from: this.accounts.bob });

    const events = ['sending', 'sent', 'transactionHash', 'receipt', 'confirmation'];
    const eventsPromises = events.map(e => new Promise(resolve => promiEvent.on(e, resolve)));

    const receipt = await promiEvent;

    await Promise.all(eventsPromises);

    expect(receipt.status).to.be.true;
  });

  it('throws error when calling send without options', async function () {
    const method = this.token.methods.transfer(this.accounts.private, this.web3.utils.toWei('0.1', 'ether'));
    const transaction = new Transaction(this.web3, this.token.options.address, method.encodeABI());
    const fn = () => transaction.send();

    expect(fn).to.throw(Error, 'No options provided');
  });

  it('should estimate gas with unlocked account', async function () {
    const method = this.token.methods.transfer(this.accounts.private, this.web3.utils.toWei('0.1', 'ether'));
    const transaction = new Transaction(this.web3, this.token.options.address, method.encodeABI());
    const gas = await transaction.estimateGas({ from: this.accounts.bob });

    expect(gas).to.be.a('number');
  });

  it('should estimate gas with private key', async function () {
    const method = this.token.methods.transfer(this.accounts.private, this.web3.utils.toWei('0.1', 'ether'));
    const transaction = new Transaction(this.web3, this.token.options.address, method.encodeABI());
    const gas = await transaction.estimateGas({ privateKey });

    expect(gas).to.be.a('number');
  });
});
