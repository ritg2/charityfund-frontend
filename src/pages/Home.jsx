import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Campaign from "../components/Campaign";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

function Home() {
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/api/v1/campaign?limit=3");
        setCampaign(response.data.campaign);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("failed to load campaign");
      }
    };
    fetchData();
  }, []);

  const renderCampaigns = campaign.map((campaign) => {
    return <Campaign key={campaign._id} data={campaign} />;
  });

  return (
    <div>
      <section className="hero-section transiton">
        <div className="container pt-24 mx-auto">
          <div className="flex flex-col items-center justify-center text-center transition-all delay-300 hero">
            <h1 className="pt-3 text-3xl font-bold">
              Join Us in Making a Difference
            </h1>
            <h2 className="pt-3 text-2xl font-bold">
              Empower Change Through Giving
            </h2>
            <div className="flex flex-col gap-2 pt-2 md:flex-row ">
              <Link
                className="p-2 bg-white rounded-full text-cyan hover:bg-gray-200"
                to="/campaigns"
              >
                Donate Now
              </Link>

              <Link
                className="p-2 bg-white rounded-full text-cyan hover:bg-gray-200"
                to="/createcampaign"
              >
                Start Fundraising
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="p-2 pb-5">
        <div className="featured-campaigns">
          <h2 className="p-2 text-xl font-bold text-center">
            Featured Campaigns
          </h2>
          <div className="items-center justify-center gap-2 md:flex">
            {loading ? (
              <div className="w-full text-center">
                <FontAwesomeIcon icon={faSpinner} className="m-auto spinner" />
              </div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              renderCampaigns
            )}
          </div>
        </div>
      </section>
      <hr />
      <section>
        <div className="p-6 text-center">
          <h2 className="p-2 text-xl font-bold">Testimonials</h2>
          <div className="items-center justify-center gap-3 md:flex">
            <div className="p-2 mb-3 bg-white rounded-xl">
              <p>
                <b>Testimonial 1</b>
              </p>
              <p>
                <b>"</b>Thanks to [Platform Name], we were able to raise enough
                funds to provide shelter for families affected by natural
                disasters. It's incredible to see the impact we can make
                together!<b>"</b> - John Doe, Volunteer
              </p>
            </div>
            <div className="p-2 bg-white rounded-xl">
              <p>
                <b>Testimonial 2</b>
              </p>
              <p>
                <b>"</b>I've been supporting causes on [Platform Name] for
                years, and I'm always impressed by the transparency and
                efficiency of the platform. It's truly a game-changer for
                philanthropy!<b>"</b> - Jane Smith, Donor
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
