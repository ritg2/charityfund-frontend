import { useEffect, useState } from "react";
import Campaign from "../components/Campaign";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";

function Campaigns() {
  const [campaigns, setCampaigns] = useState({ campaign: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search } = useLocation();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/v1/campaign${search}`)
      .then((response) => {
        setCampaigns((prev) => ({ ...prev, ...response.data }));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("failed to load campaign");
      });
  }, [search]);

  const campaign =
    campaigns.campaign.length === 0 ? (
      <p>No campaign</p>
    ) : (
      campaigns.campaign.map((campaign) => {
        return <Campaign key={campaign._id} data={campaign} />;
      })
    );

  return (
    <div className="p-2 mt-12 featured-campaigns">
      <h1 className="p-2 pt-3 mt-6 text-3xl font-semibold text-center">
        Search campaigns on CharityFund
      </h1>
      <SearchBar />
      <section>
        <div className="flex-wrap items-center justify-center gap-2 md:flex">
          {loading ? (
            <div className="w-full text-center">
              <FontAwesomeIcon icon={faSpinner} className="m-auto spinner" />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            campaign
          )}
        </div>
      </section>
      <div className="flex justify-center gap-4 p-2">
        {campaigns.currentPage > 1 && (
          <Link
            to={`/campaigns?page=${campaigns.currentPage - 1}`}
            className="p-2 text-white rounded-lg bg-cyan hover:bg-cyan-dark"
          >
            <FontAwesomeIcon icon={faBackwardStep} /> Previous
          </Link>
        )}
        {campaigns.numOfpages > 1 && (
          <Link
            to={`/campaigns?page=${campaigns.currentPage + 1}`}
            className="p-2 text-white rounded-lg bg-cyan hover:bg-cyan-dark"
          >
            Next <FontAwesomeIcon icon={faForwardStep} />
          </Link>
        )}
      </div>
      <p className="text-sm text-gray-300 text-end">
        page {campaigns.currentPage} of {campaigns.numOfpages}
      </p>
    </div>
  );
}

export default Campaigns;
