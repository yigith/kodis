"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { Alert, Container, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth, faEnvelope, faLink, faNoteSticky, faPen } from '@fortawesome/free-solid-svg-icons';
import ColorModeChanger from './components/colorModeChanger';
import Link from 'next/link';
import { Tilt_Neon } from 'next/font/google'

const brandFont = Tilt_Neon({ subsets: ['latin-ext'], weight: '400' });

export default function Home() {

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Link href="/" className="navbar-brand">
            
            {' '}
            <span className={"h3 " + brandFont.className}><FontAwesomeIcon icon={faNoteSticky} /> KOD.IS</span>
          </Link>
          <ColorModeChanger />

        </Container>
      </Navbar>    
      <main className="container">
        <h1>kodis</h1>
        <Alert className='mt-3' variant='info'>Bu bir bilgi kutusudur.</Alert>
        <FontAwesomeIcon icon={faEnvelope} />
      </main>
    </>
  )
}
