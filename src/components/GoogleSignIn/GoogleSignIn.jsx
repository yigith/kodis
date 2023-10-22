import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function GoogleSignIn({className}) {

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      const decoded = jwt_decode(credentialResponse.credential);
      Swal.fire({
        icon: "success",
        title: `Hello ${decoded.name}!`,
        text: "You have successfully signed in. Soon you will be able to create your own notebook with a fixed code.",
        heightAuto: false,
        width: "25em"
      });
    },
    onError: () => {
      console.log('Login Failed');
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
    <>
      <Button className={className} variant="primary" onClick={login}>
        <FontAwesomeIcon icon={faGoogle} className='me-2' />
        Sign in with Google
      </Button>
    </>
  );
}

export default GoogleSignIn;