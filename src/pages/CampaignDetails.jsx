import { useState } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function CampaignDetails() {
  const { id } = useParams();
  const { data } = useLoaderData();

  const [amount, setAmount] = useState("");
  const [donation, setDonation] = useState(false);

  const handleAmount = (event) => {
    const { value } = event.target;
    setAmount(value);
  };

  const progress = (data.currentAmount / data.goalAmount) * 100;
  const style = { width: `${progress}%` };

  const submitDonation = async () => {
    const { fullname, email } = JSON.parse(localStorage.getItem("userInfo"));
    const paymentDetails = { amount, campaign_id: data._id };
    if (!amount.trim()) {
      alert("please add amount!");
      return;
    }
    if (!fullname || !email) {
      alert("user is not logged in!");
      return;
    }
    try {
      const { data: response } = await axiosInstance.post(
        `/api/v1/donation`,
        paymentDetails
      );
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error(error);
    }
  };

  const donate = () => {
    setDonation(!donation);
  };

  const currentPage = window.location.pathname.split("/").pop();

  return (
    <div className="p-4 pt-24">
      {donation && (
        <div className="donation-modal">
          <form>
            <label>Enter amount</label>
            <input type="number" value={amount} onChange={handleAmount} />
            <div>
              <button type="button" onClick={submitDonation}>
                submit
              </button>
              <button type="button" onClick={donate}>
                cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold md:text-3xl">{data.title}</h1>
        <div>
          <div>
            <img src={data.image.url} alt="image" className="" />
          </div>

          <div className="mt-2 mb-2 bg-gray-200 rounded-full">
            <div className="h-1 rounded-full bg-cyan" style={style}></div>
          </div>
          <p className="mt-2">
            <b>₦{new Intl.NumberFormat().format(data.currentAmount)}</b> NGN
            raised of ₦{new Intl.NumberFormat().format(data.goalAmount)} goal
          </p>
          <div>
            <div className="p-2 mt-2 mb-3 text-center bg-white rounded-full cursor-pointer text-cyan hover:bg-gray-200">
              Share
            </div>
            <div
              className="p-2 mb-3 text-center bg-white rounded-full cursor-pointer text-cyan hover:bg-gray-200"
              onClick={donate}
            >
              Donate now
            </div>
          </div>
        </div>
      </div>

      <div>
        <p>{data.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-3 pb-6">
        {data.tags.map((tag, index) => (
          <span key={index} >
            <Link
              to={`../campaigns?tag=${tag}`}
              className="p-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
            >
              {tag}
            </Link>
          </span>
        ))}
      </div>
      <div>
        <Link
          to={
            currentPage === "comments" ? `/campaignDetails/${id}` : "comments"
          }
        >
          <div className="p-2 text-center bg-white rounded-full text-cyan hover:bg-gray-200">
            {currentPage === "comments" ? "Hide comments" : "Show comments"}
          </div>
        </Link>
        <Outlet context={id} />
      </div>
    </div>
  );
}

export const campaignDetailsLoader = async ({ params }) => {
  const { id } = params;
  let response;
  try {
    response = await axiosInstance.get(`/api/v1/campaign/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch data");
  }
  return response;
};
