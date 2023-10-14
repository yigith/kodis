import { Button, Form, Nav } from "react-bootstrap";
import "./Notebook.css";
import React, { useState } from 'react';

function Notebook() {
  const [notes, setNotes] = useState([{
    title: 'Note 1',
    content: ''
  }]);
  const [activeNote, setActiveNote] = useState(notes[0]);
  const ani = () => notes.indexOf(activeNote); // ani: active note index

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    const newNotes = [...notes];
    newNotes[ani()].content = event.target.value;
    setNotes(newNotes);
  };

  const handleSave = () => {
    // Save the title and content to a database or file
    console.log(`Title: ${title}\nContent: ${content}`);
  };

  const handleTabClick = (event, index) => {
    event.preventDefault();
    setActiveNote(notes[index]);
  }

  return (
    <div className="Notebook">
      <Form>
        <Nav variant="tabs" defaultActiveKey={`#note-${ani()}`} className="mt-2">
          {
            notes.map((note, index) => {
              return (
                <Nav.Item key={index}  onClick={(e) => handleTabClick(e, index)}>
                  <Nav.Link href={`#note-${index}`}>
                    {note.title}
                  </Nav.Link>
                </Nav.Item>
              );
            })
          }
        </Nav>
        <Form.Group className="mb-2 flex-fill">
          {activeNote && <Form.Control className="textarea-content" as="textarea" placeholder="Write your notes here..."
            value={activeNote.content}
            onChange={handleContentChange} />}
        </Form.Group>
        <div className="mb-2">
          <Button variant="primary" type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
}

export default Notebook;