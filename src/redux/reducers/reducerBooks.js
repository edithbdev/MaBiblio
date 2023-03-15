import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  // Je stocke mes données dans un tableau
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
  // Je vérifie si j'ai des données dans localStorage
  if (localStorage.getItem('booksData')) {
    // j'initialise mon state avec les données de localStorage
    state = JSON.parse(localStorage.getItem('booksData'));
  }
  switch (action.type) {
    case ADD_BOOKS:
      // nouveau state
      state = [...state, helperAddData(action)];
      // sauvegarder le state dans localStorage
      // et le convertir en string
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
