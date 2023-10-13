import { Button, Form, Nav } from "react-bootstrap";
import "./Notebook.css";
import React, { useState } from 'react';

function Notebook() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    // Save the title and content to a database or file
    console.log(`Title: ${title}\nContent: ${content}`);
  };

  return (
    <div className="Notebook">
      <Form>
        <Nav variant="tabs" defaultActiveKey="#" className="mt-2">
          <Nav.Item>
            <Nav.Link href="#">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Form.Group className="mb-3 flex-fill">
          <Form.Control className="textarea-content" as="textarea" placeholder="Write your notes here..."
            value={content}
            onChange={handleContentChange} />
        </Form.Group>
        <div className="mb-3">
          <Button variant="primary" type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
}

export default Notebook;