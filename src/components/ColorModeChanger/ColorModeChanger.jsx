import { useEffect, useState } from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ColorModeChanger() {
  const [dark, setDark] = useState(null);
  const colorMode = dark ? 'dark' : 'light';
  const ttMessage = dark ? 'Turn on lights' : 'Turn off lights';

  useEffect(() => {
    if (dark === null)
      setDark(localStorage.getItem('colorMode') === 'dark');
    else
      localStorage.setItem('colorMode', colorMode);

    document.documentElement.setAttribute('data-bs-theme', colorMode);
  }, [colorMode, dark]);

  const handleClick = (e) => {
    e.preventDefault();
    setDark(!dark);
  };

  return (
    <Nav.Item>
      <OverlayTrigger overlay={<Tooltip id="tt-color-mode">{ttMessage}</Tooltip>} placement='bottom-end'>
        <Nav.Link onClick={handleClick}>
          <i className={`bi bi-${dark ? "moon-stars" : "sun"}-fill`}></i>
        </Nav.Link>
      </OverlayTrigger >
    </Nav.Item>
  )
}