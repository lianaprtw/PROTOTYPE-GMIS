import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  CalendarDays,
  BookOpen,
  Utensils,
  Landmark,
  CookingPot,
  Image as ImageIcon,
  MapPin,
  ArrowRight,
} from "lucide-react";

import CategoryCard from "../components/CategoryCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CulinaryCard from "../components/CulinaryCard";

import lawarBali from "../assets/lawar-bali.jpg";
import megibung from "../assets/megibung.jpg";
import bebekBetutu from "../assets/bebek-betutu.jpeg";
import jajeBali from "../assets/jaje-bali.jpg";
import jatiluwih from "../assets/jatiluwih.jpg";
import kunyitLengkuas from "../assets/kunyit-lengkuas.jpeg";
import berasMerah from "../assets/beras-merah.jpg";
import basaGenep from "../assets/basa-genep.jpg";
import ubudFood from "../assets/ubud-food.jpg";
import exploreHero from "../assets/explore-hero.jpg";

const Explore = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /* =====================================================
      STATE MANAGEMENT
  ====================================================== */
  const queryParam = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "Semua";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  // Sync state dengan URL query params
  useEffect(() => {
    setSearchQuery(queryParam);
    setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  /* =====================================================
      DATA KATEGORI
  ====================================================== */
  const categories = [
    {
      id: "Culinary",
      icon: Utensils,
      title: "Informasi Kuliner",
      description:
        "Informasi berbagai makanan, bahan, dan minuman khas Bali.",
      items: 128,
      bgColor: "bg-[#F9F1E5]",
    },
    {
      id: "Culture",
      icon: Landmark,
      title: "Informasi Budaya",
      description:
        "Sejarah, makna budaya, tradisi, dan identitas kuliner Bali.",
      items: 86,
      bgColor: "bg-[#F1F4E9]",
    },
    {
      id: "Ingredient",
      icon: CookingPot,
      title: "Bahan",
      description:
        "Informasi berbagai bahan makanan dan rempah khas Nusantara.",
      items: 214,
      bgColor: "bg-[#F9EEEE]",
    },
    {
      id: "Agenda",
      icon: CalendarDays,
      title: "Agenda Gastronomi",
      description:
        "Jadwal festival kuliner, acara budaya, dan kegiatan mendatang.",
      items: 42,
      bgColor: "bg-[#FEF6E4]",
    },
    {
      id: "Multimedia",
      icon: ImageIcon,
      title: "Multimedia",
      description:
        "Foto, video, dan dokumentasi visual kekayaan kuliner dan budaya.",
      items: 156,
      bgColor: "bg-[#F2EEF8]",
    },
    {
      id: "Destination",
      icon: MapPin,
      title: "Destinasi",
      description:
        "Destinasi dan lokasi wisata kuliner terbaik di Bali.",
      items: 73,
      bgColor: "bg-[#EAF3F6]",
    },
  ];

  /* =====================================================
      DATA KONTEN UTAMA (Dengan ID Unik)
  ====================================================== */
  const latestContents = [
    {
      id: "lawar-bali",
      image: lawarBali,
      title: "Lawar Bali",
      category: "Culinary",
      description:
        "Hidangan tradisional Bali yang kaya akan rempah dan memiliki makna budaya yang mendalam.",
      date: "12 Mei 2024",
      views: 245,
    },
    {
      id: "upacara-megibung",
      image: megibung,
      title: "Upacara Megibung",
      category: "Culture",
      description:
        "Tradisi makan bersama sebagai bentuk syukur dan mempererat tali persaudaraan.",
      date: "10 Mei 2024",
      views: 189,
    },
    {
      id: "base-genep-bali",
      image: basaGenep,
      title: "Base Genep Bali",
      category: "Ingredient",
      description:
        "Racikan bumbu dasar khas Bali dari 15 jenis rempah pilihan penentu cita rasa autentik.",
      date: "9 Mei 2024",
      views: 412,
    },
    {
      id: "bebek-betutu",
      image: bebekBetutu,
      title: "Bebek Betutu",
      category: "Culinary",
      description:
        "Resep bebek betutu khas Gilimanuk dengan bumbu base genep yang meresap sempurna.",
      date: "8 Mei 2024",
      views: 321,
    },
    {
      id: "festival-kuliner-bali-2024",
      image: ubudFood,
      title: "Festival Kuliner Bali 2024",
      category: "Agenda",
      description:
        "Perayaan ragam kuliner tradisional Nusantara yang menghadirkan demonstrasi masak dan pasar jajanan.",
      date: "20 Mei 2024",
      views: 520,
    },
    {
      id: "kunyit-lengkuas",
      image: kunyitLengkuas,
      title: "Kunyit & Lengkuas",
      category: "Ingredient",
      description:
        "Rempah rimpang penyedap alami dan penyempurna warna khas dalam berbagai masakan tradisi.",
      date: "7 Mei 2024",
      views: 298,
    },
    {
      id: "proses-pembuatan-jaje-bali",
      image: jajeBali,
      title: "Proses Pembuatan Jaje Bali",
      category: "Multimedia",
      description:
        "Video dokumentasi proses pembuatan jaje tradisional Bali yang autentik.",
      date: "6 Mei 2024",
      views: 156,
    },
    {
      id: "ubud-gianyar",
      image: jatiluwih,
      title: "Ubud, Gianyar, Bali",
      category: "Destination",
      description:
        "Destinasi wisata dengan pemandangan sawah terasering dan kuliner lokal yang autentik.",
      date: "5 Mei 2024",
      views: 112,
    },
    {
      id: "beras-merah-jatiluwih",
      image: berasMerah,
      title: "Beras Merah Jatiluwih",
      category: "Ingredient",
      description:
        "Beras lokal Bali organik hasil sistem pertanian tradisional Subak yang kaya akan nutrisi.",
      date: "4 Mei 2024",
      views: 175,
    },
  ];

  /* =====================================================
      EVENT HANDLERS & NAVIGATION
  ====================================================== */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (selectedCategory !== "Semua") params.set("category", selectedCategory);
    setSearchParams(params);
  };

  const handleCategoryClick = (categoryId) => {
    const newCategory = selectedCategory === categoryId ? "Semua" : categoryId;
    setSelectedCategory(newCategory);

    const params = new URLSearchParams(searchParams);
    if (newCategory !== "Semua") {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
    setSearchParams({});
  };

  const handleViewGuide = () => {
    navigate("/guide");
  };

  const handleCardClick = (item) => {
    switch (item.category) {
      case "Culture":
        navigate(`/culture/${item.id}`);
        break;
      case "Culinary":
      case "Recipe":
        navigate(`/culinary/${item.id}`);
        break;
      case "Ingredient":
        navigate(`/ingredient/${item.id}`);
        break;
      case "Agenda":
        navigate(`/agenda/${item.id}`);
        break;
      case "Destination":
        navigate(`/destination/${item.id}`);
        break;
      case "Multimedia":
        navigate(`/multimedia/${item.id}`);
        break;

      default:
        navigate(`/culinary/${item.id}`);
        break;
    }
  };

  /* =====================================================
      FILTER LOGIC
  ====================================================== */
  const filteredContents = latestContents.filter((item) => {
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      <main className="bg-white">
        {/* ==================== HERO ==================== */}
        <section className="mx-auto max-w-[1200px] px-10 pt-8">
          <div
            className="relative overflow-hidden rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${exploreHero})` }}
          >
            <div className="absolute inset-0 bg-[#2D180E]/65" />

            <div className="relative z-10 flex min-h-[220px] items-center px-10 py-8">
              <div className="max-w-[620px] text-white">
                <h1 className="text-3xl font-bold leading-tight">
                  Jelajahi Kekayaan
                  <br />
                  Gastronomi Bali
                </h1>

                <p className="mt-3 max-w-[560px] text-sm leading-6 text-white/85">
                  Temukan informasi lengkap tentang makanan tradisional,
                  bahan bumbu lokal, resep autentik, dan destinasi terbaik.
                </p>

                {/* Form Pencarian Aktif */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="mt-8 flex max-w-[650px] overflow-hidden rounded-lg bg-white shadow-lg"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kuliner, bahan, resep, daerah, atau budaya..."
                    className="flex-1 px-5 py-4 text-sm text-gray-700 outline-none"
                  />

                  <button
                    type="submit"
                    className="flex items-center justify-center px-6 text-[#4B2417] transition hover:bg-[#F6F0ED]"
                    aria-label="Cari"
                  >
                    <Search size={22} strokeWidth={2.5} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CATEGORY ==================== */}
        <section className="mx-auto max-w-[1200px] px-10 pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#4B2417]">
              Kategori Konten
            </h2>

            {selectedCategory !== "Semua" && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#6B2E1E] underline hover:text-[#4B2417]"
              >
                Tampilkan Semua Kategori
              </button>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;

              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`cursor-pointer transition-all duration-200 rounded-xl ${
                    isSelected ? "ring-2 ring-[#6B2E1E] ring-offset-2" : ""
                  }`}
                >
                  <CategoryCard
                    icon={category.icon}
                    title={category.title}
                    description={category.description}
                    items={category.items}
                    bgColor={category.bgColor}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== LATEST CONTENT ==================== */}
        <section className="mx-auto max-w-[1200px] px-10 pb-8 pt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#4B2417]">
                {searchQuery.trim()
                  ? `Hasil Pencarian untuk "${searchQuery}"`
                  : selectedCategory !== "Semua"
                  ? `Informasi ${
                      categories.find(
                        (category) => category.id === selectedCategory
                      )?.title || ""
                    }`
                  : "Konten Terbaru"}
              </h2>
              <p className="text-xs text-gray-500">
                {searchQuery.trim()
                  ? `${filteredContents.length} konten ditemukan`
                  : "Informasi kuliner, resep, bahan, dan dokumentasi budaya Nusantara."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-sm font-medium text-[#4B2417] transition hover:underline"
            >
              Lihat semua <ArrowRight size={14} />
            </button>
          </div>

          {/* Culinary Cards Grid dengan Navigasi Dinamis */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredContents.length > 0 ? (
              filteredContents.map((item) => (
                <CulinaryCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  date={item.date}
                  views={item.views}
                  onClick={() => handleCardClick(item)}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-sm text-gray-500 border border-dashed border-gray-300 rounded-xl">
                Tidak ada konten yang sesuai dengan filter atau pencarian Anda.
              </div>
            )}
          </div>
        </section>

        {/* ==================== SEARCH TIPS ==================== */}
        <section className="mx-auto max-w-[1200px] px-10 pb-10">
          <div className="flex items-center justify-between rounded-xl bg-[#F9F0E2] px-6 py-4">
            <div className="flex items-start gap-3">
              <BookOpen
                size={20}
                className="mt-0.5 text-[#6B2E1E] shrink-0"
              />

              <div>
                <h3 className="text-sm font-semibold text-[#4B2417]">
                  Tips Pencarian
                </h3>

                <p className="mt-1 text-xs text-gray-600">
                  Gunakan kata kunci spesifik seperti nama makanan, bahan dasar,
                  atau daerah untuk mendapatkan hasil yang lebih relevan.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleViewGuide}
              className="hidden rounded-lg border border-[#6B2E1E]/30 px-5 py-2 text-xs font-medium text-[#6B2E1E] transition hover:bg-[#6B2E1E] hover:text-white sm:flex sm:items-center sm:gap-2 shrink-0"
            >
              <BookOpen size={14} />
              Lihat Panduan
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Explore;