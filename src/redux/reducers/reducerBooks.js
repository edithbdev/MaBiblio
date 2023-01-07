import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  // nous allons stocker dans le array les livres enregistrés
  books: [],
};

const helperAddData = (action) => {
  return {
    id: uuidv4(),
    title: action.payload.title,
    author: action.payload.author,
  };
};

const removeDatabyId = (state, id) => {
  const books = state.filter((book) => book.id !== id);
  return books;
};

//reducer
const reducerBooks = (state = initialState.books, action) => {
  // On vérifie ce que l'on a au niveau du localStorage
  if (localStorage.getItem('booksData')) {
    // on réecrit le state en JSON
    state = JSON.parse(localStorage.getItem('booksData'));
  }
  switch (action.type) {
    case ADD_BOOKS:
      // nouveau state
      state = [...state, helperAddData(action)];
      // enregistré un copie en localStorage
      // et on le convertit en chaine de caractère
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
