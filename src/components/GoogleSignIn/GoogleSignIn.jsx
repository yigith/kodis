import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';

function GoogleSignIn({ className }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { auth, setAuth } = useContext(AuthContext);

  const googleLogin = function (relativeUrl, payload) {
    axios.post(`${baseUrl}/${relativeUrl}`, payload)
      .then((response) => {
        setAuth({ ...auth, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        Swal.fire({
          icon: "success",
          title: `Hello ${auth.user.name}!`,
          text: "You have successfully signed in.",
          heightAuto: false,
          width: "25em"
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      googleLogin("Account/GoogleSignInByGoogleOneTap", credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
    disabled: auth.loggedIn
  });

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      googleLogin("Account/GoogleSignInByTokenResponse", tokenResponse);
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