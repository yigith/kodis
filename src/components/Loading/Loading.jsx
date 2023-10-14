import "./Loading.css";
import loadingAnimation from "./loading.svg";

function Loading() {
  return ( 
    <div className="Loading">
      <div className="Loading__background">
        <img src="/brand.png" height={32} />
      </div>
      <img src={loadingAnimation} alt="Loading..." />
      <h2>loading..</h2>
    </div>
   );
}

export default Loading;