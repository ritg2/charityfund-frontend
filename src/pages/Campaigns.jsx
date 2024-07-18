import axios from "axios";
import { useEffect, useState } from "react";
import Campaign from "../components/Campaign";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/campaign")
      .then((response) => {
        setCampaigns(response.data.campaign);
      })
      .catch((error) => console.log(error));
  }, []);

  const campaign = campaigns.map((campaign) => {
    return <Campaign key={campaign._id} data={campaign} />;
  });

  return (
    <div className="featured-campaigns" style={{padding: "80px"}}>
      <h1>Campaigns</h1>
      <section>
        <div className="campaigns">{campaign}</div>
      </section>
    </div>
  );
}

export default Campaigns;
