import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  // I store in the array the recorded books
  books: [],
};

const helperAddData = (action) => {
  return {
    id: uuidv4(),
    title: action.payload.title,
    author: action.payload.author,
    image: action.payload.image,
  };
};

const removeDatabyId = (state, id) => {
  const books = state.filter((book) => book.id !== id);
  return books;
};

//reducer
const reducerBooks = (state = initialState.books, action) => {
  // I check what we have at the localStorage level
  if (localStorage.getItem('booksData')) {
    // I rewrite the state in JSON format
    state = JSON.parse(localStorage.getItem('booksData'));
  }
  switch (action.type) {
    case ADD_BOOKS:
      // new state
      state = [...state, helperAddData(action)];
      // saved a copy in localStorage
      // and convert it to a string
      localStorage.setItem('booksData', JSON.stringify(state));
      return state;

    case DELETE_BOOK:
      state = removeDatabyId(state, action.payload);
      localStorage.setItem('booksData', JSON.stringify(state));
      return state;

    case DELETE_ALL_BOOKS:
      state = [];
      localStorage.setItem('booksData', JSON.stringify(state));
      return state;

    default:
      return state;
  }
};

export default reducerBooks;
