import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import api, { clearTokens, signedOut } from "../../api";

function NavAccountMenu() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const username = auth.user?.username;

  const profilePicture = auth.user
    ? <img src={auth.user.picture} alt={auth.user.name} width="16" height="16" referrerPolicy="no-referrer" />
    : <i className="bi bi-person-square"></i>;

  const handleSignOut = () => {
    // Best effort: revoking server-side is nice to have, but the local session
    // must end either way.
    api.post("/Account/Logout").catch(() => { });

    clearTokens();
    setAuth(signedOut);
    navigate("/");
  };

  const handleMyNotebook = () => {
    localStorage.removeItem("notebookCode");
    navigate(`/@${username}`);
  };

  return (
    <NavDropdown title={profilePicture} align="end">
      {
        username &&
        <NavDropdown.Item data-bs-theme="dark" onClick={handleMyNotebook}>
          My Notebook (@{username})
        </NavDropdown.Item>
      }
      {
        auth.loggedIn ?
          <NavDropdown.Item data-bs-theme="dark" onClick={handleSignOut}>
            Sign out ({auth.user?.name})
          </NavDropdown.Item> :
          <NavDropdown.Item data-bs-theme="dark" onClick={() => navigate("/")}>
            Sign in
          </NavDropdown.Item>
      }
    </NavDropdown>
  );
}

export default NavAccountMenu;
