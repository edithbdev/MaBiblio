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
        <Card style={{ width: "80%", margin: "auto" }} key={data.id}>
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
                  className="btn btn-outline-secondary mx-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.volumeInfo.previewLink}
                >
                  More informations
                </Card.Link>
                <Button
                  variant="secondary"
                  type='submit'
                  onClick={() => handleSaveBook(data.volumeInfo.title, data.volumeInfo.authors, data.volumeInfo.previewLink)}>
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
    <Container fluid>
      <Row>
        <Col className="text-center mt-5">
          <h1 className="display-4">SEARCH FOR A BOOK</h1>
          <p>
            Indicate the subject of the book to search on Google API</p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Form
            className="d-flex justify-content-center mt-5"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
              <Form.Control
                value={title}
                type="text"
                placeholder="what to look for ?"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicButton">
              <Button variant="outline-secondary" type="submit">
                Search
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col className="mt-5 mb-5">
          <Accordion>{displayFetchBooks}</Accordion>
        </Col>
      </Row>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default SearchBooks;
