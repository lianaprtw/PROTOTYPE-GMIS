import { useState } from "react";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CulinaryCard from "../components/CulinaryCard";
import AgendaCard from "../components/AgendaCard";

import lawarBali from "../assets/lawar-bali.jpg";
import megibung from "../assets/megibung.jpg";
import bebekBetutu from "../assets/bebek-betutu.jpeg";
import jajeBali from "../assets/jaje-bali.jpg";

/* =====================================================
   CULINARY DATA
===================================================== */

const culinaryData = [
  {
    id: "lawar-bali",
    title: "Lawar Bali",
    category: "Culinary",
    image: lawarBali,
    description:
      "Hidangan tradisional Bali yang kaya akan rempah dan memiliki makna budaya yang mendalam.",
    date: "12 Mei 2024",
    views: 245,
  },
  {
    id: "upacara-megibung",
    title: "Upacara Megibung",
    category: "Culture",
    image: megibung,
    description:
      "Tradisi makan bersama sebagai bentuk syukur dan mempererat tali persaudaraan.",
    date: "10 Mei 2024",
    views: 189,
  },
  {
    id: "bebek-betutu",
    title: "Bebek Betutu",
    category: "Ingredient",
    image: bebekBetutu,
    description:
      "Authentic Gilimanuk-style Betutu Duck recipe made with rich, perfectly infused base genep spices.",
    date: "May 8, 2024",
    views: 321,
  },
  {
    id: "jaje-bali",
    title: "Proses Pembuatan Jaje Bali",
    category: "Multimedia",
    image: jajeBali,
    description:
      "Video dokumentasi proses pembuatan jaje tradisional Bali yang autentik.",
    date: "6 Mei 2024",
    views: 156,
  },
];

/* =====================================================
   AGENDA DATA
===================================================== */

const agendaData = [
  {
    id: "ubud-food-festival",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
    category: "FESTIVAL",
    title: "Ubud Food Festival",
    location: "Ubud Palace",
    description:
      "Festival yang menghadirkan hidangan tradisional serta demonstrasi memasak.",
  },
  {
    id: "traditional-cooking-workshop",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    category: "WORKSHOP",
    title: "Traditional Cooking Workshop",
    location: "Ubud, Bali",
    description:
      "Workshop memasak yang memperkenalkan teknik dan resep tradisional Bali.",
  },
  {
    id: "bali-culinary-festival",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=600&q=80",
    category: "FESTIVAL",
    title: "Bali Culinary Festival",
    location: "Denpasar",
    description:
      "Perayaan kuliner yang menampilkan berbagai makanan khas dari Bali.",
  },
  {
    id: "pameran-warisan-kuliner",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    category: "PAMERAN",
    title: "Pameran Warisan Kuliner",
    location: "Denpasar Art Center",
    description:
      "Pameran yang mendokumentasikan kekayaan kuliner dan budaya Bali.",
  },
];

/* =====================================================
   MONTH
===================================================== */

const monthNames = [
  "JANUARI",
  "FEBRUARI",
  "MARET",
  "APRIL",
  "MEI",
  "JUNI",
  "JULI",
  "AGUSTUS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DESEMBER",
];

/* =====================================================
   HOME
===================================================== */

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/culinary/${id}`);
  };

  const handleAgendaClick = (id) => {
    navigate(`/agenda/${id}`);
  };

  /* =====================================================
     SEARCH
  ====================================================== */

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/explore");
    }
  };

  /* =====================================================
     SPESIAL UNTUK KAMU
  ====================================================== */

  const [specialIndex, setSpecialIndex] = useState(0);

  const handleSpecialPrev = () => {
    setSpecialIndex((current) =>
      current === 0 ? culinaryData.length - 1 : current - 1
    );
  };

  const handleSpecialNext = () => {
    setSpecialIndex((current) =>
      current === culinaryData.length - 1 ? 0 : current + 1
    );
  };

  /* =====================================================
     EKSPLORASI GASTRONOMI
  ====================================================== */

  const [activeFilter, setActiveFilter] = useState("Semua");
  const [exploreIndex, setExploreIndex] = useState(0);

  const categoryMap = {
    Kuliner: "Culinary",
    Bahan: "Ingredient",
    Budaya: "Culture",
  };

  const filteredExploreData =
    activeFilter === "Semua"
      ? culinaryData
      : activeFilter === "Festival"
        ? []
        : culinaryData.filter(
            (item) => item.category === categoryMap[activeFilter]
          );

  const handleExplorePrev = () => {
    if (filteredExploreData.length <= 1) return;

    setExploreIndex((current) =>
      current === 0
        ? filteredExploreData.length - 1
        : current - 1
    );
  };

  const handleExploreNext = () => {
    if (filteredExploreData.length <= 1) return;

    setExploreIndex((current) =>
      current === filteredExploreData.length - 1
        ? 0
        : current + 1
    );
  };

  /* =====================================================
     KONTEN BARU
  ====================================================== */

  const [newContentIndex, setNewContentIndex] = useState(0);

  const handleNewContentPrev = () => {
    setNewContentIndex((current) =>
      current === 0 ? culinaryData.length - 1 : current - 1
    );
  };

  const handleNewContentNext = () => {
    setNewContentIndex((current) =>
      current === culinaryData.length - 1 ? 0 : current + 1
    );
  };

  /* =====================================================
     CALENDAR
  ====================================================== */

  const [calendarDate, setCalendarDate] = useState(
    new Date(2026, 6, 1)
  );

  const currentMonth = calendarDate.getMonth();
  const currentYear = calendarDate.getFullYear();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDayOfMonth =
    new Date(currentYear, currentMonth, 1).getDay() || 7;

  const handlePreviousMonth = () => {
    setCalendarDate(
      new Date(currentYear, currentMonth - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCalendarDate(
      new Date(currentYear, currentMonth + 1, 1)
    );
  };

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="bg-white">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[#6B2E1E]">

          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=80"
            alt="Kuliner Bali"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#4B2417]/55" />

          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-10 py-20">

            <div className="max-w-[850px]">

              <p className="mb-4 text-lg font-medium text-[#F4C542]">
                Warisan Gastronomi Bali
              </p>

              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                Mengenal Bali Melalui{" "}
                <span className="text-[#F4C542]">
                  Rasa dan Tradisi
                </span>
              </h1>

              <p className="mt-4 max-w-[700px] text-base leading-6 text-white/90 md:text-lg">
                Eksplorasi kuliner khas Bali, sejarah, filosofi,
                serta budaya yang diwariskan dari generasi ke generasi.
              </p>

              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="mt-10 flex max-w-[650px] overflow-hidden rounded-lg bg-white shadow-lg"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Cari kuliner, resep, daerah, atau budaya..."
                  className="flex-1 px-5 py-4 text-sm text-gray-700 outline-none"
                />

                <button
                  type="submit"
                  className="flex items-center justify-center px-5 text-[#4B2417] transition hover:bg-[#F6F0ED]"
                  aria-label="Cari"
                >
                  <Search size={24} strokeWidth={2.5} />
                </button>
              </form>

            </div>
          </div>
        </section>

        {/* =====================================================
            SPESIAL UNTUK KAMU
        ====================================================== */}

        <section className="bg-[#F6F0ED] px-10 py-14">

          <div className="mx-auto max-w-[1200px]">

            <h2 className="mb-10 text-2xl font-bold text-[#24140F]">
              Spesial Untuk Kamu
            </h2>

            <div className="flex items-center justify-center gap-8">

              <div className="w-[230px] shrink-0">

                <h3 className="text-2xl font-bold leading-tight text-[#24140F]">
                  Warisan Kuliner
                  <br />
                  Terpopuler
                </h3>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                  Jelajahi hidangan tradisional dan dokumentasi
                  budaya yang paling banyak diakses minggu ini.
                </p>

              </div>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={handleSpecialPrev}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#6B2E1E] text-[#6B2E1E] transition hover:bg-[#6B2E1E] hover:text-white"
                  aria-label="Konten sebelumnya"
                >
                  <ArrowLeft size={18} />
                </button>

                {Array.from({ length: 3 }).map((_, offset) => {
                  const item =
                    culinaryData[
                      (specialIndex + offset) %
                        culinaryData.length
                    ];

                  return (
                    <div
                      key={`${item.id}-${offset}`}
                      onClick={() => handleCardClick(item.id)}
                      className="cursor-pointer transition hover:opacity-95"
                    >
                      <CulinaryCard {...item} />
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={handleSpecialNext}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#6B2E1E] text-[#6B2E1E] transition hover:bg-[#6B2E1E] hover:text-white"
                  aria-label="Konten berikutnya"
                >
                  <ArrowRight size={18} />
                </button>

              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            EKSPLORASI GASTRONOMI
        ====================================================== */}

        <section className="bg-white px-10 py-14">

          <div className="mx-auto max-w-[1200px]">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-[#24140F]">
                  Eksplorasi Gastronomi
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Jelajahi kekayaan kuliner tradisional, bahan autentik
                  dan cerita budaya dari berbagai daerah.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/explore")}
                className="rounded-full bg-[#6B2E1E] px-7 py-2 text-xs font-semibold text-white transition hover:bg-[#542317]"
              >
                View More
              </button>

            </div>
            
            {/* Cards */}
            <div className="mt-10 flex items-center justify-center gap-4">

              <button
                type="button"
                onClick={handleExplorePrev}
                disabled={filteredExploreData.length <= 1}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#6B2E1E] text-[#6B2E1E] transition hover:bg-[#6B2E1E] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Konten sebelumnya"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="flex gap-4">

                {filteredExploreData.length > 0 ? (
                  Array.from({
                    length: Math.min(
                      4,
                      filteredExploreData.length
                    ),
                  }).map((_, offset) => {

                    const item =
                      filteredExploreData[
                        (exploreIndex + offset) %
                          filteredExploreData.length
                      ];

                    return (
                      <div
                        key={`explore-${item.id}-${offset}`}
                        onClick={() => handleCardClick(item.id)}
                        className="cursor-pointer transition hover:opacity-95"
                      >
                        <CulinaryCard {...item} />
                      </div>
                    );
                  })
                ) : (
                  <div className="flex h-[200px] w-[900px] items-center justify-center rounded-xl border border-dashed border-gray-300 text-sm text-gray-400">
                    Belum ada konten untuk kategori ini.
                  </div>
                )}

              </div>

              <button
                type="button"
                onClick={handleExploreNext}
                disabled={filteredExploreData.length <= 1}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#6B2E1E] text-[#6B2E1E] transition hover:bg-[#6B2E1E] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Konten berikutnya"
              >
                <ArrowRight size={18} />
              </button>

            </div>
          </div>
        </section>

        {/* =====================================================
            KONTEN BARU
        ====================================================== */}

        <section className="bg-[#F6F0ED] px-10 py-14">

          <div className="mx-auto max-w-[1200px]">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-[#24140F]">
                  Konten Yang Baru Ditambahkan
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Temukan hidangan, resep, dan dokumentasi gastronomi
                  yang baru saja ditambahkan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/explore")}
                className="rounded-full bg-[#6B2E1E] px-7 py-2 text-xs font-semibold text-white transition hover:bg-[#542317]"
              >
                View More
              </button>

            </div>

            {/* Cards */}
            <div className="mt-10 flex items-center justify-center gap-4">

              <button
                type="button"
                onClick={handleNewContentPrev}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#6B2E1E] text-[#6B2E1E] transition hover:bg-[#6B2E1E] hover:text-white"
                aria-label="Konten sebelumnya"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="flex gap-4">

                {Array.from({ length: 4 }).map((_, offset) => {

                  const item =
                    culinaryData[
                      (newContentIndex + offset) %
                        culinaryData.length
                    ];

                  return (
                    <div
                      key={`new-${item.id}-${offset}`}
                      onClick={() => handleCardClick(item.id)}
                      className="cursor-pointer transition hover:opacity-95"
                    >
                      <CulinaryCard {...item} />
                    </div>
                  );
                })}

              </div>

              <button
                type="button"
                onClick={handleNewContentNext}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#6B2E1E] text-[#6B2E1E] transition hover:bg-[#6B2E1E] hover:text-white"
                aria-label="Konten berikutnya"
              >
                <ArrowRight size={18} />
              </button>

            </div>
          </div>
        </section>

        {/* =====================================================
            AGENDA GASTRONOMI
        ====================================================== */}

        <section className="bg-white px-10 py-14">

          <div className="mx-auto max-w-[1200px]">

            <h2 className="text-2xl font-bold text-[#24140F]">
              Agenda Gastronomi
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Temukan festival kuliner, workshop memasak dan acara
              budaya gastronomi yang sedang berlangsung.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">

              {/* Agenda */}
              <div className="grid grid-cols-2 gap-5">

                {agendaData.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleAgendaClick(event.id)}
                    className="cursor-pointer transition hover:opacity-95"
                  >
                    <AgendaCard {...event} />
                  </div>
                ))}

              </div>

              {/* Calendar */}
              <div className="flex items-center justify-center">

                <div className="w-full max-w-[400px] rounded-xl bg-white p-8 shadow-lg">

                  <div className="flex items-center justify-between">

                    <h3 className="font-bold text-[#24140F]">
                      {monthNames[currentMonth]} {currentYear}
                    </h3>

                    <div className="flex gap-3 text-gray-500">

                      <button
                        type="button"
                        onClick={handlePreviousMonth}
                        className="rounded-md p-1 transition hover:bg-[#F6F0ED] hover:text-[#6B2E1E]"
                        aria-label="Bulan sebelumnya"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="rounded-md p-1 transition hover:bg-[#F6F0ED] hover:text-[#6B2E1E]"
                        aria-label="Bulan berikutnya"
                      >
                        <ChevronRight size={18} />
                      </button>

                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-7 gap-4 text-center text-xs text-gray-500">

                    {[
                      "Mo",
                      "Tu",
                      "We",
                      "Th",
                      "Fr",
                      "Sa",
                      "Su",
                    ].map((day) => (
                      <span
                        key={day}
                        className="font-medium"
                      >
                        {day}
                      </span>
                    ))}

                    {/* Empty days */}
                    {Array.from({
                      length: firstDayOfMonth - 1,
                    }).map((_, index) => (
                      <span key={`empty-${index}`} />
                    ))}

                    {/* Calendar days */}
                    {Array.from(
                      { length: daysInMonth },
                      (_, index) => {

                        const day = index + 1;

                        const isFestival =
                          day === 11 &&
                          currentMonth === 6 &&
                          currentYear === 2026;

                        const isWorkshop =
                          day === 20 &&
                          currentMonth === 6 &&
                          currentYear === 2026;

                        const isExhibition =
                          day === 24 &&
                          currentMonth === 6 &&
                          currentYear === 2026;

                        return (
                          <button
                            type="button"
                            key={day}
                            className={`flex h-7 items-center justify-center rounded-full text-xs transition hover:bg-[#F6F0ED] ${
                              isFestival
                                ? "bg-pink-400 text-white hover:bg-pink-500"
                                : isWorkshop
                                  ? "bg-yellow-400 text-white hover:bg-yellow-500"
                                  : isExhibition
                                    ? "bg-green-400 text-white hover:bg-green-500"
                                    : "text-gray-600"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      }
                    )}

                  </div>

                  <div className="mt-8 flex flex-wrap gap-5 text-xs text-gray-500">
                    <span>🟡 Festival</span>
                    <span>🟢 Workshop</span>
                    <span>🩷 Pameran</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;