import { useNavigate } from "react-router-dom";

export default function AuthModal() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-slate-900 border border-yellow-400 rounded-3xl p-10 w-[420px] text-center shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-3">
          Welcome to PowerBIGen
        </h1>

        <p className="text-gray-300 mb-8">
          Please Login or Create an Account to continue.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-4 rounded-xl bg-yellow-400 text-black font-bold mb-4 hover:bg-yellow-300"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500"
        >
          Register
        </button>
      </div>
    </div>
  );
}
