import library from '../images/library.jpg';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => {

  return (
    <Container fluid>
      <Row>
        <Col className="text-center mt-5">
          <h1 className="display-4">Ma Biblio</h1>
        </Col>
      </Row>
      <Row className="d-flex flex-column justify-content-center mt-3">
        <Col className="text-center mb-3">
          <img src={library} alt="library" className="img-fluid" />
        </Col>
        <Col className="text-center mb-5">
          <Button
            variant="outline-secondary"
            size="lg"
            as={Link}
            to="/Ma-liste"
          >
            Voir ma bibliothèque
          </Button>
        </Col>
      </Row>
    </Container>

  );
};

export default Homepage;
