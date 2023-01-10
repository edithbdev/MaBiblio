import {
  FETCH_BOOKS_LOADING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
} from '../constants';
import axios from 'axios';

const fetchBooksLoading = () => {
  return {
    type: FETCH_BOOKS_LOADING,
  };
};

const fetchBooksSuccess = (data) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: data,
  };
};

const fetchBooksError = (error) => {
  return {
    type: FETCH_BOOKS_ERROR,
    payload: error,
  };
};

export const fetchBooks = (keyword) => {
  return (dispatch) => {
    // https://developers.google.com/books/docs/v1/using
    dispatch(fetchBooksLoading());
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40`
      )
      .then((response) => {
        const bookItemsArray = response.data.items;
        dispatch(fetchBooksSuccess(bookItemsArray));
        // console.log(response);
      })
      .catch((error) => {
        dispatch(fetchBooksError(error.message));
        // console.log(error);
      });
  };
};
