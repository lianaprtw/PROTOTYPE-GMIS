import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  RotateCcw,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  MapPin,
  CheckCircle2,
  FileText,
  Utensils,
  Landmark,
  Leaf,
  MapPinned,
  PlaySquare,
  Calendar,
  Play,
  Eye,
  Edit,
  Archive,
  SearchX,
  X,
  Save,
  AlertTriangle,
} from "lucide-react";
import CuratorSidebar from "../components/CuratorSidebar";

const MOCK_PUBLISHED_ASSETS = [
  {
    id: "1",
    name: "Base Genep Bali",
    type: "Bahan",
    contributor: "Ni Luh Putu Sari",
    email: "putusari@gmail.com",
    location: "Denpasar, Bali",
    publishedAt: "16 Agu 2026",
    publishedTime: "09:45",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    status: "Diterbitkan",
  },
  {
    id: "2",
    name: "Lawar Bali",
    type: "Kuliner",
    contributor: "I Made Arya",
    email: "madearya@gmail.com",
    location: "Gianyar, Bali",
    publishedAt: "15 Agu 2026",
    publishedTime: "14:20",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    status: "Diterbitkan",
  },
  {
    id: "3",
    name: "Upacara Megibung",
    type: "Budaya",
    contributor: "Ni Kadek Ayu",
    email: "kadekayu@gmail.com",
    location: "Karangasem, Bali",
    publishedAt: "15 Agu 2026",
    publishedTime: "11:30",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    status: "Diterbitkan",
  },
  {
    id: "4",
    name: "Pura Besakih",
    type: "Destinasi",
    contributor: "I Wayan Putra",
    email: "wayanputra@gmail.com",
    location: "Karangasem, Bali",
    publishedAt: "14 Agu 2026",
    publishedTime: "16:10",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    status: "Diterbitkan",
  },
  {
    id: "5",
    name: "Proses Masak Lawar Bali",
    type: "Multimedia",
    subLabel: "Video Dokumenter",
    contributor: "Citra Dewi",
    email: "citradewi@gmail.com",
    location: "Gianyar, Bali",
    publishedAt: "13 Agu 2026",
    publishedTime: "13:25",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
    status: "Diterbitkan",
  },
  {
    id: "6",
    name: "Festival Kuliner Bali 2026",
    type: "Agenda Gastronomi",
    subLabel: "Agenda Tahunan",
    contributor: "Dinas Pariwisata Bali",
    email: "dispar@baliprov.go.id",
    location: "Badung, Bali",
    publishedAt: "12 Agu 2026",
    publishedTime: "10:05",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    status: "Diterbitkan",
  },
];

const SUMMARY_CARDS_DATA = [
  {
    title: "Total Aset Diterbitkan",
    categoryKey: "Semua Kategori",
    value: "47",
    subtext: "Aset telah diterbitkan",
    icon: FileText,
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    iconBg: "bg-amber-100/80",
    borderColor: "hover:border-amber-300",
  },
  {
    title: "Kuliner",
    categoryKey: "Kuliner",
    value: "18",
    subtext: "38.3% dari total",
    icon: Utensils,
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    iconBg: "bg-orange-100/80",
    borderColor: "hover:border-orange-300",
  },
  {
    title: "Budaya",
    categoryKey: "Budaya",
    value: "12",
    subtext: "25.5% dari total",
    icon: Landmark,
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    iconBg: "bg-purple-100/80",
    borderColor: "hover:border-purple-300",
  },
  {
    title: "Bahan",
    categoryKey: "Bahan",
    value: "7",
    subtext: "14.9% dari total",
    icon: Leaf,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    iconBg: "bg-emerald-100/80",
    borderColor: "hover:border-emerald-300",
  },
  {
    title: "Destinasi",
    categoryKey: "Destinasi",
    value: "5",
    subtext: "10.6% dari total",
    icon: MapPinned,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    iconBg: "bg-blue-100/80",
    borderColor: "hover:border-blue-300",
  },
  {
    title: "Multimedia",
    categoryKey: "Multimedia",
    value: "3",
    subtext: "6.4% dari total",
    icon: PlaySquare,
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
    iconBg: "bg-rose-100/80",
    borderColor: "hover:border-rose-300",
  },
  {
    title: "Agenda Gastronomi",
    categoryKey: "Agenda Gastronomi",
    value: "2",
    subtext: "4.3% dari total",
    icon: Calendar,
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    iconBg: "bg-amber-100/80",
    borderColor: "hover:border-amber-300",
  },
];

export default function PublishedAssets() {
  const [assetsList, setAssetsList] = useState(MOCK_PUBLISHED_ASSETS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedContributor, setSelectedContributor] = useState("Semua Contributor");
  const [selectedDate] = useState("01/08/2026 - 16/08/2026");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Modal States
  const [viewModalAsset, setViewModalAsset] = useState(null);
  const [editModalAsset, setEditModalAsset] = useState(null);
  const [archiveModalAsset, setArchiveModalAsset] = useState(null);

  const tableContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        tableContainerRef.current &&
        !tableContainerRef.current.contains(event.target)
      ) {
        setActiveDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const contributorOptions = useMemo(() => {
    const list = Array.from(new Set(assetsList.map((a) => a.contributor)));
    return ["Semua Contributor", ...list];
  }, [assetsList]);

  const filteredAssets = useMemo(() => {
    return assetsList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === "Semua Kategori" || item.type === selectedCategory;

      const matchContributor =
        selectedContributor === "Semua Contributor" ||
        item.contributor === selectedContributor;

      return matchSearch && matchCategory && matchContributor;
    });
  }, [assetsList, searchTerm, selectedCategory, selectedContributor]);

  const totalFilteredCount = filteredAssets.length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = filteredAssets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Semua Kategori");
    setSelectedContributor("Semua Contributor");
    setCurrentPage(1);
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Kuliner":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "Budaya":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Bahan":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Destinasi":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Multimedia":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Agenda Gastronomi":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  const handleAction = (actionName, asset) => {
    setActiveDropdownId(null);
    if (actionName === "Lihat Aset" || actionName === "Lihat Detail") {
      setViewModalAsset(asset);
    } else if (actionName === "Edit Metadata") {
      setEditModalAsset({ ...asset });
    } else if (actionName === "Arsipkan") {
      setArchiveModalAsset(asset);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setAssetsList((prev) =>
      prev.map((item) => (item.id === editModalAsset.id ? editModalAsset : item))
    );
    setEditModalAsset(null);
  };

  const handleConfirmArchive = () => {
    setAssetsList((prev) => prev.filter((item) => item.id !== archiveModalAsset.id));
    setArchiveModalAsset(null);
  };

  return (
    <div className="flex min-h-screen bg-[#FDFBF9] font-sans text-stone-800 antialiased">
      <CuratorSidebar />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                Published Assets
              </h1>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                Kelola dan pantau aset gastronomi yang telah disetujui dan diterbitkan.
              </p>
              <div className="relative mt-2.5 flex items-center max-w-[240px]">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#C98A2E]/80 via-[#C98A2E]/40 to-transparent" />
                <div className="absolute left-6 h-1.5 w-1.5 rotate-45 border border-[#C98A2E] bg-[#FDFBF9]" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-stone-600">
              <div className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-xs">
                <CalendarDays size={15} className="text-[#C98A2E]" />
                <span>Jumat, 16 Agustus 2026</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-xs">
                <Clock3 size={15} className="text-[#C98A2E]" />
                <span>10:30 WIB</span>
              </div>
            </div>
          </div>

          {/* SUMMARY CARDS (Clickable for Filtering) */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {SUMMARY_CARDS_DATA.map((card, idx) => {
              const IconComponent = card.icon;
              const isSelected = selectedCategory === card.categoryKey;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(card.categoryKey);
                    setCurrentPage(1);
                  }}
                  className={`flex flex-col justify-between rounded-2xl border text-left p-3.5 shadow-xs transition hover:shadow-md cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-[#3B1E14] border-transparent bg-stone-50"
                      : "border-stone-200/80 bg-white"
                  } ${card.borderColor}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium leading-tight text-stone-500 line-clamp-1">
                      {card.title}
                    </span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.textColor}`}
                    >
                      <IconComponent size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p
                      className={`text-xl font-bold sm:text-2xl ${
                        idx === 0 ? "text-[#3B1E14]" : "text-stone-800"
                      }`}
                    >
                      {card.value}
                    </p>
                    <p className="mt-0.5 text-[10px] text-stone-400 truncate">
                      {card.subtext}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* SEARCH & FILTER TOOLBAR */}
          <div className="mb-6 rounded-2xl border border-stone-200/80 bg-white p-3.5 shadow-xs">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
              {/* Search input */}
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
                  placeholder="Cari nama aset, contributor, atau lokasi..."
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-9 pr-3 text-xs text-stone-800 transition placeholder:text-stone-400 focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Category dropdown */}
              <div className="relative w-full lg:w-44">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                >
                  <option value="Semua Kategori">Semua Kategori</option>
                  <option value="Kuliner">Kuliner</option>
                  <option value="Budaya">Budaya</option>
                  <option value="Bahan">Bahan</option>
                  <option value="Destinasi">Destinasi</option>
                  <option value="Multimedia">Multimedia</option>
                  <option value="Agenda Gastronomi">Agenda Gastronomi</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>

              {/* Contributor dropdown */}
              <div className="relative w-full lg:w-44">
                <select
                  value={selectedContributor}
                  onChange={(e) => {
                    setSelectedContributor(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                >
                  {contributorOptions.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>

              {/* Date display */}
              <div className="flex h-9 items-center rounded-xl border border-stone-200 bg-[#FDFBF9] px-3 text-xs text-stone-600">
                <CalendarDays size={14} className="mr-2 text-stone-400 shrink-0" />
                <span className="whitespace-nowrap font-medium text-stone-700">
                  {selectedDate}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 text-xs font-semibold text-stone-600 transition hover:bg-stone-50 hover:text-stone-900 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#3B1E14] px-4 text-xs font-semibold text-white transition hover:bg-[#2A150E] cursor-pointer"
                >
                  <Filter size={13} />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div
            ref={tableContainerRef}
            className="relative rounded-2xl border border-stone-200/80 bg-white shadow-xs"
          >
            {filteredAssets.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                  <SearchX size={28} />
                </div>
                <h3 className="text-base font-bold text-stone-800">
                  Tidak ada aset ditemukan
                </h3>
                <p className="mt-1 max-w-sm text-xs text-stone-500">
                  Coba ubah kata kunci atau filter pencarian Anda.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#3B1E14] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2A150E] cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset Filter</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200/70 bg-[#FDFBF9] font-semibold text-stone-600">
                      <th className="py-3.5 pl-6 pr-4">Aset Gastronomi</th>
                      <th className="px-4 py-3.5">Contributor</th>
                      <th className="px-4 py-3.5">Kategori</th>
                      <th className="px-4 py-3.5">Lokasi</th>
                      <th className="px-4 py-3.5">Tanggal Publikasi</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="py-3.5 pl-4 pr-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                    {paginatedAssets.map((asset) => (
                      <tr
                        key={asset.id}
                        className="transition-colors hover:bg-stone-50/70"
                      >
                        {/* Aset Gastronomi */}
                        <td className="py-3.5 pl-6 pr-4">
                          <div className="flex items-center gap-3 min-w-[220px]">
                            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-stone-200/60 bg-stone-100">
                              <img
                                src={asset.image}
                                alt={asset.name}
                                className="h-full w-full object-cover"
                              />
                              {asset.type === "Multimedia" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#3B1E14] shadow-xs">
                                    <Play size={10} className="fill-[#3B1E14] ml-0.5" />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-[#3B1E14] text-sm truncate">
                                {asset.name}
                              </p>
                              {asset.subLabel && (
                                <p className="text-[10px] text-stone-400 font-medium">
                                  {asset.subLabel}
                                </p>
                              )}
                              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-stone-500">
                                <MapPin size={11} className="text-[#C98A2E] shrink-0" />
                                <span className="truncate">{asset.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contributor */}
                        <td className="px-4 py-3.5 min-w-[150px]">
                          <p className="font-semibold text-stone-800">{asset.contributor}</p>
                          <p className="text-[11px] text-stone-400">{asset.email}</p>
                        </td>

                        {/* Kategori */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${getCategoryStyle(
                              asset.type
                            )}`}
                          >
                            {asset.type}
                          </span>
                        </td>

                        {/* Lokasi */}
                        <td className="px-4 py-3.5 whitespace-nowrap font-medium text-stone-700">
                          {asset.location}
                        </td>

                        {/* Tanggal Publikasi */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-stone-700">
                            <CalendarDays size={13} className="text-stone-400" />
                            <span>{asset.publishedAt}</span>
                          </div>
                          <p className="mt-0.5 pl-4.5 text-[11px] text-stone-400">
                            {asset.publishedTime}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 size={13} className="text-emerald-600" />
                            {asset.status}
                          </span>
                        </td>

                        {/* Aksi */}
                        <td className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap relative">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleAction("Lihat Aset", asset)}
                              className="inline-flex items-center gap-1 rounded-xl bg-[#3B1E14] px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#2A150E] cursor-pointer"
                            >
                              <span>Lihat Aset</span>
                              <ChevronRight size={13} />
                            </button>

                            {/* Dropdown Menu Toggle */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveDropdownId(
                                    activeDropdownId === asset.id ? null : asset.id
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 cursor-pointer"
                              >
                                <MoreVertical size={15} />
                              </button>

                              {activeDropdownId === asset.id && (
                                <div className="absolute right-0 top-8 z-30 w-40 rounded-xl border border-stone-200 bg-white py-1.5 shadow-lg text-left">
                                  <button
                                    type="button"
                                    onClick={() => handleAction("Lihat Detail", asset)}
                                    className="flex w-full items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer"
                                  >
                                    <Eye size={13} className="text-stone-400" />
                                    <span>Lihat Detail</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAction("Edit Metadata", asset)}
                                    className="flex w-full items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer"
                                  >
                                    <Edit size={13} className="text-stone-400" />
                                    <span>Edit Metadata</span>
                                  </button>
                                  <div className="my-1 border-t border-stone-100" />
                                  <button
                                    type="button"
                                    onClick={() => handleAction("Arsipkan", asset)}
                                    className="flex w-full items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 cursor-pointer"
                                  >
                                    <Archive size={13} className="text-rose-500" />
                                    <span>Arsipkan</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAGINATION BAR */}
            <div className="flex flex-col gap-3 border-t border-stone-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between text-xs text-stone-500">
              <p>
                Menampilkan{" "}
                <span className="font-semibold text-stone-800">
                  {totalFilteredCount === 0 ? 0 : startIndex + 1}
                </span>{" "}
                -{" "}
                <span className="font-semibold text-stone-800">
                  {Math.min(startIndex + itemsPerPage, totalFilteredCount)}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-stone-800">
                  {totalFilteredCount}
                </span>{" "}
                aset
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                        currentPage === page
                          ? "bg-[#3B1E14] text-white"
                          : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="appearance-none rounded-lg border border-stone-200 bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:outline-hidden cursor-pointer"
                  >
                    <option value={6}>6 / halaman</option>
                    <option value={10}>10 / halaman</option>
                    <option value={20}>20 / halaman</option>
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

      {/* MODAL: LIHAT DETAIL */}
      {viewModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-[#3B1E14]">
                Detail Aset Gastronomi
              </h3>
              <button
                type="button"
                onClick={() => setViewModalAsset(null)}
                className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-4 text-xs">
              <div className="relative h-48 w-full overflow-hidden rounded-xl bg-stone-100">
                <img
                  src={viewModalAsset.image}
                  alt={viewModalAsset.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-stone-400">Nama Aset</p>
                  <p className="font-semibold text-stone-800">{viewModalAsset.name}</p>
                </div>
                <div>
                  <p className="text-stone-400">Kategori</p>
                  <p className="font-semibold text-stone-800">{viewModalAsset.type}</p>
                </div>
                <div>
                  <p className="text-stone-400">Contributor</p>
                  <p className="font-semibold text-stone-800">
                    {viewModalAsset.contributor} ({viewModalAsset.email})
                  </p>
                </div>
                <div>
                  <p className="text-stone-400">Lokasi</p>
                  <p className="font-semibold text-stone-800">{viewModalAsset.location}</p>
                </div>
                <div>
                  <p className="text-stone-400">Tanggal Publikasi</p>
                  <p className="font-semibold text-stone-800">
                    {viewModalAsset.publishedAt} - {viewModalAsset.publishedTime}
                  </p>
                </div>
                <div>
                  <p className="text-stone-400">Status</p>
                  <p className="font-semibold text-emerald-600">
                    {viewModalAsset.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setViewModalAsset(null)}
                className="rounded-xl bg-stone-100 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT METADATA */}
      {editModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEdit}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-[#3B1E14]">
                Edit Metadata Aset
              </h3>
              <button
                type="button"
                onClick={() => setEditModalAsset(null)}
                className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-700">Nama Aset</label>
                <input
                  type="text"
                  value={editModalAsset.name}
                  onChange={(e) =>
                    setEditModalAsset({ ...editModalAsset, name: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-stone-200 p-2.5 text-xs focus:border-[#3B1E14] focus:outline-hidden"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-stone-700">Kategori</label>
                <select
                  value={editModalAsset.type}
                  onChange={(e) =>
                    setEditModalAsset({ ...editModalAsset, type: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-stone-200 p-2.5 text-xs focus:border-[#3B1E14] focus:outline-hidden"
                >
                  <option value="Kuliner">Kuliner</option>
                  <option value="Budaya">Budaya</option>
                  <option value="Bahan">Bahan</option>
                  <option value="Destinasi">Destinasi</option>
                  <option value="Multimedia">Multimedia</option>
                  <option value="Agenda Gastronomi">Agenda Gastronomi</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-stone-700">Contributor</label>
                <input
                  type="text"
                  value={editModalAsset.contributor}
                  onChange={(e) =>
                    setEditModalAsset({
                      ...editModalAsset,
                      contributor: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-stone-200 p-2.5 text-xs focus:border-[#3B1E14] focus:outline-hidden"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-stone-700">Lokasi</label>
                <input
                  type="text"
                  value={editModalAsset.location}
                  onChange={(e) =>
                    setEditModalAsset({ ...editModalAsset, location: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-stone-200 p-2.5 text-xs focus:border-[#3B1E14] focus:outline-hidden"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditModalAsset(null)}
                className="rounded-xl border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#3B1E14] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2A150E]"
              >
                <Save size={13} />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: ARSIPKAN */}
      {archiveModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="mt-3 font-serif text-base font-bold text-stone-900">
              Arsipkan Aset Ini?
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Aset <span className="font-semibold text-stone-800">"{archiveModalAsset.name}"</span> akan dipindahkan ke arsip dan tidak ditampilkan secara publik.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setArchiveModalAsset(null)}
                className="rounded-xl border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmArchive}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Ya, Arsipkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}