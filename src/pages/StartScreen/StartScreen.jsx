import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import './StartScreen.css';
import StartScreenCard from './StartScreenCard';
import { useContext, useState } from 'react';
import { redirect, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '/src/components/LoadingSpinner/LoadingSpinner';
import { AppContext } from '/src/AppContext';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

function StartScreen() {
  const MySwal = withReactContent(Swal);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [notebookCode, setNotebookCode] = useState('');
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
          text: "It may have expired or never existed."
        });
      });
  };

  const handleCreateClick = () => {
    navigate("/new");
  };

  return (
    <div className="StartScreen">
      {isLoading && <LoadingSpinner />}
      <Row xs={1} md={2} className='gy-3 gx-md-4 justify-content-center'>
        <Col sm={10}>
          <StartScreenCard headerTitle='I already have a code..' buttonText='Open' onSubmit={handleCodeSubmit}>
            <Form.Group>
              <Form.Label>Notebook Code</Form.Label>
              <Form.Control autoFocus size="lg" type="text" placeholder="Ex: a3Bq7D" value={notebookCode} onChange={e => setNotebookCode(e.target.value)} required />
            </Form.Group>
          </StartScreenCard>
        </Col>
        <Col sm={10}>
          <StartScreenCard headerTitle='I want a new one..' buttonText='Create' onSubmit={handleCreateClick}>
            <Card.Text className='lead text-center'>Share your notes with your friends for <strong>24 hours</strong>!</Card.Text>
          </StartScreenCard>
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