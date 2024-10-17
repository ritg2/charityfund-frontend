import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="mt-32 text-center dark:text-white" id="error-page">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
