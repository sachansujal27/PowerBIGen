import React from "react";

const DashboardCard = ({ title, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition"
    >
      <img src={image} alt={title} className="w-full h-52 object-cover" />

      <div className="p-4">
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
    </div>
  );
};

export default DashboardCard;
