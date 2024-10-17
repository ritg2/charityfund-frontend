import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faBookmark,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

function Campaign(props) {
  const {
    title,
    currentAmount,
    goalAmount,
    image: { url },
    _id: id,
  } = props.data;
  const navigate = useNavigate();
  const progress = (currentAmount / goalAmount) * 100;
  const style = { width: `${progress}%` };

  return (
    <div
      onClick={() => navigate(`/campaigndetails/${id}`)}
      className="block p-2 m-3 bg-white rounded-lg shadow-md hover:bg-gray-100 w-fit dark:bg-dark-black"
    >
      <div className="w-fit">
        <img
          src={url}
          alt="No image"
          className="object-cover  w-[250px] h-[150px] rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between w-full gap-2">
        <p className="dark:text-white">
          <b> {title}</b>
        </p>
        <div className="bg-gray-200 rounded-full">
          <div className="h-1 rounded-full bg-cyan " style={style}></div>
        </div>
        <p className="dark:text-white">
          <b>₦{new Intl.NumberFormat().format(currentAmount)} raised</b>
        </p>
        {/* <Link
          to={`/campaigndetails/${id}`}
          className="p-2 text-center text-white rounded-full bg-cyan hover:bg-white hover:text-cyan"
        >
          Donate Now
        </Link> */}
        <div className="flex items-center justify-between">
          <div>
            <button className="dark:text-white">
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>20</span>
            </button>
            <button className="dark:text-white">
              <FontAwesomeIcon icon={faThumbsDown} />
              <span>0</span>
            </button>
          </div>
          <button className="dark:text-white">
            <FontAwesomeIcon icon={faComment} />
            <span>10</span>
          </button>
          <button className="dark:text-white">
            <FontAwesomeIcon icon={faBookmark} />
          </button>
          <button className="dark:text-white">
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Campaign;
