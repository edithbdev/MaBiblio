import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from '../constants';

// Action pour ajouter un livre
// data : title or author
export const addBook = (data) => {
  return {
    type: ADD_BOOKS,
    payload: data /* Object */,
  };
};

// Action pour supprimer un livre
export const deleteBook = (id) => {
  return {
    type: DELETE_BOOK,
    payload: id,
  };
};

// Action pour supprimer tous les livres
export const deleteAllBooks = () => {
  return {
    type: DELETE_ALL_BOOKS,
  };
};
