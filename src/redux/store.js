import { configureStore, combineReducers } from '@reduxjs/toolkit'
import reducerBooks from './reducers/reducerBooks'
import reducerFetchBooks from './reducers/reducerFetchBooks'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  library: reducerBooks,
  search: reducerFetchBooks,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
