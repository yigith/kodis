import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function GoogleSignIn() {

  useGoogleOneTapLogin({
    onError: (error) => {
      console.log(error);
    }
  });

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      // console.log(tokenResponse)

      axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        }
      })
        .then((response) => {
          console.log(response.data);
          const userInfo = response.data;
          Swal.fire({
            icon: "success",
            title: `Hello ${userInfo.name}!`,
            text: "You have successfully signed in. Soon you will be able to create your own notebook with your own username.",
            heightAuto: false,
            width: "25em"
          });

        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <div className='mb-2 mb-sm-4'>
      <Button onClick={login}>
        <FontAwesomeIcon icon={faGoogle} className='me-2' />
        Sign in with Google
      </Button>
    </div>
  );
}

export default GoogleSignIn;