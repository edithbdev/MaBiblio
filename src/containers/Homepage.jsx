import library from '../images/library.jpg';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => {

  return (
    <Container fluid>
      <Row>
        <Col className="text-center mt-5">
          <h1 className="display-4">My Library Books</h1>
        </Col>
      </Row>
      <Row className="d-flex flex-column justify-content-center mt-3">
        <Col className="text-center mb-3">
          <img src={library} alt="library" className="img-fluid" />
        </Col>
        <Col className="text-center">
          <Button
            variant="outline-secondary"
            size="lg"
            as={Link}
            to="/MyLibrary"
          >
            View my books
          </Button>
        </Col>
      </Row>
    </Container>

  );
};

export default Homepage;
