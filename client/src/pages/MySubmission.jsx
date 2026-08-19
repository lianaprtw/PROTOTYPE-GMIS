import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FileText,
  Hourglass,
  CheckCircle2,
  XCircle,
  Search,
  ChevronRight,
  FolderOpen,
  MapPin,
  Calendar,
  Edit3,
  ChevronDown
} from "lucide-react";
import lawarBaliImg from "../assets/lawar-bali.jpg";
import megibungImg from "../assets/megibung.jpg";
import basaGenepImg from "../assets/basa-genep.jpg";
import jatiluwihImg from "../assets/jatiluwih.jpg";
import exploreHeroImg from "../assets/explore-hero.jpg";

// Sample Data
const INITIAL_SUBMISSIONS = [
  {
    id: "1",
    name: "Lawar Tradisional Bali",
    category: "Kuliner",
    description:
      "Lawar merupakan hidangan khas Bali yang terbuat dari campuran daging cincang, kelapa parut, dan bumbu khas Bali.",
    date: "12 Agu 2024, 14:30",
    rawDate: "2024-08-12T14:30:00",
    location: "Gianyar, Bali",
    status: "Menunggu Review",
    image: lawarBaliImg
  },
  {
    id: "2",
    name: "Tradisi Megibung",
    category: "Budaya",
    description:
      "Megibung adalah tradisi makan bersama yang melambangkan kebersamaan dan rasa syukur masyarakat Bali.",
    date: "10 Agu 2024, 09:15",
    rawDate: "2024-08-10T09:15:00",
    location: "Karangasem, Bali",
    status: "Disetujui",
    image: megibungImg
  },
  {
    id: "3",
    name: "Base Genep Bali",
    category: "Bahan",
    description:
      "Base genep adalah bumbu dasar khas Bali yang digunakan sebagai dasar berbagai masakan tradisional.",
    date: "8 Agu 2024, 16:20",
    rawDate: "2024-08-08T16:20:00",
    location: "Denpasar, Bali",
    status: "Perlu Perbaikan",
    image: basaGenepImg
  },
  {
    id: "4",
    name: "Subak Sistem Irigasi Bali",
    category: "Budaya",
    description:
      "Subak adalah sistem irigasi tradisional Bali yang telah diakui sebagai Warisan Budaya Dunia UNESCO.",
    date: "8 Agu 2024, 11:05",
    rawDate: "2024-08-08T11:05:00",
    location: "Tabanan, Bali",
    status: "Disetujui",
    image: jatiluwihImg
  },
  {
    id: "5",
    name: "Pura Uluwatu",
    category: "Destinasi",
    description:
      "Pura yang terletak di atas tebing dengan pemandangan laut yang indah di Bali bagian selatan.",
    date: "2 Agu 2024, 18:40",
    rawDate: "2024-08-02T18:40:00",
    location: "Badung, Bali",
    status: "Menunggu Review",
    image: exploreHeroImg
  }
];

export default function MySubmission() {
  const navigate = useNavigate();

  // Filter & Search States
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Terbaru");

  // Calculate Summary Counts
  const counts = useMemo(() => {
    return {
      total: INITIAL_SUBMISSIONS.length,
      pending: INITIAL_SUBMISSIONS.filter((item) => item.status === "Menunggu Review").length,
      approved: INITIAL_SUBMISSIONS.filter((item) => item.status === "Disetujui").length,
      revision: INITIAL_SUBMISSIONS.filter((item) => item.status === "Perlu Perbaikan").length,
      rejected: INITIAL_SUBMISSIONS.filter((item) => item.status === "Ditolak").length
    };
  }, []);

  // Category Badge Colors
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Kuliner":
        return "bg-amber-100/80 text-amber-900 border-amber-200";
      case "Budaya":
        return "bg-purple-100/80 text-purple-900 border-purple-200";
      case "Bahan":
        return "bg-emerald-100/80 text-emerald-900 border-emerald-200";
      case "Destinasi":
        return "bg-sky-100/80 text-sky-900 border-sky-200";
      case "Agenda":
        return "bg-rose-100/80 text-rose-900 border-rose-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  // Status Style Helper
  const getStatusStyle = (status) => {
    switch (status) {
      case "Menunggu Review":
        return {
          container: "bg-amber-50 text-amber-800 border-amber-200",
          icon: <Hourglass size={14} className="text-amber-600" />
        };
      case "Disetujui":
        return {
          container: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 size={14} className="text-emerald-600" />
        };
      case "Perlu Perbaikan":
        return {
          container: "bg-rose-50 text-rose-800 border-rose-200",
          icon: <XCircle size={14} className="text-rose-600" />
        };
      case "Ditolak":
        return {
          container: "bg-stone-100 text-stone-700 border-stone-300",
          icon: <XCircle size={14} className="text-stone-500" />
        };
      default:
        return {
          container: "bg-gray-100 text-gray-700 border-gray-200",
          icon: null
        };
    }
  };

  // Route Handler for View Detail
  const handleSubmissionClick = (item) => {
    navigate(`/submission/${item.id}`);
  };

  // Filter & Sort Logic
  const filteredSubmissions = useMemo(() => {
    return INITIAL_SUBMISSIONS.filter((item) => {
      // Filter by Status Tab
      if (activeFilter !== "Semua" && item.status !== activeFilter) {
        return false;
      }
      // Filter by Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchLoc = item.location.toLowerCase().includes(query);
        return matchName || matchCategory || matchDesc || matchLoc;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "Terbaru") {
        return new Date(b.rawDate) - new Date(a.rawDate);
      }
      if (sortBy === "Terlama") {
        return new Date(a.rawDate) - new Date(b.rawDate);
      }
      if (sortBy === "Nama A-Z") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "Nama Z-A") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [activeFilter, searchQuery, sortBy]);

  const filterTabs = [
    { label: "Semua", count: counts.total },
    { label: "Menunggu Review", count: counts.pending },
    { label: "Disetujui", count: counts.approved },
    { label: "Perlu Perbaikan", count: counts.revision },
    { label: "Ditolak", count: counts.rejected }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF9] text-gray-800 font-sans">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTAINER */}
      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
          
          {/* PAGE HEADER */}
          <div className="relative mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                My Submission
              </h1>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:text-base">
                Kelola dan pantau status aset gastronomi yang Anda kirimkan ke Gastro Pustaka.
              </p>
            </div>

            {/* Decorative Balinese Cultural Motif Accent */}
            <div className="hidden md:block opacity-20 shrink-0">
              <svg width="210" height="70" viewBox="0 0 200 60" fill="none" stroke="#3B1E14" strokeWidth="1.5">
                <path d="M 10,50 C 30,20 60,20 80,50 C 100,20 130,20 150,50 C 170,20 190,20 200,50" />
                <circle cx="80" cy="25" r="4" fill="#3B1E14" />
                <circle cx="150" cy="25" r="4" fill="#3B1E14" />
              </svg>
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1: Total Dikirim */}
            <div className="flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/70 text-[#3B1E14]">
                <FileText size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#3B1E14]">{counts.total}</p>
                <p className="text-xs font-semibold text-gray-800">Total Dikirim</p>
                <p className="text-[11px] text-gray-500">Semua pengajuan aset</p>
              </div>
            </div>

            {/* Card 2: Menunggu Review */}
            <div className="flex items-center gap-4 rounded-2xl border border-amber-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-100/60 text-amber-700">
                <Hourglass size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-800">{counts.pending}</p>
                <p className="text-xs font-semibold text-amber-900">Menunggu Review</p>
                <p className="text-[11px] text-amber-700/80">Dalam proses peninjauan</p>
              </div>
            </div>

            {/* Card 3: Disetujui */}
            <div className="flex items-center gap-4 rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-100/60 text-emerald-700">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-800">{counts.approved}</p>
                <p className="text-xs font-semibold text-emerald-900">Disetujui</p>
                <p className="text-[11px] text-emerald-700/80">Aset telah disetujui</p>
              </div>
            </div>

            {/* Card 4: Perlu Perbaikan */}
            <div className="flex items-center gap-4 rounded-2xl border border-rose-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-100/60 text-rose-700">
                <XCircle size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-800">{counts.revision}</p>
                <p className="text-xs font-semibold text-rose-900">Perlu Perbaikan</p>
                <p className="text-[11px] text-rose-700/80">Perlu revisi dari Anda</p>
              </div>
            </div>

          </div>

          {/* SUBMISSION LIST CONTAINER */}
          <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
            
            {/* TOP BAR: Filter Tabs, Search & Sort */}
            <div className="border-b border-stone-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                
                {/* Horizontal Scrollable Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar sm:pb-0">
                  {filterTabs.map((tab) => {
                    const isActive = activeFilter === tab.label;
                    return (
                      <button
                        key={tab.label}
                        type="button"
                        onClick={() => setActiveFilter(tab.label)}
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                          isActive
                            ? "bg-[#3B1E14] text-white shadow-2xs"
                            : "bg-stone-50 text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                            isActive
                              ? "bg-amber-100/30 text-amber-200"
                              : "bg-stone-200/80 text-stone-600"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Input & Sort Dropdown */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Search Bar */}
                  <div className="relative flex-1 sm:w-64">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari aset..."
                      className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-9 pr-3 text-xs text-stone-800 transition placeholder:text-stone-400 focus:border-[#3B1E14] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                    />
                  </div>

                  {/* Sort Select */}
                  <div className="relative shrink-0">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3.5 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                    >
                      <option value="Terbaru">Terbaru</option>
                      <option value="Terlama">Terlama</option>
                      <option value="Nama A-Z">Nama A-Z</option>
                      <option value="Nama Z-A">Nama Z-A</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* LIST CONTENT AREA */}
            <div className="divide-y divide-stone-100">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((item) => {
                  const statusStyle = getStatusStyle(item.status);

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 p-5 transition hover:bg-stone-50/60 sm:p-6 md:flex-row md:items-center md:justify-between"
                    >
                      {/* Left & Center Info */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        {/* Thumbnail Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-44 w-full rounded-xl object-cover border border-stone-100 sm:h-[85px] sm:w-[120px] shrink-0"
                        />

                        {/* Content Details */}
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-[#3B1E14] hover:underline cursor-pointer" onClick={() => handleSubmissionClick(item)}>
                              {item.name}
                            </h3>
                            <span
                              className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${getCategoryBadgeColor(
                                item.category
                              )}`}
                            >
                              {item.category}
                            </span>
                          </div>

                          <p className="line-clamp-2 text-xs leading-relaxed text-stone-600 max-w-xl">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-stone-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={13} className="text-stone-400" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={13} className="text-stone-400" />
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Status & Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3 md:flex-col md:items-end md:justify-center md:border-0 md:pt-0">
                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle.container}`}
                        >
                          {statusStyle.icon}
                          {item.status}
                        </span>

                        {/* Buttons Container */}
                        <div className="flex items-center gap-2">
                          {item.status === "Perlu Perbaikan" && (
                            <button
                              type="button"
                              onClick={() => navigate(`/submit-asset/${item.id}`)}
                              className="inline-flex items-center gap-1 rounded-xl bg-[#3B1E14] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#2A150E] active:scale-95"
                            >
                              <Edit3 size={13} />
                              Edit Submission
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleSubmissionClick(item)}
                            className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-bold text-stone-700 transition hover:bg-stone-50 hover:text-stone-900 active:scale-95"
                          >
                            Lihat Detail
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                /* EMPTY STATE SECTION */
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50/60 text-[#3B1E14]">
                    <FolderOpen size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-[#3B1E14]">Belum ada pengajuan aset</h3>
                  <p className="mt-1 max-w-sm text-xs text-stone-500">
                    Mulai bagikan pengetahuan dan aset gastronomi Anda untuk mendukung kelestarian budaya Bali.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/submit-asset")}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3B1E14] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#2A150E] active:scale-95"
                  >
                    + Submit Aset Sekarang
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}