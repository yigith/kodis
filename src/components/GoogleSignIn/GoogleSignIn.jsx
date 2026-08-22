import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import api, { apiErrorMessage, authStateFromTokens } from '../../api';

function GoogleSignIn({ className }) {
  const { auth, setAuth } = useContext(AuthContext);

  const googleLogin = function (relativeUrl, payload) {
    api.post(`/${relativeUrl}`, payload)
      .then((response) => {
        // The signed-in user comes from the new access token - reading it off
        // the previous auth state would still be null on a first sign-in.
        const nextAuth = authStateFromTokens(response.data);
        setAuth(nextAuth);

        Swal.fire({
          icon: "success",
          title: nextAuth.user?.name ? `Hello ${nextAuth.user.name}!` : "Welcome!",
          text: "You have successfully signed in.",
          heightAuto: false,
          width: "25em"
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Sign in failed",
          text: apiErrorMessage(error, "Could not sign you in. Please try again."),
          heightAuto: false,
          width: "25em"
        });
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
