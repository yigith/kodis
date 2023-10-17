import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/ColorModeChanger/ColorModeChanger';
import NavbarLinkCopier from './components/NavbarLinkCopier/NavbarLinkCopier';
import NavbarBrand from './components/NavbarBrand/NavbarBrand';
import { Outlet, useParams} from 'react-router-dom';
import ThemePicker from './components/ThemePicker/ThemePicker';



function App({ history }) {

  const { path } = useParams();
  
  return (
    <div className='App'>
      <Navbar className='bg-primary' data-bs-theme="dark">
        <Container fluid="xxl">
          <NavbarBrand />
          {path && <NavbarLinkCopier code={path} />}
          <Navbar.Collapse id="basic-navbar-nav">
            <ColorModeChanger />
            <Nav>
              <ThemePicker />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid="xxl" className='flex-fill'>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;