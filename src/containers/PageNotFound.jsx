import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import error from '../images/error.png';

const PageNotFound = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="text-center mt-5">
                    <h1 className="display-4">SORRY</h1>
                    <h2>we couldn't find that page</h2>
                </Col>
            </Row>
            <Row className="d-flex flex-column justify-content-center mt-3">
                <Col className="text-center mb-3">
                    <img src={error} alt="error" />
                </Col>
                <Col className="text-center">
                    <Button
                        variant="outline-secondary"
                        size="lg"
                        as={Link}
                        to="/"
                    >
                        Go to Homepage
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PageNotFound;