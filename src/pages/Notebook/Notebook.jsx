import { Button, Form, Nav } from "react-bootstrap";
import "./Notebook.css";
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRightFromBracket, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


function Notebook({ onCreated, initialNotes, code, onExitClick }) {
  const emptyNote = { title: 'Note 1', content: '' };
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [slug, setSlug] = useState(code);
  const [remoteNotes, setRemoteNotes] = useState(initialNotes ? deepCopy(initialNotes) : []);
  const [notes, setNotes] = useState(initialNotes ?? [emptyNote]);
  const [activeNote, setActiveNote] = useState(notes[0]);
  const [activeKey, setActiveKey] = useState(0);
  const textareaRef = useRef(null);
  const newNoteLinkRef = useRef(null);

  const handleContentChange = (event) => {
    const newNotes = [...notes];
    newNotes[activeKey].content = event.target.value;
    setNotes(newNotes);
  };

  const createNotes = () => {
    axios.post(`${baseUrl}/Notebook/Create`, { notes: toDictionary(notes) })
      .then((response) => {
        setRemoteNotes(deepCopy(response.data.notes));
        setSlug(response.data.slug);
        setNotes(response.data.notes);
        if (onCreated) {
          onCreated(response.data.slug);
        }
      });
  };

  const updateNotes = () => {
    const updates = [];

    remoteNotes.forEach((remoteNote, index) => {
      if (!notes.some((note) => note.id === remoteNote.id)) {
        updates.push({ id: remoteNote.id, isDeleted: true });
      }
    });

    for (const n of notes) {
      if (!n.id) {
        updates.push({ title: n.title, content: n.content });
      }
      else {
        const remoteNote = remoteNotes.find((remoteNote) => remoteNote.id === n.id);
        if (remoteNote.content !== n.content || remoteNote.title !== n.title) {
          updates.push({ id: n.id, title: n.title, content: n.content });
        }
      }
    }

    console.log("updates", updates);

    axios.post(`${baseUrl}/Notebook/Update/${slug}`, { slug, notes: updates })
      .then((response) => {
        setRemoteNotes(deepCopy(response.data.notes));
        setNotes(response.data.notes);
        console.log("response", response.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (slug) {
      updateNotes();
    } else {
      createNotes();
    }
  };

  const handleTabSelect = (index, event) => {
    if (index === "-1") {
      event.preventDefault();
      handleNewTabSelect(index, event);
      return;
    }

    setActiveNote(notes[index]);
    setActiveKey(index);
    textareaRef.current.focus();
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
      newNotes[Number(activeKey)].title = newTitle;
      setNotes(newNotes);
    }
  };

  const handleNavLinkClick = (event, index) => {
    if (index == activeKey) {
      event.preventDefault();
      promptForNewTitle();
    }
  };

  const handleDeleteClick = () => {
    const newNotes = [...notes];
    newNotes.splice(activeKey, 1);
    if (newNotes.length === 0) {
      newNotes.push(emptyNote);
    }
    setNotes(newNotes);
    const newActiveKey = Math.min(activeKey, newNotes.length - 1);
    setActiveKey(newActiveKey);
    setActiveNote(newNotes[newActiveKey]);
  };

  const handleExitClick = () => {
    if (onExitClick)
      onExitClick();
  };

  return (
    <div className="Notebook">
      <Form onSubmit={handleSubmit}>
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
          {activeNote && <Form.Control autoFocus ref={textareaRef} className="textarea-content" as="textarea" placeholder="Write your notes here..."
            value={activeNote.content}
            onChange={handleContentChange} />}
        </Form.Group>
        <div className="d-flex mb-2">
          <Button variant="primary" type="button" onClick={handleExitClick} className="me-auto">
            <FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" /> Exit
          </Button>
          <Button variant="danger" type="button" onClick={handleDeleteClick} className="me-2">
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
          <Button variant="success" type="submit">
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

function toDictionary(notes) {
  const dictionary = {};
  notes.forEach((note, index) => {
    dictionary[note.title] = note.content;
  });
  return dictionary;
};

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default Notebook;