import { Alert, Container, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/colorModeChanger';
import NavbarLinkCopier from './components/navbarLinkCopier';
import NavbarBrand from './components/navbarBrand';
import { Link, useParams } from 'react-router-dom';

function App() {
  let { slug } = useParams();

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <NavbarBrand />
          <NavbarLinkCopier url="https://kod.is/abQ1c0" />
          <ColorModeChanger />
        </Container>
      </Navbar>
      <Container>
        <Alert className='mt-3' variant='info'>Bu bir bilgi kutusudur.</Alert>
        <div>
          Slug: { slug }
        </div>

        <Link to="/foo">Foo</Link>{" | "}
        <Link to="/">Home</Link>
      </Container>
    </>
  );
}

export default App;
