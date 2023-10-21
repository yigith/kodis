import { NavDropdown } from "react-bootstrap";

function NavAccountMenu() {
  return ( 
    <NavDropdown title={<i className="bi bi-person-square"></i>} align="end">
      <NavDropdown.Item data-bs-theme="dark">
        My Notebook
      </NavDropdown.Item>
  </NavDropdown>
   );
}

export default NavAccountMenu;