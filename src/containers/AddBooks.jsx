import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addBook,
  deleteBook,
  deleteAllBooks,
} from '../redux/actions/actionBooks';
// import FlipMove from 'react-flip-move';
// import { Flipper, Flipped } from 'react-flip-toolkit'
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
      // <FlipMove>
      //   {libraryData.map((data) => {
      //     return (
      //       <Card style={{ width: "80%", margin: "auto" }} key={data.id}>
      //         <Card.Body className="d-flex justify-content-between">
      //           <Card.Text style={{ width: "50%" }} className="mb-0 align-self-center"><strong>Title : </strong> {data.title}</Card.Text>
      //           <Card.Text style={{ width: "40%" }} className="mb-0 align-self-center"> <strong>Author : </strong> {data.author[0]}</Card.Text>
      //           <Button
      //             variant="danger"
      //             className="align-self-center"
      //             onClick={() => deleteBook(data.id)}>
      //             x
      //           </Button>
      //         </Card.Body>
      //       </Card>
      //     );
      //   })}
      // </FlipMove>

      <>
        {libraryData
          .sort((a, b) => {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
          })
          .map((data) => {
            return (
              <Card style={{ width: "80%", margin: "auto" }} key={data.id}>
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text style={{ width: "50%" }} className="mb-0 align-self-center"><strong>Title : </strong> {data.title}</Card.Text>
                  <Card.Text style={{ width: "40%" }} className="mb-0 align-self-center"> <strong>
                    {(Array.isArray(data.author) && data.author.length > 1) ? 'Authors : ' : 'Author'}
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
        You don't have any books in your library
      </Button>
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
          <h1 className="display-4">Add a book to your library</h1>
        </Col>
      </Row>
      <Form className="d-flex justify-content-center mt-5" onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={4}>
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
          <Col xs={12} md={4}>
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
          <Col xs={12} md={4} className="d-flex justify-content-end">
            <Form.Group className="mb-3" controlId="formBasicButton">
              <Button variant="outline-secondary" type="submit">
                Add a book
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className="mt-5">
        <Col className="text-center">
          <h2>My library</h2>
        </Col>
      </Row>
      <Row className="mt-3">{displayData}</Row>
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
