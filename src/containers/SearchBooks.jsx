import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/actions/actionFetchBooks';
import { addBook } from '../redux/actions/actionBooks';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// toast.configure();
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBooks = () => {
  const [title, setTitle] = useState('');
  // console.log(title);

  const state = useSelector((state) => state.search);
  const dispatch = useDispatch();
  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchBooks(title));
    // console.log(title);
  };

  const handleSaveBook = (title, author) => {
    // const bookToSave = {
    //   title: title,
    //   author: author,
    // };

    const bookToSave = {
      title,
      author,
    };
    dispatch(addBook(bookToSave));
    toast.success('Livre enregistré !');
  };

  const displayFetchBooks = state.isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : state.error !== '' ? (
    <p>{state.error}</p>
  ) : (
    state.fetchBooks.map((data) => {
      return (
        <div key={data.id} className="card mb-2">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target={`#${data.id}`}
                aria-expanded="false"
              >
                {data.volumeInfo.title}
              </button>
            </h5>
          </div>
          <div id={data.id} className="collapse" data-parent="#accordion">
            <div className="card-body">
              {data.volumeInfo.hasOwnProperty('imageLinks') && (
                <img
                  src={data.volumeInfo.imageLinks.thumbnail}
                  alt={data.volumeInfo.title}
                />
              )}
              <br />
              <h4 className="card-title">Titre : {data.volumeInfo.title}</h4>
              <h5 className="card-title">
                Auteurs : {data.volumeInfo.authors}
              </h5>
              <p className="card-text">
                Description: {data.volumeInfo.description}
              </p>
              <a
                className="btn btn-outline-secondary"
                target="_blank"
                rel="noopener noreferrer"
                href={data.volumeInfo.previewLink}
              >
                Plus d'infos
              </a>
              <button
                className="btn btn-outline-secondary ml-3"
                onClick={() =>
                  handleSaveBook(data.volumeInfo.title, data.volumeInfo.authors)
                }
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      );
    })
  );

  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">BOOKS</h1>
          <p>Indiquer le sujuet du livre à rechercher sur Google API</p>
          <form
            className="form-inline d-flex justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                value={title}
                type="text"
                className="form-control"
                placeholder="Quoi rechercher ?"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-secondary ml-4">
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container" style={{ minHeight: '200px' }}>
        <div id="accordion">{displayFetchBooks}</div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};

export default SearchBooks;
