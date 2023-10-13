import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import './StartScreen.css';
import StartScreenCard from './StartScreenCard';
import { useState } from 'react';

function StartScreen({onNotebookCodeSubmit, onCreateSubmit}) {
  const [notebookCode, setNotebookCode] = useState('');

  const handleCodeSubmit = () => {
    if (onNotebookCodeSubmit)
      onNotebookCodeSubmit(notebookCode);
  };

  const handleCreateClick = () => {
    if (onCreateSubmit)
      onCreateSubmit();
  };

  return (
    <div className="StartScreen">
      <Row xs={1} md={2} className='gy-4 gx-md-4 justify-content-center'>
        <Col sm={10}>
          <StartScreenCard headerTitle='I Have a Notebook' buttonText='Open' onSubmit={handleCodeSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Notebook Code</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Ex: a3Bq7D" value={notebookCode} onChange={e => setNotebookCode(e.target.value)} required />
            </Form.Group>
          </StartScreenCard>
        </Col>
        <Col sm={10}>
          <StartScreenCard headerTitle='I Want a Notebook' buttonText='Create' onSubmit={handleCreateClick}>
            <Card.Text className='lead text-center'>Keep & Share Your Notes with your friends!</Card.Text>
          </StartScreenCard>
        </Col>
      </Row>
    </div>
  );
}

export default StartScreen;