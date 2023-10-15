import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/ColorModeChanger/ColorModeChanger';
import NavbarLinkCopier from './components/NavbarLinkCopier/NavbarLinkCopier';
import NavbarBrand from './components/NavbarBrand/NavbarBrand';
import { useNavigate, useParams } from 'react-router-dom';
import StartScreen from './pages/StartScreen/StartScreen';
import { useEffect, useState } from 'react';
import Loading from './components/Loading/Loading';
import Notebook from './pages/Notebook/Notebook';
import ThemePicker from './components/ThemePicker/ThemePicker';
import axios from 'axios';
import NotFound from './pages/NotFound/NotFound';

const AppModes = {
  Loading: 0,
  StartScreen: 1,
  Creating: 2,
  Editing: 3
};

function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { path } = useParams();
  const navigate = useNavigate();
  const savedCode = localStorage.getItem("notebookCode");
  const [appMode, setAppMode] = useState(path == "new" ? AppModes.Creating : (path || savedCode) ? AppModes.Loading : AppModes.StartScreen);
  const [notebookCode, setNotebookCode] = useState(null);
  const [notes, setNotes] = useState(null);
  const is = (mode) => appMode === mode;

  // back button case
  if (!path && (is(AppModes.Editing) || is(AppModes.Creating))) {
    setAppMode(AppModes.StartScreen);
    return null;
  }

  useEffect(() => {
    if (!path && savedCode && is(AppModes.Loading)) {
      openNotebook(savedCode);
    }
    else if (path && is(AppModes.Loading)) {
      openNotebook(path);
    }
  }, []);

  const openNotebook = (code) => {
    axios.get(`${baseUrl}/Notebook/${code}`)
      .then((response) => {
        localStorage.setItem("notebookCode", response.data.slug);
        setNotes(response.data.notes);
        setNotebookCode(response.data.slug);
        setAppMode(AppModes.Editing);
        if (path !== response.data.slug)
          navigate(`/${response.data.slug}`);
      })
      .catch((error) => {
        navigate("/404");
      });
  };

  const handleNotebookCodeSubmit = (code) => {
    setAppMode(AppModes.Loading);
    openNotebook(code);
  };

  const handleCreateSubmit = () => {
    setAppMode(AppModes.Creating);
    navigate("/new");
  };

  const handleCreated = (code) => {
    localStorage.setItem("notebookCode", code);
    setNotebookCode(code);
    setAppMode(AppModes.Editing);
    navigate(`/${code}`);
  }

  const handleExitClick = () => {
    localStorage.removeItem("notebookCode");
    setAppMode(AppModes.StartScreen);
    setNotebookCode(null);
    setNotes(null);
    navigate("/");
  };

  return (
    <div className='App'>
      <Navbar className='bg-primary' data-bs-theme="dark">
        <Container fluid="xxl">
          <NavbarBrand />
          {is(AppModes.Editing) && <NavbarLinkCopier code={notebookCode} />}
          <Navbar.Collapse id="basic-navbar-nav">
            <ColorModeChanger />
            <Nav>
              <ThemePicker />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid="xxl" className='flex-fill'>
        {is(AppModes.StartScreen) && <StartScreen onNotebookCodeSubmit={handleNotebookCodeSubmit} onCreateSubmit={handleCreateSubmit} />}
        {is(AppModes.Loading) && <Loading />}
        {(is(AppModes.Creating) || is(AppModes.Editing)) && <Notebook onCreated={handleCreated} initialNotes={notes} code={notebookCode} onExitClick={handleExitClick} />}
      </Container>
    </div>
  );
}

export default App;