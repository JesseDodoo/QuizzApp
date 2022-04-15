import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Reducer } from './reducers';

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;