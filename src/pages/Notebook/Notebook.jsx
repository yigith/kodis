import { Button, Form, Nav } from "react-bootstrap";
import "./Notebook.css";
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Notebook() {
  const [notes, setNotes] = useState([{
    title: 'Note 1',
    content: 'abc'
  },
  {
    title: 'Note 2',
    content: 'def'
  }]);
  const [activeNote, setActiveNote] = useState(notes[0]);
  const [activeKey, setActiveKey] = useState(0);
  const textareaRef = useRef(null);
  const newNoteLinkRef = useRef(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    const newNotes = [...notes];
    newNotes[activeKey].content = event.target.value;
    setNotes(newNotes);
  };

  const handleSave = () => {
    // Save the title and content to a database or file
  };

  const handleTabSelect = (index, event) => {
    if (index === "-1") {
      event.preventDefault();
      handleNewTabSelect(index, event);
      return;
    }

    setActiveNote(notes[index]);
    setActiveKey(index);
  };

  const handleNewTabSelect = (index, event) => {
    const newNotes = [...notes];
    newNotes.push({ title: `Note ${newNotes.length + 1}`, content: '' });
    setNotes(newNotes);
    setActiveNote(newNotes[newNotes.length - 1]);
    setActiveKey(newNotes.length - 1);
    newNoteLinkRef.current.blur();
    textareaRef.current.focus();
  };

  const promptForNewTitle = () => {
    let newTitle = prompt("Enter a new title", activeNote.title) ?? "";
    newTitle = newTitle.trim();

    if (newTitle) {
      const newNotes = [...notes];
      newNotes[activeKey].title = newTitle;
      setNotes(newNotes);
    }
  };

  const handleNavLinkClick = (event, index) => {
    if (index == activeKey) {
      event.preventDefault();
      promptForNewTitle();
    }
  };

  return (
    <div className="Notebook">
      <Form>
        <div className="notebook-nav-container">
          <Nav activeKey={activeKey} variant="tabs" className="notebook-nav mt-2" onSelect={handleTabSelect}>
            {
              notes.map((note, index) => {
                return (
                  <Nav.Item className="notebook-nav-item" key={index}>
                    <Nav.Link eventKey={index} onClick={(e) => handleNavLinkClick(e, index)}>
                      {note.title}
                    </Nav.Link>
                  </Nav.Item>
                );
              })
            }
            <Nav.Item>
              <Nav.Link className="new-note-tab-link" ref={newNoteLinkRef} eventKey={-1} active={false}>
                <FontAwesomeIcon icon={faPlus} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Form.Group className="mb-2 flex-fill">
          {activeNote && <Form.Control ref={textareaRef} className="textarea-content" as="textarea" placeholder="Write your notes here..."
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