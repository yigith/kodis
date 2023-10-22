import { faCopy, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./NavbarLinkCopier.css";

export default function NavbarLinkCopier({ code }) {
  const [tooltip, setTooltip] = useState("Copy Link");

  const handleClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`https://kod.is/${code}`);
    setTooltip("Copied!");
  };

  const handleExit = () => {
    setTooltip("Copy Link");
  };

  return (
    <>
      <InputGroup size="sm" className="d-flex justify-content-center">
        <InputGroup.Text className="bg-dark">
          kod.is{code && `/${code}`}
        </InputGroup.Text>
        <OverlayTrigger onExited={handleExit} trigger={["hover", "focus"]} overlay={<Tooltip id="tt-copy-link">{tooltip}</Tooltip>} placement='bottom'>
          <Button size="sm" variant="light" onClick={handleClick}>
            <FontAwesomeIcon icon={faCopy} />
          </Button>
        </OverlayTrigger>
      </InputGroup>
    </>

  );
}