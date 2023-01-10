import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/actions/actionFetchBooks';
import { addBook } from '../redux/actions/actionBooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Spinner, Card, Accordion, Button, Badge } from 'react-bootstrap';

const SearchBooks = () => {
  const [keyword, setKeyword] = useState('');

  const stateSearch = useSelector((state) => state.search);
  console.log(stateSearch)
  const stateBooks = useSelector((state) => state.library);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchBooks(keyword));
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
    toast.success('Registered book !');
  };

  const displayFetchBooks = stateSearch.isLoading ? (
    <Col className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Col>
  ) : stateSearch.fetchBooks === undefined ? (
    <Col className="d-flex justify-content-center text-danger">
      No books found
    </Col>
  ) : stateSearch.error !== '' ? (
    <Col className="d-flex justify-content-center text-danger">{stateSearch.error}</Col>
  ) : (stateSearch.fetchBooks !== undefined && (
    stateSearch.fetchBooks
      .sort((a, b) => {
        return a.volumeInfo.title < b.volumeInfo.title ? -1 : a.volumeInfo.title > b.volumeInfo.title ? 1 : 0;
      })
      .map((data) => {
        return (
          <Card style={{ width: "80%", margin: "auto" }} key={data.id}>
            <Accordion flush>
              <Accordion.Item eventKey={data.id}>
                <Accordion.Header>{data.volumeInfo.title}</Accordion.Header>
                <Accordion.Body>
                  {data.volumeInfo.hasOwnProperty('imageLinks') && (
                    <Card.Img style={{ width: 'auto', marginBottom: '1rem' }} variant="top" src={data.volumeInfo.imageLinks.thumbnail} alt={data.volumeInfo.title} />
                  )}
                  <br />
                  <Card.Title>Title : {data.volumeInfo.title}</Card.Title>
                  {data.volumeInfo.authors && (
                    data.volumeInfo.authors.length === 1 ?
                      <Card.Text>Author : {data.volumeInfo.authors}</Card.Text>
                      :
                      <Card.Text>Authors : {data.volumeInfo.authors.join(', ')}</Card.Text>
                  )}
                  {data.saleInfo.hasOwnProperty('isEbook') && (
                    data.saleInfo.isEbook && (
                      <Button
                        variant="secondary"
                        className="my-3"
                        href={data.saleInfo.buyLink}
                      > E-book disponible
                        {data.saleInfo.hasOwnProperty('saleability') && (
                          data.saleInfo.saleability === 'FREE' ?
                            <Badge className="mx-1" bg="warning"> Free </Badge>
                          : <Badge className="mx-1" bg="primary"> Paying </Badge>
                        )}
                      </Button>
                    ))}
                  {data.volumeInfo.hasOwnProperty('description') && (
                    <Card.Text>
                      Description: {data.volumeInfo.description}
                    </Card.Text>
                  )}
                  <Card.Link
                    className="btn btn-outline-secondary mx-3 my-3"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data.volumeInfo.previewLink}
                  >
                    More informations
                  </Card.Link>
                  {
                    !stateBooks.filter((book) => book.title === data.volumeInfo.title).length > 0 ?
                      <Button
                        variant="secondary"
                        type='submit'
                        onClick={() => handleSaveBook(data.volumeInfo.title, data.volumeInfo.authors)}>
                        Save
                      </Button>
                      :
                      <Button variant="warning" disabled>
                        Book registered
                      </Button>
                  }
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        );
      })
  )
  );

  return (
    <Container fluid>
      <Row>
        <Col className="text-center mt-5">
          <h1 className="display-4">SEARCH FOR A BOOK</h1>
          <p>
            Search for a book on the Google API by keyword, and add it to your library!
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Form
            className="d-flex justify-content-center mt-5"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3 mx-3" controlId="formBasicTitle">
              <Form.Control
                value={keyword}
                type="text"
                placeholder="What to look for ?"
                onChange={(e) => setKeyword(e.target.value)}
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
