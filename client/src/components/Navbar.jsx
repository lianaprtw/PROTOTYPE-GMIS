import { NavLink, Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import logo from "../assets/Logo.png";

const isLoggedIn = true;

const publicNavItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Map", path: "/map" },
];

const loggedInNavItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Map", path: "/map" },
  { name: "Submit Aset", path: "/submit-asset" },
  { name: "My Submission", path: "/my-submission" },
  { name: "AI Assistant", path: "/ai" },
  { name: "Molecular Gastronomy", path: "/molecular" },
  { name: "Digital Culinary", path: "/digital-culinary" },

];

const Navbar = () => {
  const navItems = isLoggedIn
    ? loggedInNavItems
    : publicNavItems;

  return (
    <nav className="w-full bg-white px-10 py-3">
      <div className="mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Gastro Pustaka"
            className="h-9 w-auto"
          />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-2 text-base transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-[#4B2417] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#4B2417]"
                    : "font-medium text-[#4B2417]/60 hover:text-[#4B2417]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Authentication */}
        {!isLoggedIn ? (
          <Link
            to="/login"
            className="rounded-lg bg-[#6B2E1E] px-6 py-1.5 text-base font-semibold text-white transition hover:bg-[#542317]"
          >
            Log In
          </Link>
        ) : (
          <Link
            to="/profile"
            aria-label="Profile"
            title="Profile"
            className="text-[#4B2417]/70 transition hover:text-[#4B2417]"
          >
            <CircleUserRound size={30} strokeWidth={1.8} />
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;