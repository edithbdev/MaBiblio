import {
  FETCH_BOOKS_LOADING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
} from '../constants';

const initialState = {
  isLoading: false,
  fetchBooks: [],
  error: '',
};

const reducerFetchBooks = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetchBooks: action.payload,
        error: '',
      };
    case FETCH_BOOKS_ERROR:
      return {
        ...state,
        isLoading: false,
        fetchBooks: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducerFetchBooks;
