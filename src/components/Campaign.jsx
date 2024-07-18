import { Link } from "react-router-dom";

function Campaign(props) {
  const {
    title,
    description,
    currentAmount,
    goalAmount,
    image,
    _id: id,
  } = props.data;
  const progress = (currentAmount / goalAmount) * 100;
  const style = { width: `${progress}%` };
  // const link = `http://localhost:5173/campaigndetails/${id}`;
  return (
    <div className="campaign">
      <div className="campaign-image">
        <img src={image.url} alt="No image" />
      </div>
      <p className="title">
        <b>Title: </b>
        {title}
      </p>
      <p className="description">
        <b>Descrition: </b>
        {description}
      </p>
      <p className="progress">
        <b>Progress: </b>Raised ${currentAmount} of ${goalAmount} goal
      </p>
      <div className="progress-bar">
        <div className="bar" style={style}></div>
      </div>
      <button>
        <Link to={`/campaigndetails/${id}`}>Donate Now </Link>
      </button>
    </div>
  );
}

export default Campaign;
