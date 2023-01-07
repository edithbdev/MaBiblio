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

const GOOGLE_API_KEY = 'AIzaSyAWlwG-9AUfPEM5bS8PAmJJPcNp3r70BNE';

export const fetchBooks = (title) => {
  return (dispatch) => {
    dispatch(fetchBooksLoading());
    // https://console.cloud.google.com/projectselector2/apis/dashboard?supportedpurview=project
    // https://developers.google.com/books/docs/v1/using
    axios
      .get(
        // `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${GOOGLE_API_KEY}&maxResults=20`
        `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=20`
      )
      .then((response) => {
        const bookItemsArray = response.data.items;
        dispatch(fetchBooksSuccess(bookItemsArray));
        console.log(response);
      })
      .catch((error) => {
        dispatch(fetchBooksError(error.message));
        console.log(error);
      });
  };
};
