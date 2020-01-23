'use strict';
const { expect } = require('chai');
const Accounts = require('../lib/accounts');

describe('Accounts', () => {
  const mnemonic = 'gesture rather obey video awake genuine patient base soon parrot upset lounge';
  const privateKey = '0x1aba488300a9d7297a315d127837be4219107c62c61966ecdf7a75431d75cc61';
  const address = '0x2B522cABE9950D1153c26C1b399B293CaA99FcF9';

  it('should get an account from private key', function () {
    const account = Accounts.fromPrivateKey(privateKey);

    expect(account.privateKey).to.be.equal(privateKey);
    expect(account.address).to.be.equal(address);
  });

  it('should get an account from mnemonic', function () {
    const account = Accounts.fromMnemonic(mnemonic);

    expect(account.privateKey).to.be.equal(privateKey);
    expect(account.address).to.be.equal(address);
  });
});
