import { faFaceFrownOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function NotFound() {
  return ( 
    <div className="d-flex h-100 align-items-center justify-content-center flex-column">
      <div className="fs-5">
        <FontAwesomeIcon icon={faFaceFrownOpen} />
      </div>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go to home</Link>
    </div>
   );
}

export default NotFound;