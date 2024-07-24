import { Link } from "react-router-dom";

function Campaign(props) {
  const {
    title,
    currentAmount,
    goalAmount,
    image,
    _id: id,
  } = props.data;
  const progress = (currentAmount / goalAmount) * 100;
  const style = { width: `${progress}%` };

  return (
    <div className="flex items-center justify-center gap-2 p-2 m-3 rounded-lg lg:w-72 md:w-60 md:block hover:bg-gray-100">
      <div className="bg-black ">
        <img
          src={image.url}
          alt="No image"
          className="object-cover w-36 h-28 md:h-80 md:w-full"
        />
      </div>
      <div className="flex flex-col justify-between w-full gap-2">
        <p className="title">
          <b> {title}</b>
        </p>
        <div className="bg-gray-200">
          <div className="h-1 rounded-full bg-cyan" style={style}></div>
        </div>
        <p className="">
          <b>₦{new Intl.NumberFormat().format(currentAmount)} raised</b>
        </p>
        <Link
          to={`/campaigndetails/${id}`}
          className="p-2 pt-2 bg-white rounded-full text-cyan hover:bg-gray-200 w-fit"
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
}

export default Campaign;
