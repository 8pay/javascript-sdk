'use strict';
const ethers = require('ethers');

exports.fromPrivateKey = function (privateKey) {
  const wallet = new ethers.Wallet(privateKey);

  return { address: wallet.address, privateKey: wallet.privateKey };
};

exports.fromMnemonic = function (mnemonic, index = 0) {
  const path = 'm/44\'/60\'/0\'/0/' + index;
  const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);

  return { address: wallet.address, privateKey: wallet.privateKey };
};
