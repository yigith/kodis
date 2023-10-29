import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../AuthContext";
import axios from "axios";

function NavAccountMenu() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { auth, setAuth } = useContext(AuthContext);

  const profilePicture = auth.user ? <img src={auth.user.picture} alt={auth.user.name} width="16" height="16" referrerPolicy="no-referrer" /> : <i className="bi bi-person-square"></i>;

  const handleSignOut = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`;
    axios.post(`${baseUrl}/Account/Logout`)
      .then((response) => { })
      .catch((error) => { console.log(error); });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth({ loggedIn: false, user: null, accessToken: null, refreshToken: null });
  };

  return (
    <NavDropdown title={profilePicture} align="end">
      <NavDropdown.Item data-bs-theme="dark">
        My Notebook
      </NavDropdown.Item>
      {
        auth.loggedIn ?
          <NavDropdown.Item data-bs-theme="dark" onClick={handleSignOut}>
            Sign out ({auth.user.name})
          </NavDropdown.Item> :
          <NavDropdown.Item data-bs-theme="dark">
            Sign in
          </NavDropdown.Item>
      }
    </NavDropdown>
  );
}

export default NavAccountMenu;