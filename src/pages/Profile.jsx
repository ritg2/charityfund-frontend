import { useLoaderData } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function Profile() {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div>
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>username</p>
          <h3>name</h3>
        </div>
      </div>
      <div>
        <p>email</p>
        <p>phone</p>
      </div>
    </div>
  );
}

export default Profile;

export const profileLoader = async ({ params }) => {
  const { profileId } = params;
  console.log(params)
  try {
    const response = axiosInstance.get(`api/v1/user/${profileId}`);
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
