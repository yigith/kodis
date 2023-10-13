import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/colorModeChanger';
import NavbarLinkCopier from './components/navbarLinkCopier';
import NavbarBrand from './components/navbarBrand';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import { useState } from 'react';
import Loading from './components/Loading';
import Notebook from './pages/Notebook';

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
  const [appMode, setAppMode] = useState(slug ? AppModes.Loading : AppModes.StartScreen); 
  const [notebookCode, setNotebookCode] = useState(slug);
  const is = (mode) => appMode === mode;

  const handleNotebookCodeSubmit = (code) => {
    setNotebookCode(code);
    setAppMode(AppModes.Loading);
    navigate(`/${code}`);
  };

  const handleCreateSubmit = () => {
    setAppMode(AppModes.Creating);
  };

  return (
    <div className='App'>
      <Navbar className="bg-body-tertiary">
        <Container fluid="xxl">
          <NavbarBrand />
          { is(AppModes.Editing) && <NavbarLinkCopier url={`https://kod.is/${notebookCode}`} /> }
          <ColorModeChanger />
        </Container>
      </Navbar>
      <Container fluid="xxl" className='flex-fill'>
        {is(AppModes.StartScreen) && <StartScreen onNotebookCodeSubmit={handleNotebookCodeSubmit} onCreateSubmit={handleCreateSubmit} />}
        {is(AppModes.Loading) && <Loading />}
        {is(AppModes.Creating) && <Notebook />}
        {/* <Link to="/">Home</Link> */}
      </Container>
    </div>
  );
}

export default App;