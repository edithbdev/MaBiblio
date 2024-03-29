import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addBook,
  deleteBook,
  deleteAllBooks,
} from '../redux/actions/actionBooks';
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
      <>
        {libraryData
          .sort((a, b) => {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
          })
          .map((data) => {
            return (
              <Card style={{ width: "80%", margin: "auto" }} key={data.id}>
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text style={{ width: "50%" }} className="mb-0 align-self-center"><strong>Titre : </strong> {data.title}</Card.Text>
                  <Card.Text style={{ width: "40%" }} className="mb-0 align-self-center"> <strong>
                    {(Array.isArray(data.author) && data.author.length > 1) ? 'Auteurs : ' : 'Auteur'}
                  </strong> {Array.isArray(data.author) ? data.author.join(', ') : data.author}</Card.Text>
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
      </>
    ) : (
      <Button
        style={{ maxWidth: "50%", margin: "auto" }}
        variant="warning"
        className="mt-4 mb-5"
        size="md"
      >
        "Vous n'avez aucun livre dans votre bibliothèque"
      </Button>
    );

  const deleteAllBooksBtn = libraryData.length > 0 && (
    <Col className="d-flex justify-content-center">
      <Button
        variant='danger'
        className="mt-4 mb-5"
        onClick={() => deleteAllBooks()}
      >
        Supprimer tous les livres
      </Button>
    </Col>
  );

  return (
    <Container fluid>
      <Row>
        <Col className="text-center mt-5">
          <h1 className="display-4">Ajouter un livre à ma bibliothèque</h1>
        </Col>
      </Row>
      <Form className="d-flex justify-content-center mt-5" onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Control
                value={newData.title}
                type="text"
                placeholder="Titre"
                required
                onChange={(e) =>
                  setNewData({ ...newData, title: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group className="mb-3" controlId="formBasicAuthor">
              <Form.Control
                value={newData.author}
                type="text"
                placeholder="Auteur"
                required
                onChange={(e) =>
                  setNewData({ ...newData, author: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <Form.Group className="mb-3" controlId="formBasicButton">
              <Button variant="outline-secondary" type="submit">
                Ajouter
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className="mt-5">
        <Col className="text-center">
          <h2>Ma Liste</h2>
        </Col>
      </Row>
      <Row className="mt-3">{displayData}</Row>
      {deleteAllBooksBtn}
    </Container>
  );
};

// accéder à l'état redux et récupérer les props libraryData
const addStateToProps = (state) => {
  return {
    libraryData: state.library,
  };
};

// dispatch permet d'envoyer une action à redux
const addDispatchToProps = (dispatch) => {
  return {
    addBook: (param) => dispatch(addBook(param)),
    deleteBook: (id) => dispatch(deleteBook(id)),
    deleteAllBooks: () => dispatch(deleteAllBooks()),
  };
};

export default connect(addStateToProps, addDispatchToProps)(AddBooks);
