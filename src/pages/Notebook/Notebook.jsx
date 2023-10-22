import { AppContext } from "../../AppContext";
import { Button, Form, Nav } from "react-bootstrap";
import "./Notebook.css";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRightFromBracket, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


function Notebook({ mode }) {
  const MySwal = withReactContent(Swal);
  const Toast = MySwal.mixin({
    width: "18em",
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const data = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [slug, setSlug] = useState(data.notebook.slug);
  const [remoteNotes, setRemoteNotes] = useState(deepCopy(data.notebook.notes));
  const initialNotes = deepCopy(data.notebook.notes);
  const [notes, setNotes] = useState(initialNotes);
  const [activeKey, setActiveKey] = useState(initialNotes.length > -1 ? 0 : -1);
  const textareaRef = useRef(null);
  const newNoteLinkRef = useRef(null);
  const refAppContext = useContext(AppContext);

  const handleContentChange = (event) => {
    const newNotes = deepCopy(notes);
    newNotes[activeKey].content = event.target.value;
    setNotes(newNotes);
  };

  const createNotes = () => {
    axios.post(`${baseUrl}/Notebook/Create`, { notes: toDictionary(notes) })
      .then((response) => {
        refAppContext.current = { loaded: true, notebook: response.data };
        console.log(refAppContext);
        localStorage.setItem("notebookCode", response.data.slug);
        setSlug(response.data.slug);
        setRemoteNotes(deepCopy(response.data.notes));
        setNotes(response.data.notes);
        Toast.fire({
          heightAuto: false,
          icon: 'success',
          title: 'Notebook created.'
        })
        navigate(`/${response.data.slug}`, { replace: true });
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

    axios.post(`${baseUrl}/Notebook/Update/${slug}`, { slug, notes: updates })
      .then((response) => {
        setRemoteNotes(deepCopy(response.data.notes));
        setNotes(response.data.notes);
        
        Toast.fire({
          icon: 'success',
          title: 'Changes saved!'
        })
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

    setActiveKey(index);
  };

  const handleNewTabSelect = (index, event) => {
    const newNotes = [...notes];
    newNotes.push({ title: `Note ${newNotes.length + 1}`, content: '' });
    setNotes(newNotes);
    setActiveKey(newNotes.length - 1);
    newNoteLinkRef.current.blur();
    textareaRef.current.focus();
  };

  const promptForNewTitle = () => {

    MySwal.fire({
      heightAuto: false,
      title: 'A New Title',
      input: 'text',
      inputValue: notes[activeKey].title,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      const newTitle = result.value?.trim();
      if (result.isConfirmed && newTitle) {
        const newNotes = [...notes];
        newNotes[activeKey].title = newTitle;
        setNotes(newNotes);
      }
    })


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
      newNotes.push({ title: 'Note', content: '' });
    }
    setNotes(newNotes);
    const newActiveKey = Math.min(activeKey, newNotes.length - 1);
    setActiveKey(newActiveKey);
  };

  const handleExitClick = () => {
    localStorage.removeItem("notebookCode");
    navigate("/");
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
          {activeKey > -1 && <Form.Control ref={textareaRef} className="textarea-content" as="textarea" placeholder="Write your notes here..."
            value={notes[activeKey].content}
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

export async function notebookLoader(params, request, refAppContext) {
  if (refAppContext?.current.loaded) {
    const result = { notebook: refAppContext.current.notebook };
    console.log(refAppContext?.current.loaded, result);
    refAppContext.current.loaded = false;
    refAppContext.current.notebook = null;
    return result;
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { path } = params;

  if (path) {
    try {
      const response = await axios.get(`${baseUrl}/Notebook/${path}`);
      localStorage.setItem("notebookCode", response.data.slug);
      return { notebook: response.data };
    }
    catch (error) {
      console.log(error);
      return redirect("/404");
    }
  }
  else {
    return { notebook: { slug: null, notes: [{ title: 'Note', content: '' }] } };
  }
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