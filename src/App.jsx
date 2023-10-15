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

const AppModes = {
  Loading: 0,
  StartScreen: 1,
  Creating: 2,
  Editing: 3,
  NotFound: 4
};

function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { path } = useParams();
  const navigate = useNavigate();
  const [appMode, setAppMode] = useState(path == "new" ? AppModes.Creating : path ? AppModes.Loading : AppModes.StartScreen);
  const [notebookCode, setNotebookCode] = useState(null);
  const [notes, setNotes] = useState(null);
  const is = (mode) => appMode === mode;

  // back button case
  if (!path && !is(AppModes.StartScreen)) {
    setAppMode(AppModes.StartScreen);
    return null;  
  }

  useEffect(() => {
    if (path) {
      openNotebookIfPathIsCode();
    }
  }, []);

  const openNotebookIfPathIsCode = (code) => {
    if (!code)
      code = path;

    axios.get(`${baseUrl}/Notebook/${code}`)
      .then((response) => {
        setNotes(response.data.notes);
        setNotebookCode(response.data.slug);
        setAppMode(AppModes.Editing);
        navigate(`/${response.data.slug}`);
      })
      .catch((error) => {
        setAppMode(AppModes.NotFound);
      });
  };

  const handleNotebookCodeSubmit = (code) => {
    setAppMode(AppModes.Loading);
    openNotebookIfPathIsCode(code);    
  };

  const handleCreateSubmit = () => {
    setAppMode(AppModes.Creating);
    navigate("/new");
  };

  const handleCreated = (code) => {
    setNotebookCode(code);
    setAppMode(AppModes.Editing);
    navigate(`/${code}`);
  }  

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
        {(is(AppModes.Creating) || is(AppModes.Editing)) && <Notebook onCreated={handleCreated} initialNotes={notes} slug={notebookCode} />}
        {is(AppModes.NotFound) && <h1>Not Found</h1>}
      </Container>
    </div>
  );
}

export default App;