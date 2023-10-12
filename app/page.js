"use client";
import { Alert, Button, Container, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faK, faMarker } from '@fortawesome/free-solid-svg-icons';
import ColorModeChanger from './components/colorModeChanger';
import { Tilt_Neon } from 'next/font/google'

const brandFont = Tilt_Neon({ subsets: ['latin-ext'], weight: '400' });

export default function Home() {

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <a href="/" className="navbar-brand">
            <FontAwesomeIcon icon={faMarker} />
            <span className={brandFont.className}> KOD.IS</span>
          </a>

          <form className='me-2'>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="https://kod.is/abcdef" />
              <OverlayTrigger id="o2" overlay={<Tooltip id="tt-copy-link">Copy</Tooltip>} placement='bottom'>
                <Button variant="outline-secondary" id="button-addon2">
                  <FontAwesomeIcon icon={faCopy} />
                </Button>
              </OverlayTrigger>
            </div>
          </form>
          <ColorModeChanger />
        </Container>
      </Navbar>
      <Container>
        <Alert className='mt-3' variant='info'>Bu bir bilgi kutusudur.</Alert>
      </Container>
    </>
  )
}
