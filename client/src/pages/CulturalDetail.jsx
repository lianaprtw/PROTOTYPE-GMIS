import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapPin,
  Tag,
  Bookmark,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  Users,
  Heart,
  Sparkles,
  Layers,
  FileText,
  Info,
  Calendar,
  UserCheck,
  CheckCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import megibung from "../assets/megibung.jpg";
import jatiluwih from "../assets/jatiluwih.jpg";
import lawarBali from "../assets/lawar-bali.jpg";
import jajeBali from "../assets/jaje-bali.jpg";

// Perbaikan bug icon marker bawaan Leaflet pada React
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const CulturalDetail = () => {
  const [activeTab, setActiveTab] = useState("sec-ringkasan");
  const [activeMediaTab, setActiveMediaTab] = useState("foto");

  // Koordinat Karangasem, Bali
  const position = [-8.4482, 115.6067];

  const culturalData = {
    title: "Upacara Megibung",
    subtitle:
      "Tradisi makan bersama sebagai bentuk syukur dan mempererat tali persaudaraan.",
    origin: "Karangasem, Bali",
    category: "Tradisi Kuliner",
    heritageType: "Warisan Budaya Tak Benda",
    status: "Terdokumentasi",
    topic: "Ritual, Hidangan Adat",
    contributor: "Pakar Gastronomi Bali",
    dateAdded: "12 Mei 2024",

    // Sidebar Data
    shortInfo: {
      name: "Upacara Megibung",
      mainMeaning: "Gotong royong, kebersamaan, rasa syukur, kesetaraan",
      when: "Upacara adat, perayaan keagamaan, acara keluarga, dan syukuran",
      actors: "Masyarakat Bali, khususnya komunitas adat",
      form: "Tradisi makan bersama dengan duduk melingkar tanpa sekat",
    },

    // Tokoh / Pakar
    expert: {
      name: "I Made Suarta, S.Pd., M.Par",
      role: "Pakar Gastronomi Bali",
      quote:
        "Megibung adalah simbol kesetaraan dan kebersamaan masyarakat Bali yang harus terus dijaga dan dilestarikan.",
    },

    // Context
    contexts: [
      "Upacara adat dan keagamaan",
      "Perayaan hari raya",
      "Acara keluarga (seperti pawiwahan, metatah)",
      "Syukuran (nelayan, panen, dll.)",
    ],

    // Values & Philosophy
    values: [
      {
        title: "Tri Hita Karana",
        desc: "Keharmonisan hubungan manusia dengan Tuhan, sesama, dan alam.",
      },
      {
        title: "Saling Asah, Asih, Asuh",
        desc: "Saling mengingatkan, menghargai, dan menyayangi sesama.",
      },
      {
        title: "Rwa Bhineda",
        desc: "Kesadaran bahwa perbedaan bukanlah pemisah, melainkan bagian dari keseimbangan.",
      },
      {
        title: "Tat Twam Asi",
        desc: "Kita semua adalah satu, menumbuhkan rasa persaudaraan dan empati.",
      },
    ],

    // Cultural Meanings
    meanings: [
      {
        title: "Kebersamaan",
        desc: "Mempererat tali persaudaraan dan membangun harmoni sosial.",
      },
      {
        title: "Gotong Royong",
        desc: "Menunjukkan semangat saling membantu dalam persiapan maupun pelaksanaan.",
      },
      {
        title: "Rasa Syukur",
        desc: "Ungkapan terima kasih kepada Tuhan atas berkah dan rezeki yang diterima.",
      },
      {
        title: "Kesetaraan",
        desc: "Tidak membedakan status sosial, semua duduk bersama dalam satu lingkaran.",
      },
    ],

    // Steps / Practice
    steps: [
      {
        step: "Persiapan",
        desc: "Masyarakat bersama-sama mempersiapkan bahan makanan dan perlengkapan.",
      },
      {
        step: "Pelaksanaan",
        desc: "Hidangan disusun di atas nampan besar (dulang) dan diletakkan di tengah.",
      },
      {
        step: "Penyajian",
        desc: "Peserta duduk melingkar dan makan bersama tanpa pembatas.",
      },
      {
        step: "Penutupan",
        desc: "Diakhiri dengan doa bersama sebagai ungkapan syukur.",
      },
    ],

    // References
    references: [
      { title: "Buku Kuliner Tradisional Bali", size: "PDF • 2.4 MB" },
      { title: "Dokumentasi Megibung Bali", size: "PDF • 1.8 MB" },
      { title: "Artikel Tradisi Megibung", size: "PDF • 1.2 MB" },
    ],
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans">
      <Navbar />

      <main className="mx-auto max-w-[1240px] px-6 py-6">
        {/* BREADCRUMB */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/explore" className="hover:text-[#4B2417]">
            Explore
          </Link>
          <span>/</span>
          <Link to="/explore?category=Culture" className="hover:text-[#4B2417]">
            Informasi Budaya
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#4B2417]">
            {culturalData.title}
          </span>
        </nav>

        {/* HERO SECTION & TOP HEADER */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Left Content */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Image Banner */}
              <div className="relative overflow-hidden rounded-2xl md:col-span-6 bg-gray-200 h-[280px]">
                <img
                  src={megibung}
                  alt={culturalData.title}
                  className="h-full w-full object-cover"
                />
                <button className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm hover:bg-black/80 transition">
                  Lihat Semua Foto (16)
                </button>
              </div>

              {/* Title & Metadata */}
              <div className="flex flex-col justify-between md:col-span-6">
                <div>
                  <span className="inline-block rounded-md bg-[#F4EBE1] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6B2E1E]">
                    INFORMASI BUDAYA
                  </span>

                  <h1 className="mt-2 text-3xl font-extrabold text-[#2D180E]">
                    {culturalData.title}
                  </h1>

                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    {culturalData.subtitle}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                    <div>
                      <p className="text-[10px] text-gray-400">Asal Daerah</p>
                      <p className="font-semibold text-gray-800">
                        {culturalData.origin}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">Kategori</p>
                      <p className="font-semibold text-gray-800">
                        {culturalData.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">Jenis Warisan</p>
                      <p className="font-semibold text-gray-800">
                        {culturalData.heritageType}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">Status</p>
                      <p className="font-semibold text-gray-800">
                        {culturalData.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">Topik</p>
                      <p className="font-semibold text-gray-800">
                        {culturalData.topic}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">
                        Ditambahkan oleh
                      </p>
                      <p className="font-semibold text-gray-800">
                        {culturalData.contributor}
                      </p>
                      <p className="text-[9px] text-gray-400">
                        {culturalData.dateAdded}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-xl bg-[#4B2417] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#361a10]">
                    <Bookmark size={14} /> Simpan
                  </button>
                  <button className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50">
                    <Share2 size={14} /> Bagikan
                  </button>
                  <button className="flex items-center justify-center rounded-xl border border-gray-300 bg-white p-2 text-gray-700 transition hover:bg-gray-50">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* TAB NAVIGATION */}
            <div className="sticky top-0 z-20 mt-8 flex border-b border-gray-200 bg-[#FAF8F5] pt-2 overflow-x-auto no-scrollbar">
              {[
                { id: "sec-ringkasan", label: "Ringkasan" },
                { id: "sec-sejarah", label: "Sejarah & Asal Usul" },
                { id: "sec-makna", label: "Makna Budaya" },
                { id: "sec-praktik", label: "Tradisi & Praktik" },
                { id: "sec-filosofi", label: "Nilai & Filosofi" },
                { id: "sec-multimedia", label: "Multimedia" },
                { id: "sec-lokasi", label: "Lokasi" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    scrollToSection(tab.id);
                  }}
                  className={`shrink-0 border-b-2 px-4 pb-3 text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "border-[#6B2E1E] text-[#6B2E1E]"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SECTION 1: Ringkasan */}
            <section id="sec-ringkasan" className="py-6">
              <h2 className="text-sm font-bold text-[#2D180E]">Ringkasan</h2>
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12 items-center rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="md:col-span-8 text-xs leading-relaxed text-gray-600 space-y-3">
                  <p>
                    Upacara Megibung adalah tradisi makan bersama yang
                    dilakukan dalam berbagai upacara adat, perayaan keagamaan,
                    atau acara syukuran di Bali. Tradisi ini menjadi simbol
                    kebersamaan, kesetaraan, dan rasa syukur kepada Ida Sang
                    Hyang Widhi Wasa atas berkah yang diterima.
                  </p>
                  <p>
                    Masyarakat duduk melingkar tanpa membeda-bedakan status
                    sosial, menikmati hidangan yang disajikan di atas nampan
                    besar (dulang/nyiru) secara bersama-sama.
                  </p>
                </div>
                {/* Ilustrasi Ukiran Bali */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="h-28 w-28 bg-[#FDF9F3] rounded-full border border-[#F2E8D9] flex items-center justify-center p-3">
                    <div className="text-center text-[#6B2E1E]">
                      <Sparkles size={32} className="mx-auto mb-1" />
                      <span className="text-[10px] font-bold">
                        Simbol Kebersamaan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Sejarah & Asal Usul */}
            <section id="sec-sejarah" className="border-t border-gray-200 py-6">
              <h2 className="text-sm font-bold text-[#2D180E]">
                Sejarah & Asal Usul
              </h2>
              <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-7 text-xs leading-relaxed text-gray-600 space-y-3">
                  <p>
                    Megibung telah ada sejak zaman kerajaan di Bali dan
                    berkembang seiring berjalannya waktu. Tradisi ini dipercaya
                    berasal dari nilai-nilai ajaran Hindu-Buddha yang menekankan
                    persaudaraan, keharmonisan, dan kesetaraan antar manusia.
                  </p>
                  <p>
                    Megibung menjadi bagian dari kehidupan masyarakat Bali,
                    khususnya dalam upacara keagamaan dan adat istiadat.
                  </p>
                </div>
                <div className="md:col-span-5 h-40 overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={jatiluwih}
                    alt="Sejarah Pura"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 3: Makna Budaya */}
            <section id="sec-makna" className="border-t border-gray-200 py-6">
              <h2 className="text-sm font-bold text-[#2D180E]">Makna Budaya</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {culturalData.meanings.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-lg bg-[#F9F1E5] p-2 text-[#6B2E1E]">
                        {idx === 0 && <Users size={16} />}
                        {idx === 1 && <Heart size={16} />}
                        {idx === 2 && <Sparkles size={16} />}
                        {idx === 3 && <Layers size={16} />}
                      </div>
                      <h3 className="text-xs font-bold text-[#2D180E]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: Tradisi & Praktik */}
            <section id="sec-praktik" className="border-t border-gray-200 py-6">
              <h2 className="text-sm font-bold text-[#2D180E]">
                Tradisi & Praktik
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-4 relative">
                {culturalData.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-md bg-[#F4EBE1] px-2 py-0.5 text-[10px] font-bold text-[#6B2E1E]">
                        {step.step}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-gray-500">
                      {step.desc}
                    </p>
                    {idx < 3 && (
                      <ChevronRight
                        size={16}
                        className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 z-10"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: Nilai & Filosofi */}
            <section id="sec-filosofi" className="border-t border-gray-200 py-6">
              <h2 className="text-sm font-bold text-[#2D180E]">
                Nilai & Filosofi
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {culturalData.values.map((val, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <h3 className="text-xs font-bold text-[#6B2E1E] mb-1">
                      {val.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-gray-500">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: Multimedia */}
            <section
              id="sec-multimedia"
              className="border-t border-gray-200 py-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#2D180E]">
                  Multimedia
                </h2>
                <button className="text-xs font-semibold text-[#6B2E1E] hover:underline">
                  Lihat semua &rarr;
                </button>
              </div>

              <div className="mt-3 flex gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveMediaTab("foto")}
                  className={`border-b-2 pb-1 ${
                    activeMediaTab === "foto"
                      ? "border-[#6B2E1E] text-[#6B2E1E]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Foto
                </button>
                <button
                  onClick={() => setActiveMediaTab("video")}
                  className={`border-b-2 pb-1 ${
                    activeMediaTab === "video"
                      ? "border-[#6B2E1E] text-[#6B2E1E]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Video
                </button>
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-3">
                <div className="h-36 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={megibung}
                    alt="Media 1"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-36 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={lawarBali}
                    alt="Media 2"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-black/60 text-sm font-bold text-white">
                  <img
                    src={megibung}
                    alt="Media 3"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
                  />
                  +12
                </div>

                {/* Arrow Controls */}
                <button className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 text-gray-700 shadow-md hover:bg-gray-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 text-gray-700 shadow-md hover:bg-gray-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </section>

            {/* SECTION 7: Lokasi (OpenStreetMap) */}
            <section id="sec-lokasi" className="border-t border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#2D180E]">Lokasi</h2>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${position[0]}&mlon=${position[1]}#map=12/${position[0]}/${position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-[#6B2E1E] hover:underline"
                >
                  Lihat di Peta &rarr;
                </a>
              </div>

              <div className="relative mt-4 h-72 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm z-10">
                <MapContainer
                  center={position}
                  zoom={11}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      <div className="font-sans text-xs">
                        <strong className="text-[#2D180E]">Karangasem, Bali</strong>
                        <p className="text-gray-600 m-0">Lokasi Asal Upacara Megibung</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>

                <div className="absolute left-4 top-4 z-[1000] flex items-center gap-3 rounded-xl border border-gray-100 bg-white/95 p-2.5 shadow-md backdrop-blur-sm">
                  <div className="h-9 w-9 overflow-hidden rounded-lg bg-gray-200 shrink-0">
                    <img
                      src={jatiluwih}
                      alt="Karangasem"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Karangasem, Bali
                    </p>
                    <p className="text-[10px] text-gray-500">Indonesia</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sumber & Referensi */}
            <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="text-xs font-bold text-gray-800">
                Sumber & Referensi
              </h3>
              <p className="mt-1 text-[11px] text-gray-500">
                Informasi diperoleh dari wawancara dengan Pakar Gastronomi
                Bali, Buku Kuliner Tradisional Bali, dan Dinas Kebudayaan
                Provinsi Bali.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {culturalData.references.map((ref, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-[#FAF8F5] p-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <FileText size={18} className="text-[#6B2E1E] shrink-0" />
                      <div className="truncate">
                        <p className="truncate text-[11px] font-bold text-gray-800">
                          {ref.title}
                        </p>
                        <p className="text-[9px] text-gray-400">{ref.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Right (4 Cols) */}
          <div className="sticky top-20 h-fit space-y-6 lg:col-span-4">
            {/* 1. Informasi Singkat */}
            <div className="rounded-2xl border border-[#F2E8D9] bg-[#FDF9F3] p-5">
              <h3 className="border-b border-[#F2E8D9] pb-3 text-sm font-bold text-[#2D180E]">
                Informasi Singkat
              </h3>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Nama Budaya
                  </p>
                  <p className="font-semibold text-gray-800">
                    {culturalData.shortInfo.name}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Makna Utama
                  </p>
                  <p className="font-semibold text-gray-800">
                    {culturalData.shortInfo.mainMeaning}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Dilakukan Saat
                  </p>
                  <p className="font-semibold text-gray-800">
                    {culturalData.shortInfo.when}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Pelaku Utama
                  </p>
                  <p className="font-semibold text-gray-800">
                    {culturalData.shortInfo.actors}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">Bentuk</p>
                  <p className="font-semibold text-gray-800">
                    {culturalData.shortInfo.form}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Tokoh / Pakar */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="border-b border-gray-100 pb-3 text-xs font-bold text-[#2D180E]">
                Tokoh/Pakar
              </h3>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                    alt={culturalData.expert.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">
                    {culturalData.expert.name}
                  </p>
                  <p className="text-[10px] text-[#6B2E1E]">
                    {culturalData.expert.role}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-[#FAF8F5] p-3 text-[11px] italic leading-relaxed text-gray-600">
                "{culturalData.expert.quote}"
              </div>
            </div>

            {/* 3. Konteks Penggunaan */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="border-b border-gray-100 pb-3 text-xs font-bold text-[#2D180E]">
                Konteks Penggunaan
              </h3>

              <ul className="mt-3 space-y-2 text-xs text-gray-600">
                {culturalData.contexts.map((ctx, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#6B2E1E]" />
                    <span>{ctx}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Hidangan yang Disajikan */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="border-b border-gray-100 pb-3 text-xs font-bold text-[#2D180E]">
                Hidangan yang Disajikan
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-gray-600">
                Berbagai hidangan tradisional Bali, seperti lawar, ayam betutu,
                sate lilit, urat, jaja, dan buah-buahan.
              </p>

              <div className="mt-3 h-28 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={jajeBali}
                  alt="Hidangan"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* 5. Bantu Melestarikan Budaya */}
            <div className="rounded-2xl border border-[#F2E8D9] bg-[#FDF9F3] p-5">
              <h3 className="text-xs font-bold text-[#2D180E]">
                Bantu Melestarikan Budaya
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-gray-600">
                Bagikan informasi ini atau kontribusikan dokumentasi budaya
                lainnya untuk menjaga kekayaan kuliner dan budaya Indonesia.
              </p>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6B2E1E] py-2.5 text-xs font-semibold text-white transition hover:bg-[#522216]">
                <Share2 size={14} /> Kontribusi Konten
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CulturalDetail;