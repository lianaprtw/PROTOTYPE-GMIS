import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Redirect langsung ke halaman home
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6">
      {/* Main Container */}
      <div className="flex w-full max-w-[1100px] items-center justify-center gap-24 bg-white px-16 py-14">
        
        {/* Logo Section */}
        <div className="flex flex-1 items-center justify-center">
          <img
            src={logo}
            alt="Gastro Pustaka"
            className="w-[330px] h-auto object-contain"
          />
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[390px] rounded-2xl bg-white px-10 py-10 shadow-[0_8px_30px_rgba(75,36,23,0.12)]">
          {/* Title */}
          <h1 className="text-center text-3xl font-bold text-black">
            Log in
          </h1>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-16">
            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full rounded-md border border-gray-200 px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6B2E1E] focus:ring-1 focus:ring-[#6B2E1E]"
              />
            </div>

            {/* Password */}
            <div className="relative mt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full rounded-md border border-gray-200 px-4 py-3.5 pr-11 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6B2E1E] focus:ring-1 focus:ring-[#6B2E1E]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#6B2E1E]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="mt-2 flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 transition hover:text-[#6B2E1E]"
              >
                Forget Password
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-[#6B2E1E] py-3 text-base font-semibold text-white transition hover:bg-[#542317]"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <p className="mt-8 text-center text-sm text-gray-800">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#6B2E1E] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;