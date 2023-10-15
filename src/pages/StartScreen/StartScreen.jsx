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
      <Row xs={1} md={2} className='gy-3 gx-md-4 justify-content-center'>
        <Col sm={10}>
          <StartScreenCard headerTitle='I already have a code..' buttonText='Open' onSubmit={handleCodeSubmit}>
            <Form.Group>
              <Form.Label>Notebook Code</Form.Label>
              <Form.Control autoFocus size="lg" type="text" placeholder="Ex: a3Bq7D" value={notebookCode} onChange={e => setNotebookCode(e.target.value)} required />
            </Form.Group>
          </StartScreenCard>
        </Col>
        <Col sm={10}>
          <StartScreenCard headerTitle='I want a new one..' buttonText='Create' onSubmit={handleCreateClick}>
            <Card.Text className='lead text-center'>Share your notes with your friends for <strong>24 hours</strong>!</Card.Text>
          </StartScreenCard>
        </Col>
      </Row>
    </div>
  );
}

export default StartScreen;