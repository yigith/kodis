import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import './StartScreen.css';
import StartScreenCard from './StartScreenCard';

function StartScreen() {
  return (
    <div className="StartScreen">
      <Row xs={1} md={2} className='gy-4 g-md-5 justify-content-center'>
        <Col sm={10}>
          <StartScreenCard headerTitle='I Have a Notebook' buttonText='Open'>
            <Form.Group className="mb-3">
              <Form.Label>Notebook Code</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Ex: a3Bq7D" />
            </Form.Group>
          </StartScreenCard>
        </Col>
        <Col sm={10}>
          <StartScreenCard headerTitle='I Want a Notebook' buttonText='Create'>
            <Card.Text className='lead text-center'>Keep & Share Your Notes with your friends!</Card.Text>
          </StartScreenCard>
        </Col>
      </Row>
    </div>
  );
}

export default StartScreen;