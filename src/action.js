function createSet(payload) {
  return {
    type: 'set',
    payload
  };
}

function createAdd(payload) {
  return {
    type: 'add',
    payload
  };
}

function createRemove(payload) {
  return {
    type: 'remove',
    payload
  };
}

function createToggle(payload) {
  return {
    type: 'toggle',
    payload
  };
}

export {
  createSet,
  createAdd,
  createRemove,
  createToggle
};
