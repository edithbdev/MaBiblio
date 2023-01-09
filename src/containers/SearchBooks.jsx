import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/actions/actionFetchBooks';
import { addBook } from '../redux/actions/actionBooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Spinner, Card, Accordion, Button } from 'react-bootstrap';

const SearchBooks = () => {
  const [title, setTitle] = useState('');

  const state = useSelector((state) => state.search);
  console.log(state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchBooks(title));
  };

  const handleSaveBook = (title, author, image) => {
    // const bookToSave = {
    //   title: title,
    //   author: author,
    // };

    const bookToSave = {
      title,
      author,
      image,
    };
    dispatch(addBook(bookToSave));
    toast.success('Registered book !');
  };

  const displayFetchBooks = state.isLoading ? (
    <Col className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Col>
  ) : state.error !== '' ? (
    <Col className="d-flex justify-content-center text-danger">{state.error}</Col>
  ) : (
    state.fetchBooks.map((data) => {
      return (
        <Card key={data.id}>
          <Accordion flush>
            <Accordion.Item eventKey={data.id}>
              <Accordion.Header>{data.volumeInfo.title}</Accordion.Header>
              <Accordion.Body>
                {data.volumeInfo.hasOwnProperty('imageLinks') && (
                  <Card.Img style={{ width: 'auto' }} variant="top" src={data.volumeInfo.imageLinks.thumbnail} alt={data.volumeInfo.title} />
                )}
                <br />
                <Card.Title>Title : {data.volumeInfo.title}</Card.Title>
                <Card.Title>Authors : {data.volumeInfo.authors}</Card.Title>
                <Card.Text>
                  Description: {data.volumeInfo.description}
                </Card.Text>
                <Card.Link 
                className="btn btn-outline-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.volumeInfo.previewLink}
                >
                  More informations
                </Card.Link>
                <Button className="ml-3" variant="info" onClick={() => handleSaveBook(data.volumeInfo.title, data.volumeInfo.authors, data.volumeInfo.previewLink)}>
                  Save
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      );
    })
  );

  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">BOOKS</h1>
          <p>
            Indicate the subject of the book to search on Google API</p>
          <form
            className="form-inline d-flex justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                value={title}
                type="text"
                className="form-control"
                placeholder="what to look for ?"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-secondary ml-4">
                Search
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
