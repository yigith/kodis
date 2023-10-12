import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function ColorModeChanger() {
  const [dark, setDark] = useState(false);
  const colorMode = dark ? 'dark' : 'light';
  const linkColor = !dark ? 'link-dark' : 'link-light';
  useEffect(() => {
      document.documentElement.setAttribute('data-bs-theme', colorMode);
  }, [dark]);

  const handleClick = (e) => {
    e.preventDefault();
    setDark(!dark);
  };

  return (
      <a href="#" onClick={handleClick} className={linkColor}  title="Toggle Light/Dark Mode">
          <FontAwesomeIcon icon={dark ? faMoon : faSun} />
      </a>
  )
}