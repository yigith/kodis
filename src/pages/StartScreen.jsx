import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import './StartScreen.css';

function StartScreen() {
  return (
    <div className="StartScreen">
      <Row xs={1} md={2} className='g-5 g-md-4'>
        <Col>
          <Card className='h-100 mx-4 mx-md-0'>
            <Card.Header as="h4" className='text-center p-3'>Open a Notebook</Card.Header>
            <Card.Body className='p-3 p-sm-4 p-md-5 d-flex flex-column'>
              <Form className='flex-fill'>
                <Form.Group className="mb-3">
                  <Form.Label>Notebook Code</Form.Label>
                  <Form.Control size="lg" type="text" placeholder="Ex: a3Bq7D" />
                </Form.Group>
                <div className='d-grid mt-auto'>
                  <Button size="lg">Open</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='h-100 mx-4 mx-md-0'>
            <Card.Header as="h4" className='text-center p-3'>Create a Notebook</Card.Header>
            <Card.Body className='p-3 p-sm-4 p-md-5 d-flex flex-column'>
              <Card.Text className='lead text-center flex-fill d-flex align-items-center justify-content-center'>Keep & Share Your Notes with your friends!</Card.Text>
              <Form className='mt-auto'>
                <div className='d-grid'>
                  <Button size='lg'>Create</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StartScreen;