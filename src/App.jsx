import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/colorModeChanger';
import NavbarLinkCopier from './components/navbarLinkCopier';
import NavbarBrand from './components/navbarBrand';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import { useState } from 'react';

function App() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isStartPage, setIsStartPage] = useState(true); 
  const [notebookCode, setNotebookCode] = useState(slug);

  const handleNotebookCodeSubmit = (code) => {
    setNotebookCode(code);
    setIsStartPage(false);
    navigate(`/${code}`);
  };

  return (
    <div className='App'>
      <Navbar className="bg-body-tertiary">
        <Container fluid="xxl">
          <NavbarBrand />
          { !isStartPage && <NavbarLinkCopier url={`https://kod.is/${notebookCode}`} /> }
          <ColorModeChanger />
        </Container>
      </Navbar>
      <Container fluid="xxl" className='flex-fill'>
        {isStartPage && <StartScreen onNotebookCodeSubmit={handleNotebookCodeSubmit} />}

        {/* <Link to="/">Home</Link> */}
      </Container>
    </div>
  );
}

export default App;