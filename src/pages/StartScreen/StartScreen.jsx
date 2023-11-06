import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import './StartScreen.css';
import StartScreenCard from './StartScreenCard';
import { useContext, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '/src/components/LoadingSpinner/LoadingSpinner';
import { AppContext } from '/src/AppContext';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import { AuthContext } from '../../AuthContext';

function StartScreen() {
  const MySwal = withReactContent(Swal);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const appContext = useContext(AppContext);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notebookCode, setNotebookCode] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeSubmit = async () => {
    setIsLoading(true);
    axios.get(`${baseUrl}/Notebook/${notebookCode}`)
      .then((response) => {
        localStorage.setItem('notebookCode', response.data.slug);
        appContext.current.value = { loaded: true, notebook: response.data };
        setIsLoading(false);
        navigate(`/${response.data.slug}`, { replace: true });
      }).catch((error) => {
        setIsLoading(false);
        MySwal.fire({
          icon: "error",
          title: "Not Found!",
          text: "It may have expired or never existed.",
          heightAuto: false,
          width: "25em"
        });
      });
  };

  const handleCreateClick = () => {
    navigate("/new");
  };

  return (
    <div className="StartScreen">
      {isLoading && <LoadingSpinner />}
      <Row xs={1} md={2} className='col-sm-10 col-md-12 col-lg-10 col-xl-9 gy-2 gy-sm-3 gx-md-4 justify-content-center'>
        <Col className='d-flex align-items-stretch'>
          <StartScreenCard className="w-100" headerTitle='Share Your Notes' onSubmit={handleCodeSubmit}>
            <Card.Text className='flex-fill d-flex text-center align-items-center'>
              Open an existing notebook or create a new one that will be live for 24 hours.
            </Card.Text>
            <Row className='mt-auto'>
              <Col sm="6" md="12" lg="7">
                <InputGroup className='mb-2 mb-sm-0 mb-md-2 mb-lg-0'>
                  <Form.Control type="text" placeholder="AbcXy1" value={notebookCode} onChange={e => setNotebookCode(e.target.value)} required />
                  <Button type="submit">Open</Button>
                </InputGroup>
              </Col>
              <Col sm="6" md="12" lg="5">
                <Button onClick={handleCreateClick} className='w-100' type="button">Create New</Button>
              </Col>
            </Row>
          </StartScreenCard>
        </Col>
        <Col className='d-flex align-items-stretch'>
          {
            !auth.loggedIn &&
            <StartScreenCard className="w-100" headerTitle='Get Your Own Notebook' onSubmit={handleCreateClick}>
              <div className='flex-fill d-flex flex-column justify-content-center'>
                <Card.Text className='text-center'>
                  Create your own notebook with your username for <strong>free</strong> by signing in with Google!
                </Card.Text>
                <Card.Text className=' text-center'>
                  Ex: <mark>https://kod.is/@username</mark>
                </Card.Text>
              </div>
              <GoogleSignIn className="mt-2" />
            </StartScreenCard>
          }
          {
            auth.loggedIn && !auth.user?.username &&
            <StartScreenCard className="w-100" headerTitle='Set Your Username' onSubmit={handleSaveUsernameClick}>
              <Card.Text className='flex-fill d-flex text-center align-items-center'>
                Enter a username to create your own notebook.
              </Card.Text>
              <Row className='mt-auto justify-content-center'>
                <Col sm="6" md="12" lg="7">
                  <InputGroup className='mb-2 mb-sm-0 mb-md-2 mb-lg-0'>
                    <InputGroup.Text>
                      kod.is/@
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="username.." value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                    <Button type="submit">Save</Button>
                  </InputGroup>
                </Col>
              </Row>
            </StartScreenCard>
          }
        </Col>
      </Row>
    </div>
  );
}

export async function startScreenLoader() {
  const slug = localStorage.getItem("notebookCode");
  if (slug) {
    return redirect(`/${slug}`);
  }
  return null;
}

export default StartScreen;