import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducerBooks from './reducers/reducerBooks';
import reducerFetchBooks from './reducers/reducerFetchBooks';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  library: reducerBooks,
  search: reducerFetchBooks,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
