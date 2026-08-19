import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  Search,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Clock,
  Utensils,
  MapPin,
  ArrowRight,
  Grid,
  Droplet,
  Box,
  Cloud,
  Flame,
  SlidersHorizontal,
  Play,
  FileText,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Dummy image placeholder or use your assets
import heroImage from "../assets/explore-hero.jpg"; // atau ganti sesuai aset Anda

export default function MolecularGastronomy() {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Teknik");
  const [activeTab, setActiveTab] = useState("Foto");

  // =========================================================
  // MOCK DATA
  // =========================================================
  const categories = [
    { label: "Semua Teknik", icon: Grid, active: true },
    { label: "Spherification", icon: Droplet },
    { label: "Emulsification", icon: SlidersHorizontal },
    { label: "Gelification", icon: Box },
    { label: "Foams", icon: Cloud },
    { label: "Dehydration", icon: Flame },
    { label: "Sous-vide", icon: Utensils },
    { label: "Lainnya", icon: Sparkles },
  ];

  const popularTechniques = [
    {
      id: 1,
      title: "Spherification",
      description:
        "Membentuk cairan menjadi bola atau kaviar berlapis tipis menggunakan alginat.",
      difficulty: "Sedang",
      image: heroImage,
    },
    {
      id: 2,
      title: "Emulsification",
      description:
        "Menggabungkan dua cairan yang tidak dapat menyatu menjadi emulsi stabil.",
      difficulty: "Tinggi",
      image: heroImage,
    },
    {
      id: 3,
      title: "Gelification",
      description:
        "Mengubah cairan menjadi gel menggunakan hidrokoloid seperti agar, gelatin, atau xanthan.",
      difficulty: "Sedang",
      image: heroImage,
    },
    {
      id: 4,
      title: "Foams",
      description:
        "Menciptakan tekstur buih ringan menggunakan lecithin atau whipping agent lainnya.",
      difficulty: "Sedang",
      image: heroImage,
    },
    {
      id: 5,
      title: "Dehydration",
      description:
        "Menghilangkan kandungan air untuk menghasilkan tekstur renyah dan intens rasa.",
      difficulty: "Mudah",
      image: heroImage,
    },
  ];

  const relatedAssets = [
    {
      id: 1,
      title: "Bebek Betutu",
      category: "Kuliner Tradisional Bali",
      location: "Gianyar, Bali",
      image: heroImage,
    },
    {
      id: 2,
      title: "Sate Lilit Bali",
      category: "Kuliner Tradisional Bali",
      location: "Denpasar, Bali",
      image: heroImage,
    },
    {
      id: 3,
      title: "Jaje Bali Modern",
      category: "Kuliner Kontemporer",
      location: "Bali",
      image: heroImage,
    },
    {
      id: 4,
      title: "Es Daluman Molekuler",
      category: "Minuman Tradisional",
      location: "Bali",
      image: heroImage,
    },
  ];

  const processImages = [
    heroImage,
    heroImage,
    heroImage,
    heroImage,
    heroImage,
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Logic pencarian teknik molekuler
  };

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-[#3B1E14] antialiased">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <div className="mb-5 flex items-center gap-2 text-xs text-[#78716C]">
          <button
            type="button"
            onClick={() => goTo("/")}
            className="transition hover:text-[#3B1E14]"
          >
            Beranda
          </button>
          <ChevronRight size={12} />
          <span className="font-semibold text-[#3B1E14]">
            Molecular Gastronomy
          </span>
        </div>

        {/* HERO SECTION */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-[#E7E1DA] bg-white">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#F7F2EC] to-transparent pointer-events-none" />

          <div className="relative flex flex-col justify-between gap-8 p-6 sm:p-10 lg:flex-row lg:items-center">
            {/* HERO TEXT */}
            <div className="max-w-xl">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#3B1E14] sm:text-4xl lg:text-5xl">
                Molecular Gastronomy
              </h1>
              <p className="mt-2 text-base font-semibold text-[#C98A2E] sm:text-lg">
                Seni, Sains, dan Inovasi dalam Kuliner
              </p>
              <p className="mt-3 text-xs leading-relaxed text-[#78716C] sm:text-sm">
                Eksplorasi teknik, bahan, dan eksperimen gastronomi molekuler yang
                menggabungkan ilmu pengetahuan dan kreativitas untuk menciptakan
                pengalaman kuliner yang unik dan inovatif.
              </p>

              {/* SEARCH BAR */}
              <form
                onSubmit={handleSearch}
                className="mt-6 flex items-center rounded-2xl border border-[#E7E1DA] bg-white p-2 shadow-sm transition focus-within:border-[#C98A2E] focus-within:ring-2 focus-within:ring-[#C98A2E]/20"
              >
                <div className="pl-3 text-[#78716C]">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari teknik, bahan, atau eksperimen..."
                  className="w-full bg-transparent px-3 py-2 text-xs text-[#3B1E14] outline-none placeholder:text-stone-400 sm:text-sm"
                />
                <button
                  type="submit"
                  className="flex h-10 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3B1E14] text-white transition hover:bg-[#5A3828]"
                >
                  <Search size={17} />
                </button>
              </form>
            </div>

            {/* HERO IMAGE */}
            <div className="relative flex items-center justify-center">
              <div className="absolute bottom-0 h-24 w-72 rounded-full bg-[#C98A2E]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-[#E7E1DA] shadow-md">
                <img
                  src={heroImage}
                  alt="Molecular Gastronomy Hero"
                  className="h-52 w-full object-cover sm:h-60 sm:w-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* KATEGORI TEKNIK */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-bold text-[#3B1E14] sm:text-base">
            Kategori Teknik
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat, index) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.label;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`flex shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border px-5 py-4 transition shadow-sm w-32 h-28 ${
                    isSelected
                      ? "border-[#3B1E14] bg-[#3B1E14] text-white"
                      : "border-[#E7E1DA] bg-white text-stone-700 hover:border-[#C98A2E]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isSelected
                        ? "bg-white/10 text-[#C98A2E]"
                        : "bg-[#F7F2EC] text-[#C98A2E]"
                    }`}
                  >
                    <IconComp size={20} />
                  </div>
                  <span className="text-xs font-semibold text-center truncate w-full">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* TEKNIK POPULER */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#3B1E14] sm:text-lg">
              Teknik Populer
            </h2>
            <button
              type="button"
              onClick={() => goTo("/explore")}
              className="flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:underline"
            >
              Lihat semua teknik
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none">
              {popularTechniques.map((tech) => (
                <div
                  key={tech.id}
                  className="w-72 shrink-0 rounded-2xl border border-[#E7E1DA] bg-white p-3 shadow-sm transition hover:border-[#C98A2E] hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={tech.image}
                        alt={tech.title}
                        className="h-40 w-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-stone-700 backdrop-blur-sm transition hover:bg-white"
                      >
                        <Bookmark size={15} />
                      </button>
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-[#3B1E14]">
                      {tech.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-600 line-clamp-2">
                      {tech.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                    <span className="text-[11px] text-stone-500">
                      Tingkat Kesulitan
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                        tech.difficulty === "Tinggi"
                          ? "bg-red-50 text-red-600"
                          : tech.difficulty === "Sedang"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {tech.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EKSPERIMEN UNGGULAN (BANNER) */}
        <section className="mb-12 overflow-hidden rounded-3xl border border-[#E7E1DA] bg-white p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6 overflow-hidden rounded-2xl">
              <img
                src={heroImage}
                alt="Nitro Smoked Salmon"
                className="h-64 w-full object-cover sm:h-72"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between p-2">
              <div>
                <span className="inline-block rounded-md border border-[#C98A2E]/20 bg-[#F7F2EC] px-2.5 py-1 text-[11px] font-semibold text-[#C98A2E]">
                  Eksperimen Unggulan
                </span>

                <h3 className="mt-3 font-serif text-2xl font-bold text-[#3B1E14] sm:text-3xl">
                  Nitro Smoked Salmon
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-sm">
                  Teknik pengasapan dingin menggunakan nitrogen cair untuk
                  menciptakan aroma asap tanpa panas, mempertahankan tekstur
                  lembut dan warna alami.
                </p>

                <div className="mt-4 flex items-center gap-6 text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#C98A2E]" />
                    <span>45 Menit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#C98A2E]" />
                    <span>Tingkat Kesulitan: Sedang</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                <button
                  type="button"
                  onClick={() => goTo("/explore")}
                  className="flex items-center gap-2 rounded-xl bg-[#3B1E14] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5A3828]"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight size={14} />
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7E1DA] bg-white text-stone-700 transition hover:bg-stone-50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7E1DA] bg-white text-stone-700 transition hover:bg-stone-50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TERKAIT DENGAN ASET KULINER */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#3B1E14] sm:text-lg">
              Terkait dengan Aset Kuliner
            </h2>
            <button
              type="button"
              onClick={() => goTo("/explore")}
              className="flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:underline"
            >
              Lihat semua aset terkait
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedAssets.map((asset) => (
              <div
                key={asset.id}
                className="rounded-2xl border border-[#E7E1DA] bg-white p-3 shadow-sm transition hover:border-[#C98A2E] hover:shadow-md"
              >
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="h-36 w-full rounded-xl object-cover"
                />
                <div className="mt-3">
                  <span className="inline-block rounded-md border border-[#C98A2E]/20 bg-[#F7F2EC] px-2 py-0.5 text-[10px] font-semibold text-[#5A3828]">
                    {asset.category}
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold text-[#3B1E14] truncate">
                    {asset.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-stone-500">
                    <MapPin size={12} className="text-[#C98A2E]" />
                    <span>{asset.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROSES & EKSPERIMEN */}
        <section className="mb-12">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-base font-bold text-[#3B1E14] sm:text-lg">
              Proses & Eksperimen
            </h2>

            <div className="flex items-center justify-between gap-4">
              {/* TABS */}
              <div className="flex rounded-xl border border-[#E7E1DA] bg-white p-1 shadow-sm">
                {["Foto", "Video", "Dokumentasi"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      activeTab === tab
                        ? "bg-[#3B1E14] text-white"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo("/explore")}
                  className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:underline"
                >
                  Lihat semua multimedia
                </button>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E7E1DA] bg-white text-stone-700 transition hover:bg-stone-50"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E7E1DA] bg-white text-stone-700 transition hover:bg-stone-50"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {processImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-[#E7E1DA] bg-white shadow-sm"
              >
                <img
                  src={img}
                  alt={`Proses ${idx + 1}`}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#3B1E14] shadow-md">
                    <Play size={16} className="fill-current" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}