import React, { useState } from "react";
import UploadData from "../components/UploadData";
import BusinessDashboard from "../components/BusinessDashboard";

const BusinessMain = () => {
  const [refresh, setRefresh] = useState(0);
  const [screen, setScreen] = useState("choice");
  const [businessName, setBusinessName] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const getAllBusinesses = () => {
    const saved = localStorage.getItem("businessList");
    return saved ? JSON.parse(saved) : [];
  };

  const [businessList, setBusinessList] = useState(getAllBusinesses());

  const saveBusinessList = (list) => {
    localStorage.setItem("businessList", JSON.stringify(list));
    setBusinessList(list);
  };

  const handleCreateBusiness = () => {
    if (!businessName.trim()) {
      alert("Enter business name");
      return;
    }

    const exists = businessList.find(
      (b) => b.name.toLowerCase() === businessName.toLowerCase(),
    );

    if (exists) {
      alert("Business already exists");
      return;
    }

    const newBusiness = {
      id: Date.now(),
      name: businessName,
      data: [],
    };

    const updatedList = [...businessList, newBusiness];
    saveBusinessList(updatedList);

    setSelectedBusiness(newBusiness);
    setScreen("dashboard");
    setBusinessName("");
  };

  const handleOpenBusiness = (business) => {
    setSelectedBusiness(business);
    setScreen("dashboard");
  };

  const handleDataSaved = (newData) => {
    const updatedBusiness = {
      ...selectedBusiness,
      data: [...selectedBusiness.data, newData],
    };

    const updatedList = businessList.map((b) =>
      b.id === selectedBusiness.id ? updatedBusiness : b,
    );

    saveBusinessList(updatedList);
    setSelectedBusiness(updatedBusiness);
    setRefresh((prev) => prev + 1);
  };

  const handleDeleteRow = (index) => {
    const updatedData = selectedBusiness.data.filter((_, i) => i !== index);

    const updatedBusiness = {
      ...selectedBusiness,
      data: updatedData,
    };

    const updatedList = businessList.map((b) =>
      b.id === selectedBusiness.id ? updatedBusiness : b,
    );

    saveBusinessList(updatedList);
    setSelectedBusiness(updatedBusiness);
    setRefresh((prev) => prev + 1);
  };

  const Wrapper = ({ children }) => (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Businesses</p>
          <h2 className="text-3xl font-bold text-cyan-400">
            {businessList.length}
          </h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Analytics</p>
          <h2 className="text-3xl font-bold text-green-400">Active</h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Reports</p>
          <h2 className="text-3xl font-bold text-purple-400">AI</h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Status</p>
          <h2 className="text-3xl font-bold text-yellow-400">Online</h2>
        </div>
      </div>

      {children}
    </div>
  );

  const Card = ({ children }) => (
    <div className="max-w-lg mx-auto bg-slate-800 border border-slate-700 rounded-3xl p-8">
      {children}
    </div>
  );

  const Button = ({ children, onClick, type = "blue" }) => {
    const styles = {
      blue: "bg-cyan-600 hover:bg-cyan-700",
      green: "bg-green-600 hover:bg-green-700",
      red: "bg-red-600 hover:bg-red-700",
    };

    return (
      <button
        onClick={onClick}
        className={`w-full py-3 rounded-xl font-semibold text-white transition ${styles[type]}`}
      >
        {children}
      </button>
    );
  };

  /* ======================
        CHOICE SCREEN
     ====================== */

  if (screen === "choice") {
    return (
      <Wrapper>
        <Card>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Select User Type
          </h2>

          <div className="space-y-4">
            <Button type="green" onClick={() => setScreen("new")}>
              Create New Business
            </Button>

            <Button type="blue" onClick={() => setScreen("old")}>
              Open Existing Business
            </Button>
          </div>
        </Card>
      </Wrapper>
    );
  }

  /* ======================
        NEW BUSINESS
     ====================== */

  if (screen === "new") {
    return (
      <Wrapper>
        <Card>
          <h2 className="text-3xl font-bold text-white mb-6">
            Create Business
          </h2>

          <input
            type="text"
            placeholder="Enter Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white mb-4"
          />

          <div className="space-y-3">
            <Button type="green" onClick={handleCreateBusiness}>
              Create Business
            </Button>

            <Button type="red" onClick={() => setScreen("choice")}>
              Back
            </Button>
          </div>
        </Card>
      </Wrapper>
    );
  }

  /* ======================
        OLD BUSINESS
     ====================== */

  if (screen === "old") {
    return (
      <Wrapper>
        <Card>
          <h2 className="text-3xl font-bold text-white mb-6">
            Existing Businesses
          </h2>

          {businessList.length === 0 ? (
            <p className="text-slate-400 text-center">No Business Found</p>
          ) : (
            <div className="space-y-3">
              {businessList.map((business) => (
                <Button
                  key={business.id}
                  type="blue"
                  onClick={() => handleOpenBusiness(business)}
                >
                  {business.name}
                </Button>
              ))}
            </div>
          )}

          <div className="mt-4">
            <Button type="red" onClick={() => setScreen("choice")}>
              Back
            </Button>
          </div>
        </Card>
      </Wrapper>
    );
  }

  /* ======================
          DASHBOARD
     ====================== */

  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          {selectedBusiness?.name}
        </h2>

        <button
          onClick={() => setScreen("choice")}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white"
        >
          Change User
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 mb-6">
        <UploadData onDataSaved={handleDataSaved} userType="new" />
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
        <BusinessDashboard
          refresh={refresh}
          userType="new"
          newUserData={selectedBusiness?.data || []}
          onDeleteNewUserRow={handleDeleteRow}
        />
      </div>
    </Wrapper>
  );
};

export default BusinessMain;
