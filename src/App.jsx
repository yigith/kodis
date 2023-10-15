import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/ColorModeChanger/ColorModeChanger';
import NavbarLinkCopier from './components/NavbarLinkCopier/NavbarLinkCopier';
import NavbarBrand from './components/NavbarBrand/NavbarBrand';
import { useNavigate, useParams } from 'react-router-dom';
import StartScreen from './pages/StartScreen/StartScreen';
import { useState } from 'react';
import Loading from './components/Loading/Loading';
import Notebook from './pages/Notebook/Notebook';
import ThemePicker from './components/ThemePicker/ThemePicker';

const AppModes = {
  Loading: 0,
  StartScreen: 1,
  Creating: 2,
  Editing: 3,
  NotFound: 4
};

function App() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [appMode, setAppMode] = useState(slug == "new" ? AppModes.Creating : slug ? AppModes.Loading : AppModes.StartScreen);
  const [notebookCode, setNotebookCode] = useState(slug);
  const is = (mode) => appMode === mode;

  const handleNotebookCodeSubmit = (code) => {
    setNotebookCode(code);
    setAppMode(AppModes.Loading);
    navigate(`/${code}`);
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
          {is(AppModes.Editing) && <NavbarLinkCopier url={`https://kod.is/${notebookCode}`} />}
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
        {(is(AppModes.Creating) || is(AppModes.Editing)) && <Notebook onCreated={handleCreated} />}
        {/* <Link to="/">Home</Link> */}
      </Container>
    </div>
  );
}

export default App;