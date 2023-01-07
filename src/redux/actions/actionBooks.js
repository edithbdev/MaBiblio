import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from '../constants';

// Action pour l'ajout de livres
// data : title ou author
export const addBook = (data) => {
  return {
    type: ADD_BOOKS,
    payload: data /* Objet */,
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
