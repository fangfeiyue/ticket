import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
export default createStore(
  combineReducers(reducers),
  {}, // 默认state
  applyMiddleware(thunk)
);
