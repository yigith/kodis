import { NavDropdown } from "react-bootstrap";

const themes = [
  "Default",
  "Cerulean",
  "Cosmo",
  "Cyborg",
  "Darkly",
  "Flatly",
  "Journal",
  "Litera",
  "Lumen",
  "Lux",
  "Materia",
  "Minty",
  "Morph",
  "Pulse",
  "Quartz",
  "Sandstone",
  "Simplex",
  "Sketchy",
  "Slate",
  "Solar",
  "Spacelab",
  "Superhero",
  "United",
  "Vapor",
  "Yeti",
  "Zephyr"
];


function ThemePicker() {
  return (
    <NavDropdown title="Theme">
      {themes.map((theme) => (
        <NavDropdown.Item data-bs-theme="dark"
          key={theme}
          onClick={() => {
            localStorage.setItem("theme", theme.toLowerCase());
            window.location.reload();
          }}
        >
          {theme}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default ThemePicker;