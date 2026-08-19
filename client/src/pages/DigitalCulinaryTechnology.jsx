import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid2X2,
  ChefHat,
  Wrench,
  Monitor,
  Sparkles,
  Search,
  ChevronRight,
  Bookmark,
  User,
  ArrowRight,
  Shuffle,
  TrendingUp,
  Blend,
  Lightbulb,
  FileText,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Leaf,
  Compass,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Dummy image placeholder or asset
import heroImage from "../assets/explore-hero.jpg"; // Sesuaikan jalur aset Anda

// ==========================================
// DATA DUMMY
// ==========================================
const technologyCategories = [
  { id: "semua", label: "Semua Teknologi", icon: Grid2X2 },
  { id: "cooking", label: "Digital Cooking Technology", icon: ChefHat },
  { id: "tools", label: "Digital Culinary Tools", icon: Wrench },
  { id: "software", label: "Culinary Software", icon: Monitor },
  { id: "creative", label: "Creative Culinary Design", icon: Sparkles },
];

const cookingTechnologies = [
  {
    id: 1,
    title: "Laser Cooking",
    category: "cooking",
    description:
      "Memasak menggunakan laser untuk presisi tinggi, tekstur unik, dan rasa yang konsisten.",
    difficulty: "Tinggi",
    badge: "Baru",
    image: heroImage,
  },
  {
    id: 2,
    title: "3D Food Printing",
    category: "cooking",
    description:
      "Mencetak makanan lapis demi lapis dengan bahan edible untuk desain yang presisi dan kreatif.",
    difficulty: "Sedang",
    image: heroImage,
  },
  {
    id: 3,
    title: "CNC Milling",
    category: "cooking",
    description:
      "Memahat bahan makanan dengan presisi tinggi menggunakan mesin CNC.",
    difficulty: "Tinggi",
    image: heroImage,
  },
  {
    id: 4,
    title: "3D Scanning",
    category: "cooking",
    description:
      "Memindai bentuk dan tekstur makanan untuk dokumentasi dan replikasi digital.",
    difficulty: "Sedang",
    image: heroImage,
  },
];

const culinaryTools = [
  {
    id: 1,
    title: "Modular Molds",
    category: "tools",
    description:
      "Cetakan modular yang dapat dirakit ulang untuk berbagai bentuk dan kreasi.",
    image: heroImage,
  },
  {
    id: 2,
    title: "Variable Molds",
    category: "tools",
    description:
      "Cetakan dengan variabel ukuran dan bentuk untuk fleksibilitas kreatif tanpa batas.",
    image: heroImage,
  },
  {
    id: 3,
    title: "Pick-and-Place Technology",
    category: "tools",
    description:
      "Teknologi robotik untuk menempatkan komponen makanan dengan presisi tinggi.",
    image: heroImage,
  },
];

const culinarySoftware = [
  {
    id: 1,
    title: "Dish Design Software",
    category: "software",
    description:
      "Merancang plating, kombinasi bahan, tekstur, dan komposisi visual secara digital sebelum eksekusi.",
    image: heroImage,
  },
  {
    id: 2,
    title: "Digital Gastronomy Pipeline",
    category: "software",
    description:
      "Alur kerja digital terintegrasi dari ide, perancangan, produksi, hingga evaluasi dan dokumentasi.",
    isPipeline: true,
  },
];

const creativeDesigns = [
  {
    id: 1,
    title: "Variation",
    category: "creative",
    description:
      "Membuat variasi rasa, tekstur, dan presentasi dari suatu hidangan untuk eksplorasi kreatif.",
    icon: Shuffle,
  },
  {
    id: 2,
    title: "Progression",
    category: "creative",
    description:
      "Mengembangkan hidangan secara bertahap dari konsep sederhana ke bentuk yang lebih kompleks.",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Morphing",
    category: "creative",
    description:
      "Mengubah bentuk, struktur, atau tekstur makanan untuk pengalaman kuliner yang dinamis.",
    icon: Blend,
  },
];

const featuredProjects = [
  {
    id: 1,
    title: "Spherification Dessert",
    description: "Menggunakan teknik spherification dengan 3D food printing.",
    chef: "Chef Andika",
    image: heroImage,
  },
  {
    id: 2,
    title: "Laser Cooked Tuna",
    description: "Teknik laser cooking untuk tekstur sempurna pada tuna.",
    chef: "Chef Juna",
    image: heroImage,
  },
  {
    id: 3,
    title: "Geo-Sous Vide",
    description:
      "Kombinasi sous-vide dan gelification dengan plating modern.",
    chef: "Chef Renata",
    image: heroImage,
  },
  {
    id: 4,
    title: "3D Printed Chocolate",
    description: "Cokelat dengan desain kompleks menggunakan 3D food printing.",
    chef: "Chef Arif",
    image: heroImage,
  },
  {
    id: 5,
    title: "Dehydrated Fruit Foam",
    description: "Foam dari buah kering dengan teknik dehydrated powder.",
    chef: "Chef Vindex",
    image: heroImage,
  },
];

const benefits = [
  {
    title: "Inovasi Tanpa Batas",
    description: "Mendorong kreativitas dan eksplorasi dalam teknologi kuliner.",
    icon: Lightbulb,
  },
  {
    title: "Presisi Tinggi",
    description: "Teknologi digital memberikan kontrol dan konsistensi maksimal.",
    icon: Compass,
  },
  {
    title: "Dokumentasi Digital",
    description: "Setiap proses dan hasil dapat didokumentasikan dengan akurat.",
    icon: FileText,
  },
  {
    title: "Berkelanjutan",
    description: "Teknologi membantu efisiensi sumber daya dan praktik ramah lingkungan.",
    icon: Leaf,
  },
];

export default function DigitalCulinaryTechnology() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState({});

  const toggleBookmark = (id, type) => {
    const key = `${type}-${id}`;
    setBookmarks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDetailClick = (id) => {
    navigate(`/digital-culinary-technology/${id}`);
  };

  // Filter logic based on search and category
  const query = searchQuery.toLowerCase();
  
  const filteredCooking = cookingTechnologies.filter(
    (item) =>
      (activeCategory === "semua" || activeCategory === "cooking") &&
      (item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query))
  );

  const filteredTools = culinaryTools.filter(
    (item) =>
      (activeCategory === "semua" || activeCategory === "tools") &&
      (item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query))
  );

  const filteredSoftware = culinarySoftware.filter(
    (item) =>
      (activeCategory === "semua" || activeCategory === "software") &&
      (item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query))
  );

  const filteredCreative = creativeDesigns.filter(
    (item) =>
      (activeCategory === "semua" || activeCategory === "creative") &&
      (item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query))
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-stone-800">
      {/* NAVBAR */}
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <div className="mb-5 flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-[#3B1E14]">
            Beranda
          </Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-[#3B1E14]">
            Teknologi Digital Kuliner
          </span>
        </div>

        {/* HERO SECTION */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-gradient-to-l from-[#F9F1E5]/40 to-transparent lg:block pointer-events-none" />
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 z-10">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#3B1E14] sm:text-4xl lg:text-5xl">
                Digital Culinary Technology
              </h1>
              <p className="mt-2 text-base font-semibold text-[#C98A2E] sm:text-lg">
                Inovasi Teknologi untuk Masa Depan Kuliner
              </p>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600">
                Eksplorasi teknologi digital yang menggabungkan seni, sains, dan
                teknologi untuk menciptakan pengalaman kuliner yang inovatif,
                presisi, dan berkelanjutan.
              </p>

              {/* SEARCH BAR */}
              <div className="mt-6 flex items-center rounded-2xl border border-stone-200 bg-white p-2 shadow-sm transition focus-within:border-[#C98A2E]">
                <div className="pl-3 text-stone-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari teknologi, alat, software, atau teknik..."
                  className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-stone-800 outline-none placeholder:text-stone-400"
                />
                <button
                  type="button"
                  className="flex h-10 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3B1E14] text-white transition hover:bg-[#6B2E1E]"
                >
                  <Search size={17} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative z-10">
              <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
                <img
                  src={heroImage}
                  alt="Digital Culinary Technology Hero"
                  className="h-64 sm:h-80 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* KATEGORI TEKNOLOGI */}
        <section className="mb-12">
          <h2 className="mb-4 text-base font-bold text-[#3B1E14] sm:text-lg">
            Kategori Teknologi
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {technologyCategories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition shadow-sm text-center ${
                    isActive
                      ? "border-[#3B1E14] bg-[#3B1E14] text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-[#C98A2E]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-white/10 text-[#C98A2E]"
                        : "bg-[#F9F1E5] text-[#C98A2E]"
                    }`}
                  >
                    <IconComp size={20} />
                  </div>
                  <span className="text-xs font-semibold leading-tight">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* DIGITAL COOKING TECHNOLOGY */}
        {(activeCategory === "semua" || activeCategory === "cooking") &&
          filteredCooking.length > 0 && (
            <section className="mb-12">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#3B1E14] sm:text-lg">
                  Digital Cooking Technology
                </h2>
                <Link
                  to="/digital-culinary-technology"
                  className="flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:underline"
                >
                  Lihat semua teknologi cooking →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredCooking.map((tech) => {
                  const isBookmarked = bookmarks[`cooking-${tech.id}`];
                  return (
                    <div
                      key={tech.id}
                      className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:border-[#C98A2E] hover:shadow-md"
                    >
                      <div>
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={tech.image}
                            alt={tech.title}
                            className="h-40 w-full object-cover"
                          />
                          {tech.badge && (
                            <span className="absolute left-2 top-2 rounded-md bg-[#3B1E14] px-2 py-0.5 text-[10px] font-semibold text-white">
                              {tech.badge}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleBookmark(tech.id, "cooking")}
                            className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition ${
                              isBookmarked
                                ? "bg-[#C98A2E] text-white"
                                : "bg-white/80 text-stone-700 hover:bg-white"
                            }`}
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
                        <span className="text-[11px] text-stone-400">
                          Tingkat Kesulitan
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                            tech.difficulty === "Tinggi"
                              ? "bg-red-50 text-red-600"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {tech.difficulty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        {/* DIGITAL CULINARY TOOLS */}
        {(activeCategory === "semua" || activeCategory === "tools") &&
          filteredTools.length > 0 && (
            <section className="mb-12">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#3B1E14] sm:text-lg">
                  Digital Culinary Tools
                </h2>
                <Link
                  to="/digital-culinary-technology"
                  className="flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:underline"
                >
                  Lihat semua tools →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-[#C98A2E] hover:shadow-md"
                  >
                    <img
                      src={tool.image}
                      alt={tool.title}
                      className="h-28 w-full sm:w-28 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <h3 className="text-sm font-bold text-[#3B1E14]">
                          {tool.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-stone-600">
                          {tool.description}
                        </p>
                      </div>
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => handleDetailClick(tool.id)}
                          className="rounded-xl border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-[#3B1E14] hover:text-white"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* CULINARY SOFTWARE */}
        {(activeCategory === "semua" || activeCategory === "software") &&
          filteredSoftware.length > 0 && (
            <section className="mb-12">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#3B1E14] sm:text-lg">
                  Culinary Software
                </h2>
                <Link
                  to="/digital-culinary-technology"
                  className="flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:underline"
                >
                  Lihat semua software →
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Dish Design Software */}
                <div className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#C98A2E]">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9F1E5] text-[#C98A2E]">
                        <Monitor size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#3B1E14]">
                          Dish Design Software
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-stone-600">
                          Merancang plating, kombinasi bahan, warna, tekstur, dan
                          komposisi visual secara digital sebelum eksekusi.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 overflow-hidden rounded-xl border border-stone-100 bg-stone-50 p-2">
                      <img
                        src={heroImage}
                        alt="Dish Design Software Mockup"
                        className="h-32 w-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <button
                      type="button"
                      onClick={() => handleDetailClick("dish-design")}
                      className="rounded-xl border border-stone-200 px-4 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-[#3B1E14] hover:text-white"
                    >
                      Detail
                    </button>
                  </div>
                </div>

                {/* Digital Gastronomy Pipeline */}
                <div className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#C98A2E]">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9F1E5] text-[#C98A2E]">
                        <Cpu size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#3B1E14]">
                          Digital Gastronomy Pipeline
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-stone-600">
                          Alur kerja digital terintegrasi dari ide, perancangan,
                          produksi, hingga evaluasi dan dokumentasi.
                        </p>
                      </div>
                    </div>

                    {/* Pipeline Flow Visual */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#FAFAFA] p-4 border border-stone-100 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm text-[#C98A2E] border border-stone-200">
                          <Lightbulb size={14} />
                        </div>
                        <span className="mt-1 text-[10px] font-semibold text-stone-700">
                          Ide & Riset
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-stone-400" />
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm text-[#C98A2E] border border-stone-200">
                          <Monitor size={14} />
                        </div>
                        <span className="mt-1 text-[10px] font-semibold text-stone-700">
                          Desain
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-stone-400" />
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm text-[#C98A2E] border border-stone-200">
                          <ChefHat size={14} />
                        </div>
                        <span className="mt-1 text-[10px] font-semibold text-stone-700">
                          Produksi
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-stone-400" />
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm text-[#C98A2E] border border-stone-200">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="mt-1 text-[10px] font-semibold text-stone-700">
                          Evaluasi
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-stone-400" />
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm text-[#C98A2E] border border-stone-200">
                          <FileText size={14} />
                        </div>
                        <span className="mt-1 text-[10px] font-semibold text-stone-700">
                          Dokumentasi
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <button
                      type="button"
                      onClick={() => handleDetailClick("pipeline")}
                      className="rounded-xl border border-stone-200 px-4 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-[#3B1E14] hover:text-white"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

        {/* CREATIVE CULINARY DESIGN */}
        {(activeCategory === "semua" || activeCategory === "creative") &&
          filteredCreative.length > 0 && (
            <section className="mb-12">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#3B1E14] sm:text-lg">
                  Creative Culinary Design
                </h2>
                <Link
                  to="/digital-culinary-technology"
                  className="flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:underline"
                >
                  Lihat semua konsep desain →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {filteredCreative.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#C98A2E]"
                    >
                      <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F9F1E5] text-[#C98A2E]">
                          <IconComp size={20} />
                        </div>
                        <h3 className="mt-4 text-base font-bold text-[#3B1E14]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-stone-600">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-6 pt-2">
                        <button
                          type="button"
                          onClick={() => handleDetailClick(item.id)}
                          className="rounded-xl border border-stone-200 px-4 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-[#3B1E14] hover:text-white"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        {/* INSPIRASI & PROYEK UNGGULAN */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#3B1E14] sm:text-lg">
              Inspirasi & Proyek Unggulan
            </h2>
            <Link
              to="/digital-culinary-technology"
              className="flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:underline"
            >
              Lihat semua proyek →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:border-[#C98A2E] hover:shadow-md"
              >
                <div>
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-36 w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 text-xs font-bold text-[#3B1E14] line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-stone-600 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 border-t border-stone-100 pt-3 text-[11px] text-stone-500">
                  <User size={13} className="text-[#C98A2E]" />
                  <span className="font-semibold text-stone-700">
                    {project.chef}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BENEFIT STRIP */}
        <section className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9F1E5] text-[#C98A2E]">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#3B1E14] sm:text-sm">
                      {benefit.title}
                    </h4>
                    <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-stone-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}