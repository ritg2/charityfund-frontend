import { useLoaderData } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import DonationHistory from "../components/DonationHistory";
import Campaign from "../components/Campaign";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPenToSquare,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Profile() {
  const { data, data1 } = useLoaderData();

  const role =
    data.role === "ngo"
      ? data.role.toUpperCase()
      : data.role.charAt(0).toUpperCase() + data.role.slice(1);

  // useEffect(() => {
  //   axiosInstance.get(``)
  // })
  console.log(data1);
  return (
    <div className="dark:bg-dark-cyan-dark">
      <section className="text-center">
        <h1 className="pt-10 text-2xl dark:text-white">{role} profile</h1>
        <img
          src={data.profile_picture.url}
          alt=""
          className="h-[100px] w-[100px] rounded-full object-cover mx-auto"
        />
        <p className="pb-4 dark:text-white">{data.fullname}</p>
        <p className="dark:text-white">
          Passionate donor supporting various educational and healthcare
          initiatives worldwide.
        </p>
      </section>

      <section>
        <div className="p-2">
          <h2 className="px-2 mt-2 mb-2 text-xl dark:text-white">
            Donation History
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {data1.length === 0 ? (
              <p className="m-8 dark:text-white">No bookmarked campaigns</p>
            ) : (
              data1.map((item) => (
                <DonationHistory key={item._id} data={item} />
              ))
            )}

            {/* <DonationHistory />
            <DonationHistory /> */}
          </div>
        </div>
      </section>

      <section>
        <div className="p-2">
          <h2 className="px-2 mt-2 mb-2 text-xl dark:text-white">
            Bookmarked Donations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {data.savedCampaigns.length === 0 ? (
              <p className="m-8 dark:text-white">No bookmarked campaigns</p>
            ) : (
              data.savedCampaigns.map((items) => (
                <Campaign key={items._id} data={items} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center py-10">
        <button className="p-2 text-white rounded-full w-[280px] mt-2 bg-cyan hover:bg-white hover:text-cyan">
          <FontAwesomeIcon icon={faPenToSquare} />
          <span> update personal information</span>
        </button>
        <button className="p-2 text-white rounded-full w-[280px] mt-2 bg-cyan hover:bg-white hover:text-cyan">
          <FontAwesomeIcon icon={faBell} />
          <span> Notification Preferences</span>
        </button>
        <button className="p-2 text-white rounded-full w-[280px] mt-5 bg-red-600 hover:bg-white hover:text-cyan">
          <FontAwesomeIcon icon={faRightToBracket} />
          <span> Logout</span>
        </button>
      </section>
    </div>
  );
}

export default Profile;

export const profileLoader = async ({ params }) => {
  const { profileId } = params;
  try {
    const [response, response1] = await Promise.all([
      axiosInstance.get(`api/v1/user/profile/${profileId}`),
      axiosInstance.get(`api/v1/donation?id=${profileId}`),
    ]);

    // Return the data from both responses
    return { data: response.data, data1: response1.data };
  } catch (error) {
    console.error(error);
    return { data: null, data1: null };
  }
};
