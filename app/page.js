"use client";
import { Alert, Container, Navbar } from 'react-bootstrap';
import ColorModeChanger from './components/colorModeChanger';
import NavbarLinkCopier from './components/navbarLinkCopier';
import NavbarBrand from './components/navbarBrand';

export default function Home() {

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
      </Container>
    </>
  )
}
