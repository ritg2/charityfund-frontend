import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-auto">
      <div className="p-2 bg-cyan dark:bg-dark-cyan-dark">
      <div className="flex items-center justify-between">
        <Link to="/" className="px-2 py-2 text-xl font-bold text-white">
          charityfund
        </Link>
        <div>
          <a href="#" className="m-3 text-2xl dark:text-white">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" className="m-3 text-2xl dark:text-white">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="m-3 text-2xl dark:text-white">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
      <div className="text-sm text-center text-white">
        &copy;<span>2024</span>
        <span> CHARITYFUND.</span>
      </div>
      </div>
    </footer>
  );
}
export default Footer;
