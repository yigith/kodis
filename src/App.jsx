import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/ColorModeChanger/ColorModeChanger';
import NavbarLinkCopier from './components/NavbarLinkCopier/NavbarLinkCopier';
import NavbarBrand from './components/NavbarBrand/NavbarBrand';
import { Outlet} from 'react-router-dom';
import ThemePicker from './components/ThemePicker/ThemePicker';



function App({ history }) {

  return (
    <div className='App'>
      <Navbar className='bg-primary' data-bs-theme="dark">
        <Container fluid="xxl">
          <NavbarBrand />
          {/* {is(AppModes.Editing) && <NavbarLinkCopier code={notebookCode} />} */}
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