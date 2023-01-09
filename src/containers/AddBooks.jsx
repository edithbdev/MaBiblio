import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addBook,
  deleteBook,
  deleteAllBooks,
} from '../redux/actions/actionBooks';
import FlipMove from 'react-flip-move';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';

const AddBooks = ({ libraryData, addBook, deleteBook, deleteAllBooks }) => {

  const initialState = {
    title: '',
    author: '',
  };

  const [newData, setNewData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(newData);

    setNewData(initialState);
  };

  const displayData =
    libraryData.length > 0 ? (
      <FlipMove>
        {libraryData.map((data) => {
          return (
            <Card className="me-auto" key={data.id}>
              <Card.Body className="d-flex flex-wrap justify-content-between">
                <Card.Text style={{ width: "50%" }} className=""><strong>Titre : </strong> {data.title}</Card.Text>
                <Card.Text style={{ width: "40%" }} className=""> <strong>Auteur : </strong> {data.author[0]}</Card.Text>
                <Button
                  variant="danger"
                  className="align-self-center"
                  onClick={() => deleteBook(data.id)}>
                  x
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </FlipMove>
    ) : (
      <Col className="text-center">No data to display</Col>
    );

  const deleteAllBooksBtn = libraryData.length > 0 && (
    <Col className="d-flex justify-content-center">
      <Button
        variant='danger'
        className="mt-4 mb-5"
        onClick={() => deleteAllBooks()}
      >
        Delete all books
      </Button>
    </Col>
  );

  return (
    <Container fluid>
      <Row>
        <Col className="text-center mt-5">
          <h1 className="display-4">BOOKS</h1>
          Add a book to your library
        </Col>
      </Row>
      <Form className="d-flex justify-content-center mt-5" onSubmit={handleSubmit}>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Control
                value={newData.title}
                type="text"
                placeholder="Title"
                required
                onChange={(e) =>
                  setNewData({ ...newData, title: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicAuthor">
              <Form.Control
                value={newData.author}
                type="text"
                placeholder="Author"
                required
                onChange={(e) =>
                  setNewData({ ...newData, author: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicButton">

              <Button variant="outline-secondary" type="submit">
                Add a book
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className="">
        <Col className="text-center">
          <h2>My library</h2>
        </Col>
      </Row>
      <Row className="mt-5">{displayData}</Row>
      {deleteAllBooksBtn}
    </Container>
  );
};

// access redux state (store)
const addStateToProps = (state) => {
  return {
    libraryData: state.library,
  };
};

// access the dispatch and retrieve the addBook props
const addDispatchToProps = (dispatch) => {
  return {
    addBook: (param) => dispatch(addBook(param)),
    deleteBook: (id) => dispatch(deleteBook(id)),
    deleteAllBooks: () => dispatch(deleteAllBooks()),
  };
};

export default connect(addStateToProps, addDispatchToProps)(AddBooks);
