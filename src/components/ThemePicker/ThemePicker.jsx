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
  "Minty",
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
  console.log(window.test)
  return (
    <NavDropdown title="Theme" align="end">
      {themes.map((theme) => (
        <NavDropdown.Item data-bs-theme="dark" active={theme.toLowerCase() === localStorage.getItem("theme")} 
          key={theme}
          onClick={() => {
            localStorage.setItem("theme", theme.toLowerCase());
            window.setBootstrapCdnLink();
          }}
        >
          {theme}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default ThemePicker;