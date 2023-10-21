import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Nav, Navbar } from 'react-bootstrap';
import Swal from 'sweetalert2';

function GoogleSignInIcon() {
  return (
    <Navbar style={{ colorScheme: "light" }}>
      <GoogleLogin
        type="icon" size="small"
        onSuccess={credentialResponse => {
          const decoded = jwt_decode(credentialResponse.credential);
          // console.log(credentialResponse);
          // console.log(decoded);
          Swal.fire({
            icon: "success",
            title: `Hello ${decoded.name}!`,
            text: "You have successfully signed in. Soon you will be able to create your own notebook with your own username.",
            heightAuto: false,
            width: "25em"
          });
        }}
        onError={() => {
          console.log('Login Failed');
        }} useOneTap
      />
    </Navbar>
  );
}

export default GoogleSignInIcon;