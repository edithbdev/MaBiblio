import Card from 'react-bootstrap/Card';

const Footer = () => {
  return (
    <Card className="text-center fixed-bottom bg-dark">
      <Card.Footer>
        <small className="text-muted">
          &copy; Edithbdev - MY LIBRARY BOOKS
        </small>
      </Card.Footer>
    </Card>
  );
};

export default Footer;
