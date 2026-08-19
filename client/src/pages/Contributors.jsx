import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  UserCheck,
  UserPlus,
  Star,
  MapPin,
  Mail,
  CalendarDays,
  Clock3,
  FileText,
  CheckCircle2,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Filter,
  RotateCcw,
  UserX,
} from "lucide-react";
import CuratorSidebar from "../components/CuratorSidebar";

const MOCK_CONTRIBUTORS = [
  {
    id: "1",
    name: "Ni Luh Putu Sari",
    email: "putusari@gmail.com",
    location: "Denpasar, Bali",
    joinedDate: "12 Juni 2025",
    totalSubmission: 5,
    approvedSubmission: 3,
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "I Made Arya",
    email: "madear ya@gmail.com",
    location: "Gianyar, Bali",
    joinedDate: "8 Juli 2025",
    totalSubmission: 8,
    approvedSubmission: 6,
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Ni Kadek Ayu",
    email: "kadekayu@gmail.com",
    location: "Karangasem, Bali",
    joinedDate: "20 September 2025",
    totalSubmission: 4,
    approvedSubmission: 2,
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "I Wayan Putra",
    email: "wayanputra@gmail.com",
    location: "Tabanan, Bali",
    joinedDate: "3 November 2025",
    totalSubmission: 12,
    approvedSubmission: 10,
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Ni Made Ratih",
    email: "maderatih@gmail.com",
    location: "Badung, Bali",
    joinedDate: "15 Januari 2026",
    totalSubmission: 7,
    approvedSubmission: 5,
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "I Ketut Dharma",
    email: "ketutdharma@gmail.com",
    location: "Denpasar, Bali",
    joinedDate: "2 Februari 2026",
    totalSubmission: 3,
    approvedSubmission: 1,
    status: "Tidak Aktif",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop",
  },
];

const LOCATION_OPTIONS = [
  "Semua Lokasi",
  "Denpasar",
  "Gianyar",
  "Badung",
  "Tabanan",
  "Karangasem",
];

const STATUS_OPTIONS = ["Semua Status", "Aktif", "Tidak Aktif"];

const CONTRIBUTION_OPTIONS = [
  "Semua Kontributor",
  "Kontribusi Tinggi",
  "Kontribusi Sedang",
  "Kontribusi Rendah",
];

const getContributionLevel = (totalSubmission) => {
  if (totalSubmission >= 8) return "Tinggi";
  if (totalSubmission >= 4) return "Sedang";
  return "Rendah";
};

export default function Contributors() {
  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================
  const [contributors, setContributors] = useState(MOCK_CONTRIBUTORS);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [selectedLocation, setSelectedLocation] =
    useState("Semua Lokasi");
  const [selectedContribution, setSelectedContribution] =
    useState("Semua Kontributor");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const dropdownRef = useRef(null);

  // =========================
  // CLOSE DROPDOWN
  // =========================
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveDropdownId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // FILTER DATA
  // =========================
  const filteredContributors = useMemo(() => {
    return contributors.filter((item) => {
      const keyword = searchTerm.toLowerCase().trim();

      const matchSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword);

      const matchStatus =
        selectedStatus === "Semua Status" ||
        item.status === selectedStatus;

      const matchLocation =
        selectedLocation === "Semua Lokasi" ||
        item.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase());

      const level = getContributionLevel(item.totalSubmission);

      let matchContribution = true;

      if (selectedContribution === "Kontribusi Tinggi") {
        matchContribution = level === "Tinggi";
      } else if (selectedContribution === "Kontribusi Sedang") {
        matchContribution = level === "Sedang";
      } else if (selectedContribution === "Kontribusi Rendah") {
        matchContribution = level === "Rendah";
      }

      return (
        matchSearch &&
        matchStatus &&
        matchLocation &&
        matchContribution
      );
    });
  }, [
    contributors,
    searchTerm,
    selectedStatus,
    selectedLocation,
    selectedContribution,
  ]);

  // =========================
  // PAGINATION
  // =========================
  const totalFilteredCount = filteredContributors.length;

  const totalPages =
    Math.ceil(totalFilteredCount / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedContributors = filteredContributors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Jika filter membuat halaman saat ini tidak tersedia
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =========================
  // SUMMARY
  // =========================
  const totalContributors = contributors.length;

  const activeContributors = contributors.filter(
    (item) => item.status === "Aktif"
  ).length;

  const topContributors = contributors.filter(
    (item) => item.totalSubmission >= 8
  ).length;

  const summaryCards = [
    {
      title: "Total Contributors",
      value: totalContributors,
      subtext: "Semua contributor",
      icon: Users,
      iconBg: "bg-stone-100",
      textColor: "text-stone-700",
      borderColor: "hover:border-stone-300",
    },
    {
      title: "Active Contributors",
      value: activeContributors,
      subtext: "Contributor aktif",
      icon: UserCheck,
      iconBg: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "hover:border-emerald-300",
    },
    {
      title: "Contributor Baru",
      value: 5,
      subtext: "Bergabung bulan ini",
      icon: UserPlus,
      iconBg: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "hover:border-blue-300",
    },
    {
      title: "Top Contributors",
      value: topContributors,
      subtext: "Kontribusi tinggi",
      icon: Star,
      iconBg: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "hover:border-amber-300",
    },
  ];

  // =========================
  // RESET FILTER
  // =========================
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("Semua Status");
    setSelectedLocation("Semua Lokasi");
    setSelectedContribution("Semua Kontributor");
    setCurrentPage(1);
  };

  // =========================
  // ACTION HANDLER
  // =========================
  const handleAction = (actionName, contributor) => {
    setActiveDropdownId(null);

    switch (actionName) {
      case "Detail":
        navigate(`/curator/contributors/${contributor.id}`);
        break;

      case "Lihat Profil":
        navigate(`/curator/contributors/${contributor.id}`);
        break;

      case "Lihat Submission":
        navigate(
          `/curator/submissions?contributorId=${contributor.id}`
        );
        break;

      case "Nonaktifkan Contributor": {
        if (contributor.status === "Tidak Aktif") {
          alert(`${contributor.name} sudah tidak aktif.`);
          return;
        }

        const confirmed = window.confirm(
          `Apakah kamu yakin ingin menonaktifkan contributor ${contributor.name}?`
        );

        if (!confirmed) return;

        setContributors((prev) =>
          prev.map((item) =>
            item.id === contributor.id
              ? {
                  ...item,
                  status: "Tidak Aktif",
                }
              : item
          )
        );

        alert(
          `${contributor.name} berhasil dinonaktifkan.`
        );

        break;
      }

      default:
        break;
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="flex min-h-screen bg-[#FDFBF9] font-sans text-stone-800 antialiased">
      <CuratorSidebar />

      <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">

          {/* ================= HEADER ================= */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                Contributors
              </h1>

              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                Kelola dan pantau contributor yang berkontribusi
                dalam dokumentasi aset gastronomi.
              </p>

              <div className="relative mt-2.5 flex max-w-[240px] items-center">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#C98A2E]/80 via-[#C98A2E]/40 to-transparent" />

                <div className="absolute left-6 h-1.5 w-1.5 rotate-45 border border-[#C98A2E] bg-[#FDFBF9]" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-stone-600">
              <div className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-xs">
                <CalendarDays
                  size={15}
                  className="text-[#C98A2E]"
                />

                <span>Senin, 17 Agustus 2026</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-xs">
                <Clock3
                  size={15}
                  className="text-[#C98A2E]"
                />

                <span>10:30 WIB</span>
              </div>
            </div>
          </div>

          {/* ================= SUMMARY CARDS ================= */}
          <div className="mb-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card, idx) => {
              const IconComponent = card.icon;

              return (
                <div
                  key={idx}
                  className={`flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs transition hover:shadow-md ${card.borderColor}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-stone-500">
                      {card.title}
                    </span>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.textColor}`}
                    >
                      <IconComponent size={18} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-[#3B1E14]">
                      {card.value}
                    </p>

                    <p className="mt-0.5 text-xs text-stone-400">
                      {card.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= SEARCH & FILTER ================= */}
          <div className="mb-6 rounded-2xl border border-stone-200/80 bg-white p-3.5 shadow-xs">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">

              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Cari nama, email, atau lokasi..."
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-9 pr-3 text-xs text-stone-800 transition placeholder:text-stone-400 focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Status */}
              <div className="relative w-full lg:w-40">
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>

              {/* Location */}
              <div className="relative w-full lg:w-40">
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                >
                  {LOCATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>

              {/* Contribution */}
              <div className="relative w-full lg:w-48">
                <select
                  value={selectedContribution}
                  onChange={(e) => {
                    setSelectedContribution(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                >
                  {CONTRIBUTION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">

                {/* Reset */}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 text-xs font-semibold text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>

                {/* Filter */}
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#3B1E14] px-4 text-xs font-semibold text-white transition hover:bg-[#2A150E]"
                >
                  <Filter size={13} />
                  <span>Filter</span>
                </button>

              </div>
            </div>
          </div>

          {/* ================= TABLE ================= */}
          <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs">

            {/* Table Heading */}
            <div className="border-b border-stone-100 px-6 py-4">
              <h2 className="font-serif text-base font-bold text-stone-800">
                Daftar Contributors
              </h2>

              <p className="text-xs text-stone-500">
                Daftar pengguna yang berkontribusi dalam dokumentasi
                aset gastronomi.
              </p>
            </div>

            {/* Empty State */}
            {filteredContributors.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                  <Users size={28} />
                </div>

                <h3 className="text-base font-bold text-stone-800">
                  Contributor tidak ditemukan
                </h3>

                <p className="mt-1 max-w-sm text-xs text-stone-500">
                  Tidak ada contributor yang sesuai dengan
                  pencarian atau filter yang dipilih.
                </p>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#3B1E14] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2A150E]"
                >
                  <RotateCcw size={13} />
                  <span>Reset Filter</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200/70 bg-[#FDFBF9] font-semibold text-stone-600">
                      <th className="py-3.5 pl-6 pr-4">
                        Contributor
                      </th>

                      <th className="px-4 py-3.5">
                        Kontak
                      </th>

                      <th className="px-4 py-3.5">
                        Lokasi
                      </th>

                      <th className="px-4 py-3.5">
                        Bergabung
                      </th>

                      <th className="px-4 py-3.5">
                        Submission
                      </th>

                      <th className="px-4 py-3.5">
                        Disetujui
                      </th>

                      <th className="px-4 py-3.5">
                        Status
                      </th>

                      <th className="py-3.5 pl-4 pr-6 text-right">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                    {paginatedContributors.map((item) => {
                      const isTop = item.totalSubmission >= 8;

                      const approvalRate =
                        item.totalSubmission > 0
                          ? Math.round(
                              (item.approvedSubmission /
                                item.totalSubmission) *
                                100
                            )
                          : 0;

                      return (
                        <tr
                          key={item.id}
                          className="transition-colors hover:bg-stone-50/70"
                        >

                          {/* Contributor */}
                          <td className="py-3.5 pl-6 pr-4">
                            <div className="flex min-w-[200px] items-center gap-3">
                              <img
                                src={item.avatar}
                                alt={item.name}
                                className="h-10 w-10 shrink-0 rounded-full border border-stone-200 object-cover"
                              />

                              <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-[#3B1E14]">
                                  {item.name}
                                </p>

                                {isTop && (
                                  <span className="mt-0.5 inline-flex items-center gap-1 rounded-md border border-amber-200/60 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                                    <Star
                                      size={10}
                                      className="fill-amber-500 text-amber-500"
                                    />

                                    Top Contributor
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Kontak */}
                          <td className="min-w-[160px] px-4 py-3.5">
                            <div className="flex items-center gap-1.5 text-stone-500">
                              <Mail
                                size={13}
                                className="shrink-0 text-stone-400"
                              />

                              <span className="truncate">
                                {item.email}
                              </span>
                            </div>
                          </td>

                          {/* Lokasi */}
                          <td className="whitespace-nowrap px-4 py-3.5">
                            <div className="flex items-center gap-1.5 text-stone-700">
                              <MapPin
                                size={13}
                                className="shrink-0 text-[#C98A2E]"
                              />

                              <span>{item.location}</span>
                            </div>
                          </td>

                          {/* Bergabung */}
                          <td className="whitespace-nowrap px-4 py-3.5 text-stone-600">
                            {item.joinedDate}
                          </td>

                          {/* Submission */}
                          <td className="whitespace-nowrap px-4 py-3.5">
                            <span className="font-bold text-stone-800">
                              {item.totalSubmission}
                            </span>{" "}
                            <span className="text-stone-400">
                              aset
                            </span>
                          </td>

                          {/* Disetujui */}
                          <td className="whitespace-nowrap px-4 py-3.5">
                            <p className="font-semibold text-emerald-700">
                              {item.approvedSubmission} disetujui
                            </p>

                            <p className="text-[10px] text-stone-400">
                              {approvalRate}% approved
                            </p>
                          </td>

                          {/* Status */}
                          <td className="whitespace-nowrap px-4 py-3.5">
                            {item.status === "Aktif" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                <CheckCircle2
                                  size={13}
                                  className="text-emerald-600"
                                />

                                Aktif
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-500">
                                <UserX
                                  size={13}
                                  className="text-stone-400"
                                />

                                Tidak Aktif
                              </span>
                            )}
                          </td>

                          {/* Aksi */}
                          <td className="relative whitespace-nowrap py-3.5 pl-4 pr-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">

                              {/* Detail */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleAction("Detail", item)
                                }
                                className="inline-flex items-center gap-1 rounded-xl bg-[#3B1E14] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#2A150E]"
                              >
                                <span>Detail</span>

                                <ChevronRight size={13} />
                              </button>

                              {/* More */}
                              <div
                                className="relative"
                                ref={
                                  activeDropdownId === item.id
                                    ? dropdownRef
                                    : null
                                }
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveDropdownId(
                                      activeDropdownId === item.id
                                        ? null
                                        : item.id
                                    )
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                                  aria-label={`Menu aksi ${item.name}`}
                                >
                                  <MoreVertical size={15} />
                                </button>

                                {activeDropdownId === item.id && (
                                  <div className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-stone-200 bg-white py-1.5 text-left shadow-lg">

                                    {/* Lihat Profil */}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAction(
                                          "Lihat Profil",
                                          item
                                        )
                                      }
                                      className="flex w-full items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
                                    >
                                      <Eye
                                        size={13}
                                        className="text-stone-400"
                                      />

                                      <span>
                                        Lihat Profil
                                      </span>
                                    </button>

                                    {/* Lihat Submission */}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAction(
                                          "Lihat Submission",
                                          item
                                        )
                                      }
                                      className="flex w-full items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
                                    >
                                      <FileText
                                        size={13}
                                        className="text-stone-400"
                                      />

                                      <span>
                                        Lihat Submission
                                      </span>
                                    </button>

                                    {/* Nonaktifkan */}
                                    {item.status === "Aktif" && (
                                      <>
                                        <div className="my-1 border-t border-stone-100" />

                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleAction(
                                              "Nonaktifkan Contributor",
                                              item
                                            )
                                          }
                                          className="flex w-full items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50"
                                        >
                                          <UserX
                                            size={13}
                                            className="text-rose-500"
                                          />

                                          <span>
                                            Nonaktifkan
                                          </span>
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* ================= PAGINATION ================= */}
            <div className="flex flex-col gap-3 border-t border-stone-100 px-6 py-4 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">

              <p>
                Menampilkan{" "}
                <span className="font-semibold text-stone-800">
                  {totalFilteredCount === 0
                    ? 0
                    : startIndex + 1}
                </span>{" "}
                -{" "}
                <span className="font-semibold text-stone-800">
                  {Math.min(
                    startIndex + itemsPerPage,
                    totalFilteredCount
                  )}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-stone-800">
                  {totalFilteredCount}
                </span>{" "}
                contributors
              </p>

              <div className="flex items-center gap-4">

                {/* Page Navigation */}
                <div className="flex items-center gap-1">

                  {/* Previous */}
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(page - 1, 1)
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
                    aria-label="Halaman sebelumnya"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {/* Page Numbers */}
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                        currentPage === page
                          ? "bg-[#3B1E14] text-white"
                          : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(page + 1, totalPages)
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
                    aria-label="Halaman berikutnya"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Items Per Page */}
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="appearance-none rounded-lg border border-stone-200 bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:outline-hidden"
                  >
                    <option value={6}>
                      6 / halaman
                    </option>

                    <option value={10}>
                      10 / halaman
                    </option>

                    <option value={20}>
                      20 / halaman
                    </option>
                  </select>

                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}