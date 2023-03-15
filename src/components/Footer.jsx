import Card from 'react-bootstrap/Card';

const Footer = () => {
  return (
    <Card
      style={{ borderRadius: 0 }}
      className="text-center fixed-bottom bg-dark">
      <Card.Footer>
        <small className="text-muted">
          MA BIBLIO &nbsp;
          <a href="https://github.com/edithbdev" target="_blank" rel="noreferrer">
            &copy;  Edithbdev
          </a>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default Footer;
