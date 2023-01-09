import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from '../constants';

// Action for adding books
// data : title or author
export const addBook = (data) => {
  return {
    type: ADD_BOOKS,
    payload: data /* Object */,
  };
};

// Action to delete a book
export const deleteBook = (id) => {
  return {
    type: DELETE_BOOK,
    payload: id,
  };
};

// Action to delete all books
export const deleteAllBooks = () => {
  return {
    type: DELETE_ALL_BOOKS,
  };
};
