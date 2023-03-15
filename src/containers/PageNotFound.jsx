import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import error from '../images/error.png';

const PageNotFound = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="text-center mt-5">
                    <h1 className="display-4">Désolé</h1>
                    <h2>La page que vous recherchez n'existe pas</h2>
                </Col>
            </Row>
            <Row className="d-flex flex-column justify-content-center mt-3">
                <Col className="text-center mb-3">
                    <img src={error} alt="error" className="img-fluid" />
                </Col>
                <Col className="text-center">
                    <Button
                        variant="outline-secondary"
                        size="lg"
                        as={Link}
                        to="/"
                    >
                        Retour à l'accueil
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PageNotFound;