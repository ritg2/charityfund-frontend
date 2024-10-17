import React from "react";
import axiosInstance from "../utils/axiosInstance";
import { useLoaderData } from "react-router-dom";

function Dashboard() {
  const { data } = useLoaderData();

  const downloadPdf = (url) => {
    // using Java Script method to get PDF file
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);

        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "CAS Certificate.pdf";
        alink.click();
      });
    });
  };

  const approveNgo = async (id) => {
    try {
      axiosInstance.post(
        `http://localhost:5000/api/v1/organization/approve/${id}`
      );
      alert("Succesfully Approved NGO");
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pb-20 dark:text-white">
      <h1 className="pt-10 text-2xl text-center dark:text-white">
        Admin Dashboard
      </h1>
      <h2 className="px-2 mt-2 mb-2 text-xl text-center dark:text-white">
        NGO's pending approval
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {data.length === 0 ? (
          <p className="px-2 mt-8 mb-2 text-center dark:text-white">
            No NGO awaiting for aproval
          </p>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className="p-2 bg-white rounded-lg shadow dark:bg-dark-black dark:text-white w-fit"
            >
              <img
                src={item.logoUrl.url}
                alt=""
                className="rounded-lg object-cover w-auto h-[150px]"
              />
              <p className="font-semibold">{item.organizationName}</p>
              {/* <p className="text-sm">Donation of $100</p> */}
              <p className="text-sm">Date: 2023-02-15</p>
              <div className="flex flex-col">
                <button className="w-full p-2 mt-4 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark">
                  View NGO
                </button>
                <button
                  className="w-full p-2 mt-2 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
                  onClick={() => downloadPdf(item.casCertificate.url)}
                >
                  Download CAC{" "}
                </button>
                <button
                  className="w-full p-2 mt-2 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark"
                  onClick={() => approveNgo(item._id)}
                >
                  Approve NGO
                </button>
                <button className="w-full p-2 mt-2 text-center text-white rounded-lg cursor-pointer bg-cyan hover:bg-cyan-dark">
                  Decline NGO
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

export async function dashboardLoader() {
  try {
    const response = axiosInstance.get(`api/v1/organization`);
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}
