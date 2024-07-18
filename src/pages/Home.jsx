import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Campaign from "../components/Campaign";

function Home() {
  const [campaign, setCampaign] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/campaign?limit=3")
      .then((response) => setCampaign(response.data.campaign))
      .catch((error) => console.log(error));
  }, []);

  const renderCampaigns = campaign.map((campaign) => {
    return <Campaign key={campaign._id} data={campaign} />;
  });

  return (
    <div>
      <section>
        <div className="hero-wrapper">
          <div className="hero">
            <h1>Join Us in Making a Difference</h1>
            <h2>Empower Change Through Giving</h2>
            <button><Link to="/campaigns" >Donate Now </Link></button>
            <button>
              <Link to="/createcampaign">Start Fundraising</Link>
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="featured-campaigns">
          <h2>Featured Campaigns</h2>
          <div className="campaigns">{renderCampaigns}</div>
          <button>Browse Campaigns</button>
        </div>
      </section>
      <hr />
      <section>
        <div className="testimonials-wrapper">
          <h2>Testimonials</h2>
          <div className="testimonials">
            <div className="testimonial">
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
            <div className="testimonial">
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
