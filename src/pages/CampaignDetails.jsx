import axios from "axios";
import { useState } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

export default function CampaignDetails() {
  const { id } = useParams();
  const { data } = useLoaderData();

  const [amount, setAmount] = useState("");
  const [donation, setDonation] = useState(false);

  const handleAmount = (event) => {
    const { value } = event.target;
    setAmount(value);
  };

  const submitDonation = async () => {
    const { fullname, email } = JSON.parse(localStorage.getItem("userInfo"));
    const { accessToken } = JSON.parse(localStorage.getItem("auth"));
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
      const { data: response } = await axios.post(
        "http://localhost:5001/api/v1/donation",
        paymentDetails,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
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
    <div>
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
      <div className="campaign-details">
        <img src={data.image.url} alt="image" />
        <h1>{data.title}</h1>
      </div>
      <div>
        <p>{data.description}</p>
        <button onClick={donate}>Donate</button>
      </div>
      <div>{data.tags}</div>
      <div>
        <Link
          to={
            currentPage === "comments" ? `/campaignDetails/${id}` : "comments"
          }
        >
          <button>
            {currentPage === "comments" ? "Hide comments" : "Show comments"}
          </button>
        </Link>
        <Outlet context={id} />
      </div>
    </div>
  );
}

export const campaignDetailsLoader = async ({ params }) => {
  const { id } = params;
  //   const { accessToken } = JSON.parse(localStorage.getItem("auth"));
  let response;
  try {
    response = await axios.get(`http://localhost:5001/api/v1/campaign/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch data");
  }
  return response;
};
