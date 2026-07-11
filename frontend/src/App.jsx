// import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";

// export default function App() {
//   return (
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             background: "#1e293b",
//             color: "#e2e8f0",
//             border: "1px solid #334155",
//           },
//         }}
//       />
//       <Navbar />
//       {/* <Routes>
//   <Route path="" element={}/>
// </Routes> */}
//       {/* <Dashboard /> */}
//     </>
//   );
// }
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Templates from "./pages/Templates";

import BusinessMain from "./pages/Businessmain";
import AutoGraphDashboard from "./pages/AutoGraphDashboard";
import Choicebusiness from "./components/Choicebusiness";
import BusinessDashboard from "./components/BusinessDashboard";
import DashboardTemplates from "./pages/DashboardTemplates";
import DashboardBuilder from "./pages/DashboardBuilder";
import GeneratedDashboard from "./pages/GeneratedDashboard";
// import ReportsSupportCenter from "./pages/Report";
import SupportPage from "./pages/SupportPage";
import UploadDashboard from "./pages/UploadDashboard";
import TemplateSelection from "./pages/TemplateSelection";
import DashboardView from "./pages/DashboardView";
import Homes from "./pages/Homes";
import Navbar from "./components/Navbar";
import AutoDashboard from "./pages/AutoDashboard";
import ExcelDataManager from "./pages/ExcelDataManager";
import HeroVideo from "./pages/HeroVideo";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Herovideo" element={<HeroVideo />} />

      <Route path="templates" element={<Templates />} />

      <Route path="/Homes" element={<Homes />} />
      <Route path="/homes" element={<Homes />} />

      <Route path="/business-main" element={<BusinessMain />} />

      <Route path="/ai-visualization" element={<AutoGraphDashboard />} />

      <Route path="/choice-business" element={<Choicebusiness />} />

      <Route path="/business-dashboard" element={<BusinessDashboard />} />

      <Route path="/templates" element={<DashboardTemplates />} />

      <Route path="/builder" element={<DashboardBuilder />} />

      <Route path="/dashboard" element={<GeneratedDashboard />} />
      <Route path="/supportPage" element={<SupportPage />} />
      {/* <Route path="/Report" element={<ReportsSupportCenter />} /> */}
      <Route path="/upload" element={<UploadDashboard />} />

      <Route path="/templates" element={<TemplateSelection />} />

      <Route path="/dashboard" element={<DashboardView />} />
      <Route path="/auto-dashboard" element={<AutoDashboard />} />
      <Route path="/excel-data-manager" element={<ExcelDataManager />} />
    </Routes>
  );
}
