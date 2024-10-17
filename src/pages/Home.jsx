import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Campaign from "../components/Campaign";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

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
      <section className="dark:bg-dark-cyan-dark hero-section">
        <div className="container py-[50px] mx-auto transition-all delay-300 hero">
          <div className="flex flex-col items-center justify-center text-center ">
            <h1 className="pt-3 text-3xl font-bold dark:text-white">
              Join Us in Making a Difference
            </h1>
            <h2 className="pt-3 text-2xl font-bold dark:text-white">
              Empower Change Through Giving
            </h2>
            <div className="flex flex-col gap-2 pt-2 md:flex-row ">
              <Link
                className="p-2 text-white rounded-full bg-cyan hover:bg-white hover:text-cyan"
                to="/campaigns"
              >
                Donate Now
              </Link>

              <Link className="p-2 text-white rounded-full bg-cyan hover:bg-white hover:text-cyan">
                Start Fundraising
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="p-2 pb-5 dark:bg-dark-cyan-dark">
        <div className="featured-campaigns">
          <h2 className="p-2 text-xl font-bold text-center dark:text-white">
            Featured Campaigns
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 mx-auto">
            {loading ? (
              <div className="w-full text-center dark:text-white">
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
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <section className="dark:bg-dark-cyan-dark">
        <div className="p-6 text-center">
          <h2 className="p-2 text-xl font-bold dark:text-white">
            Testimonials
          </h2>
          <div className="items-center justify-center gap-3 md:flex">
            <div className="p-2 mb-3 bg-white rounded-xl dark:bg-dark-black dark:text-white">
              <p className="text-gold">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </p>
              <p>
                <b>"</b>Thanks to charityfund, we were able to raise enough
                funds to provide shelter for families affected by natural
                disasters. It's incredible to see the impact we can make
                together!<b>"</b> - Dwayne Johnson, Volunteer
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/dwayne-johnson-attends-the-jumanji-the-next-level-uk-film-news-photo-1575726701.jpg?resize=640:*"
                  alt=""
                  className="w-[60px] h-[60px] object-cover rounded-full mx-auto p-2"
                />
              </p>
            </div>
            <div className="p-2 bg-white rounded-xl dark:bg-dark-black dark:text-white">
              <p className="text-gold">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </p>
              <p>
                <b>"</b>I've been supporting causes on charityfund for years,
                and I'm always impressed by the transparency and efficiency of
                the platform. It's truly a game-changer for philanthropy!
                <b>"</b> - Elon Musk, Volunteer
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg"
                  alt=""
                  className="w-[60px] h-[60px] object-cover rounded-full mx-auto p-2"
                />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
