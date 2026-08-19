import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Search,
  MapPin,
  ChevronRight,
  Utensils,
  Landmark,
  Leaf,
  Camera,
  Calendar,
  Eye,
  Filter,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* =========================================================
    IMPORT ASSET LOKAL
========================================================= */
import ubudFood from "../assets/ubud-food.jpg";
import exploreHero from "../assets/explore-hero.jpg";
import lawarBali from "../assets/lawar-bali.jpg";
import basaGenep from "../assets/basa-genep.jpg";
import jatiluwih from "../assets/jatiluwih.jpg";
import megibung from "../assets/megibung.jpg";
import jajeBali from "../assets/jaje-bali.jpg";

/* =========================================================
    KONFIGURASI MAP
========================================================= */

const BALI_CENTER = [-8.4095, 115.1889];
const DEFAULT_ZOOM = 9;

/* =========================================================
    DATA GASTRONOMI BALI
========================================================= */

const GASTRONOMY_DATA = [
  {
    id: "1",
    name: "Desa Wisata Gastronomi Ubud",
    location: "Ubud, Gianyar",
    category: "Destinasi",
    description:
      "Pusat wisata kuliner tradisi dan pertanian organik berbasis nilai kearifan lokal Bali.",
    image: ubudFood,
    views: 324,
    latitude: -8.5069,
    longitude: 115.2625,
  },

  {
    id: "2",
    name: "Desa Penglipuran",
    location: "Bangli, Bali",
    category: "Budaya",
    description:
      "Desa adat yang masih menjaga kelestarian budaya, arsitektur tradisional, dan kuliner khas Bali.",
    image: exploreHero,
    views: 189,
    latitude: -8.4346,
    longitude: 115.3549,
  },

  {
    id: "3",
    name: "Lawar Bali",
    location: "Gianyar, Bali",
    category: "Kuliner",
    description:
      "Hidangan tradisional Bali yang kaya rempah dan sarat makna kebersamaan budaya.",
    image: lawarBali,
    views: 245,
    latitude: -8.544,
    longitude: 115.325,
  },

  {
    id: "4",
    name: "Base Genep Bali",
    location: "Seluruh Bali",
    category: "Bahan",
    description:
      "Racikan bumbu dasar khas Bali dari 15 jenis rempah pilihan warisan leluhur.",
    image: basaGenep,
    views: 412,
    latitude: -8.4095,
    longitude: 115.1889,
  },

  {
    id: "5",
    name: "Jatiluwih Rice Terraces",
    location: "Tabanan, Bali",
    category: "Destinasi",
    description:
      "Kawasan subak terasering yang merepresentasikan lanskap budaya dan sistem pertanian tradisional Bali.",
    image: jatiluwih,
    views: 520,
    latitude: -8.3675,
    longitude: 115.132,
  },

  {
    id: "6",
    name: "Upacara Megibung",
    location: "Karangasem, Bali",
    category: "Budaya",
    description:
      "Tradisi makan bersama dalam satu wadah sebagai bentuk syukur dan kebersamaan.",
    image: megibung,
    views: 290,
    latitude: -8.448,
    longitude: 115.6108,
  },

  {
    id: "7",
    name: "Festival Kuliner Pesisir Sanur",
    location: "Denpasar, Bali",
    category: "Agenda",
    description:
      "Agenda kuliner yang memperkenalkan hidangan laut khas kawasan pesisir Bali.",
    image: jajeBali,
    views: 310,
    latitude: -8.7075,
    longitude: 115.2625,
  },
];

/* =========================================================
    KATEGORI
========================================================= */

const CATEGORIES = [
  {
    name: "Semua",
    icon: Filter,
  },
  {
    name: "Kuliner",
    icon: Utensils,
  },
  {
    name: "Budaya",
    icon: Landmark,
  },
  {
    name: "Bahan",
    icon: Leaf,
  },
  {
    name: "Destinasi",
    icon: Camera,
  },
  {
    name: "Agenda",
    icon: Calendar,
  },
];

/* =========================================================
    WARNA MARKER
========================================================= */

const getMarkerColor = (category) => {
  switch (category) {
    case "Kuliner":
      return "#D97706";

    case "Budaya":
      return "#9333EA";

    case "Bahan":
      return "#059669";

    case "Destinasi":
      return "#0284C7";

    case "Agenda":
      return "#E11D48";

    default:
      return "#3B1E14";
  }
};

/* =========================================================
    ROUTE DETAIL BERDASARKAN KATEGORI
========================================================= */

const getDetailPath = (item) => {
  switch (item.category) {
    case "Kuliner":
      return `/culinary/${item.id}`;

    case "Budaya":
      return `/culture/${item.id}`;

    case "Bahan":
      return `/ingredient/${item.id}`;

    case "Destinasi":
      return `/destination/${item.id}`;

    case "Agenda":
      return `/agenda/${item.id}`;

    default:
      return "/explore";
  }
};

/* =========================================================
    CUSTOM MARKER
========================================================= */

const createMarkerIcon = (category) => {
  const color = getMarkerColor(category);

  return L.divIcon({
    className: "custom-gastronomy-marker",

    html: `
      <div
        style="
          width: 34px;
          height: 34px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div
          style="
            width: 9px;
            height: 9px;
            background: white;
            border-radius: 50%;
          "
        ></div>
      </div>
    `,

    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
};

/* =========================================================
    MAP CONTROLLER
========================================================= */

function MapController({ data, resetTrigger }) {
  const map = useMap();

  /* Reset ke posisi awal */

  useEffect(() => {
    map.setView(BALI_CENTER, DEFAULT_ZOOM);
  }, [resetTrigger, map]);

  /* Menyesuaikan map dengan hasil filter */

  useEffect(() => {
    if (data.length === 0) {
      map.setView(BALI_CENTER, DEFAULT_ZOOM);
      return;
    }

    if (data.length === 1) {
      map.setView(
        [data[0].latitude, data[0].longitude],
        12
      );
      return;
    }

    const bounds = L.latLngBounds(
      data.map((item) => [
        item.latitude,
        item.longitude,
      ])
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 11,
    });
  }, [data, map]);

  return null;
}

/* =========================================================
    MAP PAGE
========================================================= */

export default function MapPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Semua");

  const [resetTrigger, setResetTrigger] = useState(0);

  /* =====================================================
     FILTER DATA
  ===================================================== */

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return GASTRONOMY_DATA.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "Semua" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  /* =====================================================
     BADGE CATEGORY
  ===================================================== */

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Kuliner":
        return "bg-amber-100 text-amber-800 border-amber-200";

      case "Budaya":
        return "bg-purple-100 text-purple-800 border-purple-200";

      case "Bahan":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";

      case "Destinasi":
        return "bg-sky-100 text-sky-800 border-sky-200";

      case "Agenda":
        return "bg-rose-100 text-rose-800 border-rose-200";

      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  /* =====================================================
     RESET
  ===================================================== */

  const handleResetMap = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF9] text-gray-800">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="flex-1">

        <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-6">

            <h1 className="text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
              Peta Gastronomi Bali
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Jelajahi aset dan destinasi gastronomi
              berdasarkan lokasi.
            </p>

          </div>

          {/* =================================================
              SEARCH & FILTER
          ================================================= */}

          <div className="mb-5 flex flex-col gap-3 sm:flex-row">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Cari destinasi, kuliner, atau daerah..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  shadow-sm
                  outline-none
                  transition
                  focus:border-[#3B1E14]
                  focus:ring-1
                  focus:ring-[#3B1E14]
                "
              />

            </div>

            {/* FILTER */}

            <div className="relative sm:w-48">

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  pr-10
                  text-sm
                  font-medium
                  text-gray-700
                  shadow-sm
                  outline-none
                  focus:border-[#3B1E14]
                "
              >

                {CATEGORIES.map((category) => (
                  <option
                    key={category.name}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}

              </select>

              <ChevronRight
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  rotate-90
                  text-gray-500
                "
              />

            </div>

          </div>

          {/* =================================================
              RESULT INFO
          ================================================= */}

          <div className="mb-4 flex items-center justify-between">

            <p className="text-xs text-gray-500">

              Menampilkan{" "}

              <span className="font-semibold text-[#3B1E14]">
                {filteredData.length}
              </span>{" "}

              aset gastronomi

            </p>

            {(searchQuery ||
              selectedCategory !== "Semua") && (

              <button
                onClick={handleResetMap}
                className="
                  text-xs
                  font-semibold
                  text-[#3B1E14]
                  hover:underline
                "
              >
                Reset pencarian
              </button>

            )}

          </div>

          {/* =================================================
              MAP
          ================================================= */}

          <div
            className="
              relative
              mb-10
              h-[520px]
              w-full
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-[#E5ECE9]
              shadow-md
            "
          >

            <MapContainer
              center={BALI_CENTER}
              zoom={DEFAULT_ZOOM}
              scrollWheelZoom={true}
              className="h-full w-full"
            >

              {/* OPEN STREET MAP */}

              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* MAP CONTROLLER */}

              <MapController
                data={filteredData}
                resetTrigger={resetTrigger}
              />

              {/* =================================================
                  MARKER
              ================================================= */}

              {filteredData.map((item) => (

                <Marker
                  key={item.id}
                  position={[
                    item.latitude,
                    item.longitude,
                  ]}
                  icon={createMarkerIcon(item.category)}
                >

                  {/* =================================================
                      POPUP
                  ================================================= */}

                  <Popup
                    closeButton={true}
                    maxWidth={300}
                  >

                    <div className="w-[250px]">

                      {/* IMAGE */}

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          mb-3
                          h-32
                          w-full
                          rounded-lg
                          object-cover
                        "
                      />

                      {/* CATEGORY */}

                      <span
                        className={`
                          inline-block
                          rounded-md
                          border
                          px-2
                          py-1
                          text-[10px]
                          font-semibold
                          ${getCategoryBadgeColor(
                            item.category
                          )}
                        `}
                      >
                        {item.category}
                      </span>

                      {/* TITLE */}

                      <h3 className="
                        mt-2
                        text-sm
                        font-bold
                        leading-snug
                        text-[#3B1E14]
                      ">
                        {item.name}
                      </h3>

                      {/* LOCATION */}

                      <p className="
                        mt-1
                        flex
                        items-center
                        gap-1
                        text-xs
                        text-gray-500
                      ">

                        <MapPin size={12} />

                        {item.location}

                      </p>

                      {/* DESCRIPTION */}

                      <p className="
                        mt-2
                        text-xs
                        leading-relaxed
                        text-gray-600
                      ">
                        {item.description}
                      </p>

                      {/* VIEW */}

                      <div className="
                        mt-3
                        flex
                        items-center
                        gap-1
                        text-[11px]
                        text-gray-400
                      ">

                        <Eye size={12} />

                        {item.views} views

                      </div>

                      {/* DETAIL BUTTON */}

                      <button
                        onClick={() =>
                          navigate(getDetailPath(item))
                        }
                        className="
                          mt-3
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-1
                          rounded-lg
                          bg-[#3B1E14]
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-white
                          transition
                          hover:bg-[#2A150E]
                        "
                      >

                        Lihat Detail

                        <ChevronRight size={14} />

                      </button>

                    </div>

                  </Popup>

                </Marker>

              ))}

            </MapContainer>

            {/* =================================================
                LEGEND
            ================================================= */}

            <div
              className="
                absolute
                right-4
                top-4
                z-[1000]
                hidden
                rounded-xl
                border
                border-white
                bg-white/95
                p-3
                shadow-lg
                backdrop-blur
                sm:block
              "
            >

              <h4 className="
                mb-2
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-gray-500
              ">
                Kategori Aset
              </h4>

              <div className="space-y-2">

                {CATEGORIES
                  .filter(
                    (category) =>
                      category.name !== "Semua"
                  )
                  .map((category) => (

                    <div
                      key={category.name}
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-gray-700
                      "
                    >

                      <span
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            getMarkerColor(
                              category.name
                            ),
                        }}
                      />

                      {category.name}

                    </div>

                  ))}

              </div>

            </div>

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {filteredData.length === 0 && (

              <div
                className="
                  absolute
                  inset-0
                  z-[900]
                  flex
                  items-center
                  justify-center
                  bg-white/70
                  backdrop-blur-sm
                "
              >

                <div className="
                  rounded-2xl
                  bg-white
                  px-8
                  py-6
                  text-center
                  shadow-xl
                ">

                  <MapPin
                    size={30}
                    className="
                      mx-auto
                      mb-3
                      text-gray-400
                    "
                  />

                  <h3 className="
                    text-sm
                    font-bold
                    text-[#3B1E14]
                  ">
                    Tidak ada aset ditemukan
                  </h3>

                  <p className="
                    mt-1
                    text-xs
                    text-gray-500
                  ">
                    Coba gunakan kata kunci atau
                    kategori lain.
                  </p>

                  <button
                    onClick={handleResetMap}
                    className="
                      mt-4
                      rounded-lg
                      bg-[#3B1E14]
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      text-white
                      hover:bg-[#2A150E]
                    "
                  >
                    Reset Filter
                  </button>

                </div>

              </div>

            )}

          </div>

          {/* =================================================
              LIST ASET
          ================================================= */}

          <section>

            <div className="
              mb-4
              flex
              items-end
              justify-between
            ">

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-[#3B1E14]
                ">
                  Aset Gastronomi di Bali
                </h2>

                <p className="
                  mt-1
                  text-xs
                  text-gray-500
                ">
                  Beberapa aset gastronomi yang
                  dapat Anda jelajahi.
                </p>

              </div>

              <button
                onClick={() => navigate("/explore")}
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-xs
                  font-semibold
                  text-[#3B1E14]
                  hover:underline
                "
              >

                Lihat semua

                <ChevronRight size={14} />

              </button>

            </div>

            {/* =================================================
                CARD GRID
            ================================================= */}

            <div className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            ">

              {filteredData
                .slice(0, 4)
                .map((item) => (

                  <div
                    key={item.id}
                    onClick={() =>
                      navigate(getDetailPath(item))
                    }
                    className="
                      group
                      cursor-pointer
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-100
                      bg-white
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-md
                    "
                  >

                    {/* IMAGE */}

                    <div className="
                      relative
                      h-44
                      w-full
                      overflow-hidden
                      bg-gray-100
                    ">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <span
                        className={`
                          absolute
                          left-3
                          top-3
                          rounded-md
                          border
                          px-2
                          py-1
                          text-[10px]
                          font-semibold
                          ${getCategoryBadgeColor(
                            item.category
                          )}
                        `}
                      >
                        {item.category}
                      </span>

                    </div>

                    {/* CONTENT */}

                    <div className="p-4">

                      <h3 className="
                        line-clamp-1
                        font-bold
                        text-gray-900
                        group-hover:text-[#3B1E14]
                      ">
                        {item.name}
                      </h3>

                      <p className="
                        mt-1
                        flex
                        items-center
                        gap-1
                        text-xs
                        text-gray-500
                      ">

                        <MapPin size={12} />

                        {item.location}

                      </p>

                      <p className="
                        mt-2
                        line-clamp-2
                        text-xs
                        leading-relaxed
                        text-gray-600
                      ">
                        {item.description}
                      </p>

                      {/* FOOTER CARD */}

                      <div className="
                        mt-4
                        flex
                        items-center
                        justify-between
                        border-t
                        border-gray-100
                        pt-3
                      ">

                        <span className="
                          flex
                          items-center
                          gap-1
                          text-[11px]
                          text-gray-400
                        ">

                          <Eye size={12} />

                          {item.views} views

                        </span>

                        <span className="
                          inline-flex
                          items-center
                          gap-1
                          text-xs
                          font-semibold
                          text-[#3B1E14]
                          transition-transform
                          group-hover:translate-x-0.5
                        ">

                          Lihat Detail

                          <ChevronRight size={14} />

                        </span>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          </section>

        </div>

      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>
  );
}