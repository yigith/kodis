import { faCopy, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function NavbarLinkCopier({ url }) {
  const [tooltip, setTooltip] = useState("Copy Link");

  const handleClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    setTooltip("Copied!");
  };

  const handleExit = () => {
    setTooltip("Copy Link");
  };

  return (
    <Form className='me-2'>
      <InputGroup size='sm' className='copy-url-textbox-container'>
        <span className='copy-url-textbox-icon'>
          <FontAwesomeIcon icon={faLink} />
        </span>
        <Form.Control value={url} readOnly />
        <OverlayTrigger onExited={handleExit} trigger={["hover", "focus"]} overlay={<Tooltip id="tt-copy-link">{tooltip}</Tooltip>} placement='bottom'>
          <Button variant="outline-secondary" onClick={handleClick}>
            <FontAwesomeIcon icon={faCopy} />
          </Button>
        </OverlayTrigger>
      </InputGroup>
    </Form>
  );
}