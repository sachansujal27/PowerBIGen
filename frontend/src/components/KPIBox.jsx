import React from "react";

const KPIBox = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h3 className="text-gray-500 text-lg">{title}</h3>

      <h1 className="text-3xl font-bold mt-2">{value}</h1>
    </div>
  );
};

export default KPIBox;
