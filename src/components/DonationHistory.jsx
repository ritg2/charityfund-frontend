import React from "react";

function DonationHistory({
  data: {
    amount,
    createdAt,
    campaign_id: { title, image },
  },
}) {

  const date = new Date(createdAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="p-2 bg-white rounded-lg shadow dark:bg-dark-black dark:text-white w-fit">
      <img
        src={image.url}
        alt=""
        className="rounded-lg object-cover w-[200px] h-[200px]"
      />
      <p className="font-semibold">{title}</p>
      <p className="text-sm">Donation of ₦{amount}</p>
      <p className="text-sm">{date}</p>
    </div>
  );
}

export default DonationHistory;
