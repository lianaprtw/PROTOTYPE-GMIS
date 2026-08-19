import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

const isLoggedIn = true;

const Footer = () => {
  return (
    <footer className="bg-[#4B2417] text-white">
      <div className="mx-auto max-w-[1200px] px-10 py-14">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* Logo & Description */}
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="Gastro Pustaka"
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              Menyatukan rasa, budaya, dan pengetahuan melalui
              dokumentasi serta informasi gastronomi Bali.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="mb-5 text-base font-semibold">
              Navigasi
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/70">

              <Link
                to="/"
                className="transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/explore"
                className="transition hover:text-white"
              >
                Explore
              </Link>

              <Link
                to="/map"
                className="transition hover:text-white"
              >
                Map
              </Link>

              {isLoggedIn && (
                <>
                  <Link
                    to="/submit-aset"
                    className="transition hover:text-white"
                  >
                    Submit Aset
                  </Link>

                  <Link
                    to="/my-submission"
                    className="transition hover:text-white"
                  >
                    My Submission
                  </Link>
                </>
              )}

            </div>
          </div>

          {/* Tentang */}
          <div>
            <h3 className="mb-5 text-base font-semibold">
              Tentang
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/70">

              <Link
                to="/tentang"
                className="transition hover:text-white"
              >
                Tentang Gastro Pustaka
              </Link>

              <Link
                to="/kontak"
                className="transition hover:text-white"
              >
                Kontak
              </Link>

              {isLoggedIn && (
                <Link
                  to="/account"
                  className="transition hover:text-white"
                >
                  Account
                </Link>
              )}

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/20" />

        {/* Copyright */}
        <div className="flex flex-col gap-2 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 Gastro Pustaka. Semua hak dilindungi.
          </p>

          <p>
            Menyatukan rasa, budaya & pengetahuan.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;