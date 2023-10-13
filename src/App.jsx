import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/colorModeChanger';
import NavbarLinkCopier from './components/navbarLinkCopier';
import NavbarBrand from './components/navbarBrand';
import { Link, useParams } from 'react-router-dom';
import StartScreen from './pages/StartScreen';

function App() {
  const { slug } = useParams();
  const isStartPage = slug === undefined;

  return (
    <div className='App'>
      <Navbar className="bg-body-tertiary">
        <Container fluid="xxl">
          <NavbarBrand />
          { !isStartPage && <NavbarLinkCopier url="https://kod.is/abQ1c0" /> }
          <ColorModeChanger />
        </Container>
      </Navbar>
      <Container fluid="xxl" className='flex-fill'>
        {isStartPage && <StartScreen />}

        {/* <Link to="/">Home</Link> */}
      </Container>
    </div>
  );
}

export default App;