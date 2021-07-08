# @8pay/sdk

The SDK provides a way to programmatically interact with 8Pay's smart contracts along with some helper functions to simplify the integration process.

## Requirements

* web3 (1.0.0 or higher)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install @8pay/sdk
```

## Usage

This module uses [web3](https://www.npmjs.com/package/web3) under the hood, which is one of the most popular libraries used to interact with the `Web 3.0`.

To keep things familiar with `web3`, it follows the same structure when sending transactions and also adds additional functionalities.

To get started, create an instance of the 8pay's SDK and choose the **network** on which you want to operate:

```js
const Web3 = require('web3');
const EightPay = require('@8pay/sdk');

const web3 = new Web3('<provider-url>');
const eightPay = new EightPay(web3, EightPay.Network.BSC);
```

### Sending transactions

There are two ways to **sign a transaction** before broadcasting it to the blockchain:

* With an unlocked account (e.g. when using Metamask)

```js
eightPay.fixedRecurring.bill(planId, subscriptionIds)
    .send({ from: account })
```

* With private key

```js
eightPay.fixedRecurring.bill(planId, subscriptionIds)
    .send({ privateKey: '0x32df7......' })
```

### Estimate gas

The gas consumed by a transaction can be estimated using the `estimateGas` function which takes an `options` object and returns the amount of gas required:

```js
eightPay.fixedRecurring.bill(planId, subscriptionIds)
    .estimateGas(options)
```

### Options

The `send` and `estimateGas` methods accept the same `options` object available in `web3` which allows setting parameters like `gas`, `gasPrice`, `nonce` and so on.

### Events

The following events are emitted when sending a transaction: `sending`, `sent`, `transactionHash`, `receipt`, `confirmation` and `error`.

```js
const receipt = await eightPay.fixedRecurring.bill(planId, subscriptionIds)
    .send({ from: account })
    .once('sending', payload => {})
    .once('sent', payload => {})
    .once('transactionHash', hash => {})
    .once('receipt', receipt => {})
    .on('confirmation', confirmation => {})
    .on('error', error => {})
```

## Fixed Recurring

### Bill

Bills subscriptions of a plan.

Parameters:
* **planId** - id of the plan
* **subscriptionIds** - array of subscription ids

```js
const planId = '0x57b2059e526841b3dfd964144513359c9fcfd6d91040b6c47f589c1e032b6bf4';
const subscriptionIds = ['0xe63ba761797e289076f80a7c0916a31740684806aaf507da85f81ee785fec6ba'];

const receipt = await eightPay.fixedRecurring.bill(planId, subscriptionIds)
    .send({ from: account })
```

### Terminate

Forcefully cancels subscriptions of a plan.

**Note**: The sender account must be the plan's admin or an operational account with terminate permission.

Parameters:
* **planId** - id of the plan
* **subscriptionIds** - array of subscription ids

```js
const planId = '0x57b2059e526841b3dfd964144513359c9fcfd6d91040b6c47f589c1e032b6bf4';
const subscriptionIds = ['0xe63ba761797e289076f80a7c0916a31740684806aaf507da85f81ee785fec6ba'];

const receipt = await eightPay.fixedRecurring.terminate(planId, subscriptionIds)
    .send({ from: account })
```

## Variable Recurring

### Bill

Bills subscriptions of a plan.

**Note**: The sender account must be the plan's admin or an operational account with bill permission.

Parameters:
* **planId** - id of the plan
* **subscriptionIds** - array of subscription ids
* **amounts** - array of amounts to charge for each subscription

```js
const planId = '0x57b2059e526841b3dfd964144513359c9fcfd6d91040b6c47f589c1e032b6bf4';
const subscriptionIds = ['0xe63ba761797e289076f80a7c0916a31740684806aaf507da85f81ee785fec6ba'];
const amounts = [eightPay.utils.parseAmount('10', '8PAY')];

const receipt = await eightPay.variableRecurring.bill(planId, subscriptionIds, amounts)
    .send({ from: account })
```

### Terminate

Forcefully cancels subscriptions of a plan.

**Note**: The sender account must be the plan's admin or an operational account with terminate permission.

Parameters:
* **planId** - id of the plan
* **subscriptionIds** - array of subscription on-chain ids

```js
const planId = '0x57b2059e526841b3dfd964144513359c9fcfd6d91040b6c47f589c1e032b6bf4';
const subscriptionIds = ['0xe63ba761797e289076f80a7c0916a31740684806aaf507da85f81ee785fec6ba'];

const receipt = await eightPay.variableRecurring.terminate(planId, subscriptionIds)
    .send({ from: account })
```

## On Demand

### Bill

Bills subscriptions of a plan.

**Note**: The sender account must be the plan's admin or an operational account with bill permission.

Parameters:
* **planId** - id of the plan
* **subscriptionIds** - array of subscription ids
* **amounts** - array of amounts to charge for each subscription

```js
const planId = '0x57b2059e526841b3dfd964144513359c9fcfd6d91040b6c47f589c1e032b6bf4';
const subscriptionIds = ['0xe63ba761797e289076f80a7c0916a31740684806aaf507da85f81ee785fec6ba'];
const amounts = [eightPay.utils.parseAmount('10', '8PAY')];

const receipt = await eightPay.onDemand.bill(planId, subscriptionIds, amounts)
    .send({ from: account })
```

### Terminate

Forcefully cancels subscriptions of a plan.

**Note**: The sender account must be the plan's admin or an operational account with terminate permission.

Parameters:
* **planId** - id of the plan
* **subscriptionIds** - array of subscription ids

```js
const planId = '0x57b2059e526841b3dfd964144513359c9fcfd6d91040b6c47f589c1e032b6bf4';
const subscriptionIds = ['0xe63ba761797e289076f80a7c0916a31740684806aaf507da85f81ee785fec6ba'];

const receipt = await eightPay.onDemand.terminate(planId, subscriptionIds)
    .send({ from: account })
```

## Accounts

The accounts utility can be used to obtain an `account` object from a private key or a mnemonic. The `account` object has two properties: `address` and `privateKey`.

```js
const privateKey = '<private-key>';
const account = eightPay.accounts.fromPrivateKey(privateKey);

// OR

const mnemonic = '<mnemonic>';
const mnemonicIndex = 0;
const account = eightPay.accounts.fromMnemonic(mnemonic, mnemonicIndex);

console.log(account);

/*
{
    address: '0x2F2....',
    privateKey: '0x1Ee...'
}
*/
```

## Utils

To help in parsing amount from and to ethereum decimals, you can use the `parseAmount` and `formatAmount` functions.

```js
const parsedAmount = eightPay.utils.parseAmount('1', '8PAY') // 1000000000000000000
const amount = eightPay.utils.formatAmount(parsedAmount, '8PAY') // 1
```
