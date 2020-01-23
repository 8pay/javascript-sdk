'use strict';
const Deployments = require('@8pay/deployments');

class ContractLoader {
  constructor(web3, network) {
    this._web3 = web3;
    this._deployments = new Deployments(network);
  }

  load(contract) {
    const data = this._deployments.get(contract);

    return new this._web3.eth.Contract(data.abi, data.address);
  }
}

module.exports = ContractLoader;
