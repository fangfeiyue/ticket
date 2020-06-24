const reducers = {
  todos(state, action) {
    const { type, payload } = action;
    switch(type) {
      case 'set':
        return payload;
      case 'add':
        return [...todos, payload];
      case 'remove':
        return todos.filter(todo=>todo.id !== payload)
      case 'toggle':
        return todos.map(todo => todo.id === payload ? { ...todo, complete: !todo.complete } : todo)
      default:
        return state;
    }
  },
  count(state, action) {
    const { type, payload } = action;
    switch (type) {
      case 'set':
      case 'add':
        return payload + 1;
      default:
        return state;
    }
  }
};

function combineReducers(reducers) {
  return function reducer(state, action) {
    const changed = {};
    for (let key in reducers) {
      changed[key] = reducers[key](state[key], action);
    }

    return {
      ...state,
      ...changed
    };
  };
}

export default combineReducers(reducers);
