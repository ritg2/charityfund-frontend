import { useContext, useState } from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNairaSign,
  faMessage,
  faShare,
  faCoins,
  faComment,
  faBookmark,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

export default function CampaignDetails() {
  const { id } = useParams();
  const { data } = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [donationForm, setDonationForm] = useState({ amount: "", message: "" });
  const [donation, setDonation] = useState(false);

  const handleDonation = (event) => {
    const { value, name } = event.target;
    setDonationForm({ ...donationForm, [name]: value });
  };

  const progress = (data.currentAmount / data.goalAmount) * 100;
  const style = { width: `${progress}%` };

  const submitDonation = async () => {
    const paymentDetails = {
      amount: donationForm.amount,
      campaign_id: data._id,
    };
    if (!donationForm.amount.trim()) {
      alert("please add amount!");
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
    if (!user) {
      navigate("/login");
      return;
    }
    setDonation(!donation);
  };

  const saveCampaign = async () => {
    try {
      await axiosInstance.post(`api/v1/campaign/${id}/save`);
      alert("Campaign has been bookmarked");
    } catch (error) {
      console.error(error);
    }
  };

  const unsaveCampaign = async () => {
    try {
      await axiosInstance.post(`api/v1/campaign/${id}/save`);
    } catch (error) {
      console.error(error);
    }
  };

  const currentPage = window.location.pathname.split("/").pop();

  return (
    <>
      {donation && (
        <div className="fixed top-0 flex items-center justify-center w-full bg-opacity-50 h-svh bg-slate-700">
          <div className="bg-white rounded-lg dark:bg-dark-black p-4 w-[270px]">
            <form>
              <div className="mb-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-semibold dark:text-white"
                >
                  Amount
                </label>
                <br />
                <div className="relative w-full">
                  <FontAwesomeIcon
                    icon={faNairaSign}
                    className="absolute pt-3 pl-2 dark:text-white"
                  />
                  <input
                    type="number"
                    id="amount"
                    className="w-full p-2 px-4 pl-8 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
                    name="amount"
                    value={donationForm.amount}
                    onChange={handleDonation}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold dark:text-white"
                >
                  Message(optional)
                </label>
                <br />
                <div className="relative w-full">
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="absolute pt-3 pl-2 dark:text-white"
                  />
                  <input
                    type="text"
                    id="message"
                    className="w-full p-2 px-4 pl-8 border border-solid rounded-lg focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
                    name="message"
                    value={donationForm.message}
                    onChange={handleDonation}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={submitDonation}
                  className="w-1/2 px-2 py-1 text-white rounded-full bg-cyan hover:bg-white hover:text-cyan"
                >
                  submit
                </button>
                <button
                  type="button"
                  onClick={donate}
                  className="w-1/2 px-2 py-1 text-white bg-red-600 rounded-full hover:bg-white hover:text-cyan"
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="p-4 dark:bg-dark-cyan-dark">
        <div>
          <h1 className="text-xl font-bold md:text-2xl dark:text-white md:hidden">
            {data.title}
          </h1>
          <div className="justify-center gap-4 md:flex">
            <div className="md:w-1/2">
              <img
                src={data.image.url}
                alt="image"
                className="object-cover w-full md:max-h-[450px] h-[300px] rounded-lg"
              />
            </div>

            <div className="md:w-1/2">
              <h1 className="hidden text-xl font-bold md:text-2xl dark:text-white md:block">
                {data.title}
              </h1>
              <div className="mt-2 mb-2 bg-gray-200 rounded-full">
                <div className="h-1 rounded-full bg-cyan" style={style}></div>
              </div>
              <p className="mt-2 dark:text-white">
                <b>₦{new Intl.NumberFormat().format(data.currentAmount)}</b> NGN
                raised of ₦{new Intl.NumberFormat().format(data.goalAmount)}{" "}
                goal
              </p>
              <div>
                <div className="p-2 mt-2 mb-3 text-center text-white rounded-full bg-cyan hover:bg-white hover:text-cyan">
                  Share <FontAwesomeIcon icon={faShare} />
                </div>
                <div
                  className="p-2 mt-2 mb-3 text-center text-white rounded-full bg-cyan hover:bg-white hover:text-cyan"
                  onClick={donate}
                >
                  Donate now <FontAwesomeIcon icon={faCoins} />
                </div>
              </div>
              <div className="flex items-center justify-between bg-white rounded-full dark:bg-dark-black">
                <button className="p-2 dark:text-white">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span>20</span>
                </button>
                <button className="p-2 dark:text-white">
                  <FontAwesomeIcon icon={faThumbsDown} />
                  <span>0</span>
                </button>
                <button className="dark:text-white">
                  <Link
                    to={
                      currentPage === "comments"
                        ? `/campaignDetails/${id}`
                        : "comments"
                    }
                    className="p-2"
                  >
                    <FontAwesomeIcon icon={faComment} />
                    <span>Comments</span>
                  </Link>
                </button>
                <button className="p-2 dark:text-white" onClick={saveCampaign}>
                  <FontAwesomeIcon icon={faBookmark} />
                  <span>Bookmark</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="dark:text-white">{data.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-3 pb-6">
          {data.tags.map((tag, index) => (
            <span key={index}>
              <Link
                to={`../campaigns?tag=${tag}`}
                className="px-2 py-1 mb-2 bg-gray-100 hover:bg-gray-200 rounded-xl dark:text-white dark:bg-dark-black"
              >
                #{tag}
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
            <button className="w-full p-2 px-4 mt-2 mb-3 text-center text-white rounded-full bg-cyan hover:bg-white hover:text-cyan md:hidden">
              {currentPage === "comments" ? "Hide comments " : "Show comments "}
              <FontAwesomeIcon icon={faComment} />
            </button>
          </Link>
          <Outlet context={id} />
        </div>
      </div>
    </>
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
