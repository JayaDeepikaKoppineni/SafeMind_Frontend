// store.js
import { createStore } from 'redux';

// Define initial state
const initialState = {
  value: 'initial value'
};

// Create a reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

export default store;
