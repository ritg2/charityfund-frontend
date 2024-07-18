import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>Page not found</h2>
      <p>
        Go to the <Link to="/">Homepage</Link>
      </p>
    </div>
  );
}

export default NotFound;
