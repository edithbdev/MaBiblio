import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addBook,
  deleteBook,
  deleteAllBooks,
} from '../redux/actions/actionBooks';
import FlipMove from 'react-flip-move';

// props destructuring
const AddBooks = ({ libraryData, addBook, deleteBook, deleteAllBooks }) => {
  console.log(libraryData);

  // valeur initiale
  const initialState = {
    title: '',
    author: '',
  };

  // variable d'état
  const [newData, setNewData] = useState(initialState);

  // on valide le formulaire et on passe la methode dans onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // on invoque addBook et on lui passe comme param newData
    addBook(newData);

    //vider le input
    setNewData(initialState);
    // console.log(newData);
  };

  const displayData =
    libraryData.length > 0 ? (
      <FlipMove>
        {libraryData.map((data) => {
          return (
            <li
              key={data.id}
              className="list-group-item list-group-item-light d-flex justify-content-between"
            >
              <span>
                <strong>Titre:</strong>
                {data.title}
              </span>
              <span>
                <strong>Auteur:</strong>
                {data.author}
              </span>
              <span
                className="btn btn-danger"
                onClick={() => deleteBook(data.id)}
              >
                x
              </span>
            </li>
          );
        })}
      </FlipMove>
    ) : (
      <p className="text-center">Aucune data à afficher</p>
    );

  const deleteAllBooksBtn = libraryData.length > 0 && (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-danger mt-4 mb-5"
        onClick={() => deleteAllBooks()}
      >
        Effacer tous les livres
      </button>
    </div>
  );

  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">BOOKS</h1>
          <p>Ajouter un livre à votre bibliothèque</p>
          <form
            className="form-inline d-flex justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                value={newData.title}
                type="text"
                className="form-control"
                placeholder="Titre"
                required
                onChange={(e) =>
                  /* je récupère toutes les valeurs de newData (...newData)
                  et je modifie le title */
                  setNewData({ ...newData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                value={newData.author}
                type="text"
                className="form-control ml-3"
                placeholder="Auteur"
                required
                onChange={(e) =>
                  setNewData({ ...newData, author: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-secondary ml-4">
                Ajouter un livre
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container" style={{ minHeight: '200px' }}>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">{displayData}</ul>
            {deleteAllBooksBtn}
          </div>
        </div>
      </div>
    </main>
  );
};

// accèder au state de redux (store)
const addStateToProps = (state) => {
  return {
    // libraryData est ma props que je passe dans AddBooks
    libraryData: state.library,
  };
};

// accèder au dispatch et récupérer la props addBook
const addDispatchToProps = (dispatch) => {
  return {
    // le param correspond à data (newData)
    addBook: (param) => dispatch(addBook(param)),
    deleteBook: (id) => dispatch(deleteBook(id)),
    deleteAllBooks: () => dispatch(deleteAllBooks()),
  };
};

export default connect(addStateToProps, addDispatchToProps)(AddBooks);
