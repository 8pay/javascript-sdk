'use strict';

const PromiEvent = require('web3-core-promievent');

module.exports = (promiEventPromise, events) => {
  const outPromiEvent = new PromiEvent();

  promiEventPromise
    .then(obj => {
      obj.promiEvent.then(outPromiEvent.resolve).catch(outPromiEvent.reject);
      events.forEach(event => obj.promiEvent.on(event, value => outPromiEvent.eventEmitter.emit(event, value)));
    })
    .catch(outPromiEvent.reject);

  return outPromiEvent.eventEmitter;
};
