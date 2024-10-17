import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mt-32 text-center dark:text-white">
      <p className="text-3xl font-bold">404</p>
      <h2 className="text-2xl">Page not found</h2>
      <p>
        Go to the <Link to="/" className="underline">Homepage</Link>
      </p>
    </div>
  );
}

export default NotFound;
