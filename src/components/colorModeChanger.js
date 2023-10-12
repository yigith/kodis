import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ColorModeChanger() {
  const [dark, setDark] = useState(null);
  const colorMode = dark ? 'dark' : 'light';
  const linkColor = !dark ? 'link-dark' : 'link-light';
  const ttMessage = dark ? 'Turn on lights' : 'Turn off lights';

  useEffect(() => {
    if (dark === null)
      setDark(localStorage.getItem('colorMode') === 'dark');
    else
      localStorage.setItem('colorMode', colorMode);

    document.documentElement.setAttribute('data-bs-theme', colorMode);
  }, [colorMode]);

  const handleClick = (e) => {
    e.preventDefault();
    setDark(!dark);
  };

  return (
    <OverlayTrigger overlay={<Tooltip id="tt-color-mode">{ ttMessage }</Tooltip>} placement='bottom-end'>
      <a href="#" onClick={handleClick} className={`btn-switch-color-theme ${linkColor}`}>
        <FontAwesomeIcon icon={dark ? faMoon : faSun} />
      </a>
    </OverlayTrigger>
  )
}