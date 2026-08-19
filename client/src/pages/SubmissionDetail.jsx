import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import lawarBaliImage from "../assets/lawar-bali.jpg";
import megibungImage from "../assets/megibung.jpg";
import basaGenepImage from "../assets/basa-genep.jpg";
import jatiluwihImage from "../assets/jatiluwih.jpg";
import exploreHeroImage from "../assets/explore-hero.jpg";
import ubudFoodImage from "../assets/ubud-food.jpg";

import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  FileText,
  CheckCircle2,
  Hourglass,
  XCircle,
  RefreshCw,
  Edit3,
  Send,
  User,
  BookOpen,
  Landmark,
  AlertCircle,
  Utensils,
  Sparkles,
  Layers,
  Globe,
  Phone,
} from "lucide-react";

// =====================================================
// MOCK SUBMISSION DATA (WITH CATEGORY SPECIFIC DATA)
// =====================================================

export const SUBMISSIONS = {
  "1": {
    id: "1",
    name: "Lawar Tradisional Bali",
    category: "Kuliner",
    description:
      "Lawar merupakan hidangan khas Bali yang terbuat dari campuran daging cincang, kelapa parut, dan bumbu khas Bali.",
    date: "12 Agu 2024, 14:30",
    location: "Gianyar, Bali",
    status: "Menunggu Review",
    image:
      lawarBaliImage,
    submittedAt: "12 Agu 2024, 14:30",
    reviewNote: "",
    reviewedAt: null,
    contributor: {
      name: "Ni Kadek Liana Pratiwi",
      email: "liana@example.com",
    },
    gastronomyValues: ["Budaya", "Tradisi", "Sosial"],
    culturalMeaning:
      "Lawar memiliki keterkaitan erat dengan kehidupan sosial dan budaya masyarakat Bali serta sering hadir dalam berbagai kegiatan adat dan upacara.",
    references: [
      "Wawancara dengan pelaku kuliner lokal",
      "Dokumentasi kuliner tradisional Bali",
    ],
    details: {
      prepTime: "30 menit",
      cookTime: "45 menit",
      servings: "4 - 6 porsi",
      cookingMethod: "Cincang, Mengukus & Pencampuran Bumbu",
      ingredients: [
        "250g daging cincang (ayam/babi)",
        "100g kelapa parut bakar",
        "50g kacang panjang potong tipis",
        "Bumbu genep khas Bali",
        "Bawang goreng & perasan jeruk limau",
      ],
      cookingSteps: [
        "Cincang halus daging dan sangrai/kukus hingga matang.",
        "Campurkan kelapa parut bakar dan kacang panjang yang sudah direbus singkat.",
        "Tumis bumbu genep hingga harum lalu ratakan dengan semua bahan.",
        "Tambahkan perasan jeruk limau dan taburan bawang goreng sebelum disajikan.",
      ],
    },
  },

  "2": {
    id: "2",
    name: "Tradisi Megibung",
    category: "Budaya",
    description:
      "Megibung adalah tradisi makan bersama yang melambangkan kebersamaan dan rasa syukur masyarakat Bali.",
    date: "10 Agu 2024, 09:15",
    location: "Karangasem, Bali",
    status: "Disetujui",
    image:
      megibungImage,
    submittedAt: "10 Agu 2024, 09:15",
    reviewNote:
      "Informasi budaya dan dokumentasi aset telah sesuai. Submission disetujui.",
    reviewedAt: "11 Agu 2024, 14:20",
    contributor: {
      name: "Ni Kadek Liana Pratiwi",
      email: "liana@example.com",
    },
    gastronomyValues: ["Budaya", "Tradisi", "Sosial"],
    culturalMeaning:
      "Megibung mencerminkan nilai kebersamaan, gotong royong, dan hubungan sosial masyarakat Bali.",
    references: [
      "Dokumentasi tradisi Megibung",
      "Wawancara dengan masyarakat Karangasem",
    ],
    details: {
      origin: "Karangasem, Bali (Warisan Kerajaan Karangasem)",
      historicalContext:
        "Tradisi ini digagas oleh Raja Karangasem sebagai wadah pemersatu prajurit tanpa membedakan kasta saat makan bersama.",
      ritualSteps: [
        "Masyarakat membentuk kelompok kecil (seloka) melingkari wadah makanan.",
        "Nasi dan lauk disajikan di atas wadah yang dilapisi daun pisang.",
        "Makan bersama menggunakan tangan secara santun dan penuh keakraban.",
      ],
      communityRole:
        "Mempererat tali kebersamaan, menghapus sekat sosial, serta melestarikan semangat gotong royong.",
    },
  },

  "3": {
    id: "3",
    name: "Base Genep Bali",
    category: "Bahan",
    description:
      "Base genep adalah bumbu dasar khas Bali yang digunakan sebagai dasar berbagai masakan tradisional.",
    date: "8 Agu 2024, 16:20",
    location: "Denpasar, Bali",
    status: "Perlu Perbaikan",
    image:
      basaGenepImage,
    submittedAt: "8 Agu 2024, 16:20",
    reviewNote:
      "Deskripsi budaya perlu diperjelas dengan menjelaskan keterkaitan Base Genep dengan tradisi masyarakat Bali. Selain itu, mohon tambahkan sumber informasi yang lebih spesifik.",
    reviewedAt: "9 Agu 2024, 10:15",
    contributor: {
      name: "Ni Kadek Liana Pratiwi",
      email: "liana@example.com",
    },
    gastronomyValues: ["Budaya", "Tradisi", "Sejarah"],
    culturalMeaning:
      "Base genep merupakan bagian penting dalam tradisi memasak masyarakat Bali dan digunakan dalam berbagai hidangan tradisional.",
    references: [
      "Dokumentasi kuliner Bali",
      "Wawancara dengan pelaku kuliner",
    ],
    details: {
      originRegion: "Seluruh Wilayah Bali",
      characteristics:
        "Racikan bumbu kompleks yang menyeimbangkan rasa pedas, gurih, asin, hangat, dan aroma rempah segar.",
      usageAndProcessing:
        "Ditumbuk/dihaluskan lalu ditumis sebagai bumbu utama tumisan, marinasi olahan daging, dan olahan hidangan upacara.",
      availability: "Tersedia sepanjang tahun di pasar tradisional Bali.",
    },
  },

  "4": {
    id: "4",
    name: "Subak Sistem Irigasi Bali",
    category: "Budaya",
    description:
      "Subak adalah sistem irigasi tradisional Bali yang telah diakui sebagai Warisan Budaya Dunia UNESCO.",
    date: "8 Agu 2024, 11:05",
    location: "Tabanan, Bali",
    status: "Disetujui",
    image:
      jatiluwihImage,
    submittedAt: "8 Agu 2024, 11:05",
    reviewNote:
      "Informasi submission telah diverifikasi dan dinyatakan sesuai.",
    reviewedAt: "9 Agu 2024, 13:00",
    contributor: {
      name: "Ni Kadek Liana Pratiwi",
      email: "liana@example.com",
    },
    gastronomyValues: ["Budaya", "Sejarah", "Sosial"],
    culturalMeaning:
      "Subak merupakan sistem pengelolaan irigasi yang berkaitan erat dengan kehidupan sosial dan budaya masyarakat Bali.",
    references: [
      "Dokumentasi sistem Subak",
      "Sumber informasi budaya Bali",
    ],
    details: {
      origin: "Tabanan & Gianyar, Bali",
      historicalContext:
        "Sistem lanskap budaya pertanian Bali yang berlandaskan filosofi Tri Hita Karana sejak abad ke-9.",
      ritualSteps: [
        "Upacara pembagian air di Pura Ulun Danu.",
        "Gotong royong pemeliharaan saluran irigasi oleh anggota kelompok krama subak.",
      ],
      communityRole:
        "Menjaga ketahanan pangan beras lokal dan kelestarian ekosistem pertanian Bali.",
    },
  },

  "5": {
    id: "5",
    name: "Pura Uluwatu",
    category: "Destinasi",
    description:
      "Pura yang terletak di atas tebing dengan pemandangan laut yang indah di Bali bagian selatan.",
    date: "2 Agu 2024, 18:40",
    location: "Badung, Bali",
    status: "Menunggu Review",
    image:
      exploreHeroImage,
    submittedAt: "2 Agu 2024, 18:40",
    reviewNote: "",
    reviewedAt: null,
    contributor: {
      name: "Ni Kadek Liana Pratiwi",
      email: "liana@example.com",
    },
    gastronomyValues: ["Budaya", "Wisata"],
    culturalMeaning:
      "Pura Uluwatu merupakan salah satu destinasi budaya yang memiliki nilai sejarah dan spiritual masyarakat Bali.",
    references: [
      "Dokumentasi destinasi budaya Bali",
      "Informasi pariwisata Bali",
    ],
    details: {
      address:
        "Jl. Raya Uluwatu, Pecatu, Kec. Kuta Selatan, Kabupaten Badung, Bali",
      attractions:
        "Pemandangan tebing samudra, tempat ritual spiritual, dan amfiteater Pertunjukan Tari Kecak.",
      operatingHours: "07:00 - 19:00 WITA",
      facilities:
        "Area Parkir, Restroom, Penyewaan Kain Sarung Adat, Jalur Pedestrian Tebing",
      website: "https://badungtourism.badungkab.go.id",
    },
  },

  "6": {
    id: "6",
    name: "Festival Kuliner Tradisional Bali 2024",
    category: "Agenda",
    description:
      "Festival tahunan yang menampilkan beragam sajian khas gastronomi Bali dari seluruh kabupaten/kota.",
    date: "20 Agu 2024, 10:00",
    location: "Taman Budaya Art Center, Denpasar",
    status: "Disetujui",
    image:
      ubudFoodImage,
    submittedAt: "5 Agu 2024, 08:00",
    reviewNote: "Agenda terverifikasi dengan pihak penyelenggara.",
    reviewedAt: "6 Agu 2024, 11:00",
    contributor: {
      name: "Ni Kadek Liana Pratiwi",
      email: "liana@example.com",
    },
    gastronomyValues: ["Budaya", "Wisata", "Sosial"],
    culturalMeaning:
      "Wadah selebrasi dan edukasi resep warisan leluhur kepada generasi muda dan wisatawan.",
    references: ["Surat Keputusan Panitia Festival Kuliner Bali 2024"],
    details: {
      eventDate: "25 - 27 Agustus 2024",
      eventTime: "09:00 - 22:00 WITA",
      organizer: "Dinas Kebudayaan Provinsi Bali",
      venue: "Area Kuliner Taman Budaya Art Center Denpasar",
      registrationInfo: "Terbuka untuk Umum (Gratis)",
      contactPerson: "+62 812-3456-7890",
    },
  },
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const getStatusConfig = (status) => {
  switch (status) {
    case "Menunggu Review":
      return {
        container: "bg-amber-50 text-amber-800 border-amber-200",
        icon: <Hourglass className="w-4 h-4 text-amber-600" />,
        title: "Menunggu Review",
        description:
          "Submission Anda telah dikirim dan sedang menunggu proses peninjauan oleh curator.",
      };

    case "Disetujui":
      return {
        container: "bg-emerald-50 text-emerald-800 border-emerald-200",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
        title: "Disetujui",
        description:
          "Submission Anda telah disetujui dan aset dapat diterbitkan di Gastro Pustaka.",
      };

    case "Perlu Perbaikan":
      return {
        container: "bg-rose-50 text-rose-800 border-rose-200",
        icon: <RefreshCw className="w-4 h-4 text-rose-600" />,
        title: "Perlu Perbaikan",
        description:
          "Curator meminta Anda melakukan perbaikan sebelum submission dapat diproses kembali.",
      };

    case "Ditolak":
      return {
        container: "bg-stone-100 text-stone-700 border-stone-300",
        icon: <XCircle className="w-4 h-4 text-stone-500" />,
        title: "Ditolak",
        description:
          "Submission ini tidak dapat diterbitkan berdasarkan hasil review curator.",
      };

    default:
      return {
        container: "bg-stone-100 text-stone-700 border-stone-200",
        icon: null,
        title: status,
        description: "",
      };
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case "Kuliner":
      return "bg-amber-100 text-amber-900 border-amber-200";

    case "Budaya":
      return "bg-purple-100 text-purple-900 border-purple-200";

    case "Bahan":
      return "bg-emerald-100 text-emerald-900 border-emerald-200";

    case "Destinasi":
      return "bg-sky-100 text-sky-900 border-sky-200";

    case "Agenda":
      return "bg-rose-100 text-rose-900 border-rose-200";

    default:
      return "bg-stone-100 text-stone-800 border-stone-200";
  }
};

// Component render spesifik berdasarkan kategori
const renderCategoryDetails = (submission) => {
  const { category, details } = submission;
  if (!details) return null;

  switch (category) {
    case "Kuliner":
      return (
        <div className="mt-6 border-t border-stone-100 pt-6 space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-[#3B1E14]">
              <Utensils className="h-4 w-4 text-amber-900" />
            </div>
            <h3 className="text-sm font-bold text-[#3B1E14]">
              Spesifikasi Resep & Olahan Kuliner
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {details.prepTime && (
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                <p className="text-[11px] text-stone-400">Waktu Persiapan</p>
                <p className="mt-0.5 text-xs font-bold text-stone-800">{details.prepTime}</p>
              </div>
            )}
            {details.cookTime && (
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                <p className="text-[11px] text-stone-400">Waktu Memasak</p>
                <p className="mt-0.5 text-xs font-bold text-stone-800">{details.cookTime}</p>
              </div>
            )}
            {details.servings && (
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                <p className="text-[11px] text-stone-400">Porsi</p>
                <p className="mt-0.5 text-xs font-bold text-stone-800">{details.servings}</p>
              </div>
            )}
            {details.cookingMethod && (
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                <p className="text-[11px] text-stone-400">Teknik / Metode</p>
                <p className="mt-0.5 text-xs font-bold text-stone-800 truncate" title={details.cookingMethod}>
                  {details.cookingMethod}
                </p>
              </div>
            )}
          </div>

          {details.ingredients && details.ingredients.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold text-[#3B1E14]">Daftar Bahan Utama:</h4>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 text-xs text-stone-600">
                {details.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-center gap-2 rounded-lg bg-stone-50 px-2.5 py-1.5 border border-stone-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {details.cookingSteps && details.cookingSteps.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold text-[#3B1E14]">Tahapan Pembuatan:</h4>
              <ol className="space-y-2 text-xs text-stone-600">
                {details.cookingSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-900">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      );

    case "Budaya":
      return (
        <div className="mt-6 border-t border-stone-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-900">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-[#3B1E14]">
              Detail Nilai & Tradisi Kebudayaan
            </h3>
          </div>

          {details.origin && (
            <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-3">
              <p className="text-[11px] font-semibold text-purple-800 uppercase tracking-wider">Asal Usul & Wilayah</p>
              <p className="mt-0.5 text-xs text-stone-700">{details.origin}</p>
            </div>
          )}

          {details.historicalContext && (
            <div>
              <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">Konteks Sejarah:</h4>
              <p className="text-xs leading-relaxed text-stone-600">{details.historicalContext}</p>
            </div>
          )}

          {details.ritualSteps && details.ritualSteps.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold text-[#3B1E14]">Tahapan Pelaksanaan Tradisi:</h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {details.ritualSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {details.communityRole && (
            <div>
              <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">Peran & Dampak Sosial:</h4>
              <p className="text-xs leading-relaxed text-stone-600">{details.communityRole}</p>
            </div>
          )}
        </div>
      );

    case "Bahan":
      return (
        <div className="mt-6 border-t border-stone-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-900">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-[#3B1E14]">
              Karakteristik & Pengolahan Bahan
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {details.originRegion && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                <p className="text-[11px] font-semibold text-emerald-800">Asal Daerah / Sumber</p>
                <p className="mt-0.5 text-xs text-stone-700">{details.originRegion}</p>
              </div>
            )}
            {details.availability && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                <p className="text-[11px] font-semibold text-emerald-800">Musim & Ketersediaan</p>
                <p className="mt-0.5 text-xs text-stone-700">{details.availability}</p>
              </div>
            )}
          </div>

          {details.characteristics && (
            <div>
              <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">Ciri Khas & Profil Rasa:</h4>
              <p className="text-xs leading-relaxed text-stone-600">{details.characteristics}</p>
            </div>
          )}

          {details.usageAndProcessing && (
            <div>
              <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">Penggunaan & Pengolahan Kuliner:</h4>
              <p className="text-xs leading-relaxed text-stone-600">{details.usageAndProcessing}</p>
            </div>
          )}
        </div>
      );

    case "Destinasi":
      return (
        <div className="mt-6 border-t border-stone-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-900">
              <MapPin className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-[#3B1E14]">
              Informasi Lokasi & Akses Destinasi
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {details.operatingHours && (
              <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-3">
                <p className="text-[11px] font-semibold text-sky-800">Jam Operasional</p>
                <p className="mt-0.5 text-xs text-stone-700">{details.operatingHours}</p>
              </div>
            )}
            {details.facilities && (
              <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-3">
                <p className="text-[11px] font-semibold text-sky-800">Fasilitas Tersedia</p>
                <p className="mt-0.5 text-xs text-stone-700">{details.facilities}</p>
              </div>
            )}
          </div>

          {details.address && (
            <div>
              <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">Alamat Lengkap:</h4>
              <p className="text-xs leading-relaxed text-stone-600">{details.address}</p>
            </div>
          )}

          {details.attractions && (
            <div>
              <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">Daya Tarik Utama:</h4>
              <p className="text-xs leading-relaxed text-stone-600">{details.attractions}</p>
            </div>
          )}

          {details.website && (
            <div className="flex items-center gap-1.5 text-xs text-sky-700 pt-1">
              <Globe className="h-3.5 w-3.5" />
              <a href={details.website} target="_blank" rel="noreferrer" className="underline hover:text-sky-900">
                {details.website}
              </a>
            </div>
          )}
        </div>
      );

    case "Agenda":
      return (
        <div className="mt-6 border-t border-stone-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-900">
              <Calendar className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-[#3B1E14]">
              Detail Pelaksanaan Agenda / Event
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {details.eventDate && (
              <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3">
                <p className="text-[11px] font-semibold text-rose-800">Tanggal Pelaksanaan</p>
                <p className="mt-0.5 text-xs font-bold text-stone-800">{details.eventDate}</p>
              </div>
            )}
            {details.eventTime && (
              <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3">
                <p className="text-[11px] font-semibold text-rose-800">Waktu / Jam</p>
                <p className="mt-0.5 text-xs font-bold text-stone-800">{details.eventTime}</p>
              </div>
            )}
          </div>

          {details.organizer && (
            <div>
              <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">Penyelenggara:</h4>
              <p className="text-xs text-stone-700">{details.organizer}</p>
            </div>
          )}

          {details.venue && (
            <div>
              <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">Tempat Utama:</h4>
              <p className="text-xs text-stone-700">{details.venue}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs border-t border-stone-100">
            {details.registrationInfo && (
              <span className="text-stone-600">
                <strong className="text-stone-800">Pendaftaran:</strong> {details.registrationInfo}
              </span>
            )}
            {details.contactPerson && (
              <span className="flex items-center gap-1 text-stone-600">
                <Phone className="h-3.5 w-3.5 text-stone-400" />
                <span>{details.contactPerson}</span>
              </span>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
};

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function SubmissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const submission = SUBMISSIONS[id];

  // Jika ID tidak ditemukan
  if (!submission) {
    return (
      <div className="min-h-screen bg-[#FDFBF9] font-sans">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
              <FileText className="h-8 w-8" />
            </div>

            <h1 className="text-xl font-bold text-[#3B1E14]">
              Submission Tidak Ditemukan
            </h1>

            <p className="mt-2 text-sm text-stone-500">
              Data submission yang Anda cari tidak tersedia.
            </p>

            <button
              onClick={() => navigate("/my-submission")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3B1E14] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2A150E]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke My Submission
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const statusConfig = getStatusConfig(submission.status);

  const isRevision = submission.status === "Perlu Perbaikan";
  const isPending = submission.status === "Menunggu Review";
  const isApproved = submission.status === "Disetujui";
  const isRejected = submission.status === "Ditolak";

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF9] font-sans text-stone-800">
      <Navbar />

      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/my-submission")}
              className="mb-5 inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke My Submission
            </button>

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md border px-2.5 py-1 text-[11px] font-bold ${getCategoryColor(
                      submission.category
                    )}`}
                  >
                    {submission.category}
                  </span>

                  <span className="text-xs text-stone-400">
                    Submission #{submission.id}
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                  {submission.name}
                </h1>

                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone-600">
                  Detail pengajuan aset gastronomi yang Anda kirimkan ke Gastro
                  Pustaka.
                </p>
              </div>

              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold ${statusConfig.container}`}
              >
                {statusConfig.icon}
                {submission.status}
              </span>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

            {/* LEFT COLUMN */}
            <div className="space-y-6 lg:col-span-8">

              {/* STATUS CALLOUT */}
              <div
                className={`rounded-2xl border p-5 shadow-sm ${
                  isRevision
                    ? "border-rose-200 bg-rose-50/60"
                    : isApproved
                    ? "border-emerald-200 bg-emerald-50/60"
                    : isPending
                    ? "border-amber-200 bg-amber-50/60"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {statusConfig.icon}
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-[#3B1E14]">
                      {statusConfig.title}
                    </h2>

                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      {statusConfig.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* INFORMASI ASET & CATEGORY DETAILS */}
              <section className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
                <div className="border-b border-stone-100 p-5 sm:p-6">
                  <h2 className="text-base font-bold text-[#3B1E14]">
                    Informasi Aset
                  </h2>
                </div>

                <div className="p-5 sm:p-6">

                  {/* IMAGE */}
                  <div className="mb-6 overflow-hidden rounded-2xl border border-stone-100 bg-stone-100">
                    <img
                      src={submission.image}
                      alt={submission.name}
                      className="h-[260px] w-full object-cover sm:h-[340px]"
                    />
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div className="mb-6">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-[#3B1E14]">
                        {submission.name}
                      </h3>

                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${getCategoryColor(
                          submission.category
                        )}`}
                      >
                        {submission.category}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-stone-600">
                      {submission.description}
                    </p>
                  </div>

                  {/* META */}
                  <div className="grid grid-cols-1 gap-3 border-y border-stone-100 py-5 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <Calendar className="h-4 w-4 text-stone-400" />
                      <span>
                        <span className="text-stone-400">Diajukan: </span>
                        <span className="font-semibold text-stone-700">
                          {submission.submittedAt}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <MapPin className="h-4 w-4 text-stone-400" />
                      <span>
                        <span className="text-stone-400">Lokasi: </span>
                        <span className="font-semibold text-stone-700">
                          {submission.location}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* DETAIL FIELD DENGAN DESAIN KHUSUS PER KATEGORI */}
                  {renderCategoryDetails(submission)}

                  {/* GASTRONOMY VALUES */}
                  <div className="mt-6 border-t border-stone-100 pt-6">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-[#3B1E14]">
                        <Landmark className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-bold text-[#3B1E14]">
                        Nilai Gastronomi & Budaya
                      </h3>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                      {submission.gastronomyValues.map((value) => (
                        <span
                          key={value}
                          className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800"
                        >
                          {value}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs leading-relaxed text-stone-600 sm:text-sm">
                      {submission.culturalMeaning}
                    </p>
                  </div>

                  {/* REFERENCES */}
                  <div className="mt-6 border-t border-stone-100 pt-6">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-[#3B1E14]">
                        <BookOpen className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-bold text-[#3B1E14]">
                        Sumber Informasi
                      </h3>
                    </div>

                    <ul className="space-y-2 pl-5 text-xs leading-relaxed text-stone-600 sm:text-sm list-disc">
                      {submission.references.map((reference, index) => (
                        <li key={index}>{reference}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* CATATAN CURATOR */}
              {submission.reviewNote && (
                <section
                  className={`rounded-2xl border p-5 shadow-sm sm:p-6 ${
                    isRevision
                      ? "border-rose-200 bg-white"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        isRevision
                          ? "bg-rose-100 text-rose-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {isRevision ? (
                        <AlertCircle className="h-5 w-5" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-[#3B1E14]">
                        Catatan dari Curator
                      </h2>

                      {submission.reviewedAt && (
                        <p className="text-[11px] text-stone-400">
                          Direview pada {submission.reviewedAt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-4 ${
                      isRevision
                        ? "border-rose-100 bg-rose-50/60"
                        : "border-emerald-100 bg-emerald-50/60"
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-stone-700">
                      "{submission.reviewNote}"
                    </p>
                  </div>
                </section>
              )}

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6 lg:col-span-4">

              {/* CONTRIBUTOR */}
              <section className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-bold text-[#3B1E14]">
                  Informasi Contributor
                </h2>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-[#3B1E14]">
                    <User className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#3B1E14]">
                      {submission.contributor.name}
                    </p>

                    <p className="text-xs text-stone-500">
                      {submission.contributor.email}
                    </p>
                  </div>
                </div>
              </section>

              {/* TIMELINE */}
              <section className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-base font-bold text-[#3B1E14]">
                  Riwayat Submission
                </h2>

                <div className="relative space-y-6 pl-7">
                  <div className="absolute bottom-2 left-[9px] top-2 w-px bg-stone-200" />

                  {/* SUBMITTED */}
                  <div className="relative">
                    <div className="absolute -left-7 top-0.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-4 border-amber-100 bg-amber-500" />

                    <p className="text-xs font-bold text-[#3B1E14]">
                      Pengajuan Dikirim
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-[11px] text-stone-400">
                      <Clock className="h-3 w-3" />
                      {submission.submittedAt}
                    </p>
                  </div>

                  {/* REVIEW */}
                  <div className="relative">
                    <div
                      className={`absolute -left-7 top-0.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-4 ${
                        submission.reviewedAt
                          ? "border-blue-100 bg-blue-500"
                          : "border-stone-100 bg-stone-300"
                      }`}
                    />

                    <p
                      className={`text-xs font-semibold ${
                        submission.reviewedAt
                          ? "text-[#3B1E14]"
                          : "text-stone-400"
                      }`}
                    >
                      Direview Curator
                    </p>

                    <p className="mt-1 text-[11px] text-stone-400">
                      {submission.reviewedAt || "Menunggu review"}
                    </p>
                  </div>

                  {/* FINAL STATUS */}
                  <div className="relative">
                    <div
                      className={`absolute -left-7 top-0.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-4 ${
                        isPending
                          ? "border-stone-100 bg-stone-300"
                          : isRevision
                          ? "border-rose-100 bg-rose-500"
                          : isApproved
                          ? "border-emerald-100 bg-emerald-500"
                          : "border-stone-100 bg-stone-500"
                      }`}
                    />

                    <p
                      className={`text-xs font-semibold ${
                        isPending ? "text-stone-400" : "text-[#3B1E14]"
                      }`}
                    >
                      {isRevision
                        ? "Perlu Perbaikan"
                        : isApproved
                        ? "Disetujui"
                        : isRejected
                        ? "Ditolak"
                        : "Menunggu Review"}
                    </p>

                    <p className="mt-1 text-[11px] text-stone-400">
                      {isPending
                        ? "-"
                        : submission.reviewedAt || "-"}
                    </p>
                  </div>
                </div>
              </section>

              {/* ACTION */}
              <section className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-base font-bold text-[#3B1E14]">
                  Tindakan
                </h2>

                <div className="space-y-2.5">

                  {/* REVISION */}
                  {isRevision && (
                    <>
                      <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                          <p className="text-xs leading-relaxed text-rose-800">
                            Silakan perbaiki submission sesuai catatan curator
                            sebelum dikirim kembali untuk review.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/submit-asset/${submission.id}`)
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B1E14] px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#2A150E] active:scale-[0.98]"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit Submission
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          alert("Fitur kirim ulang akan dihubungkan ke backend.")
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-xs font-bold text-stone-700 transition hover:bg-stone-50 active:scale-[0.98]"
                      >
                        <Send className="h-4 w-4" />
                        Kirim Ulang untuk Review
                      </button>
                    </>
                  )}

                  {/* PENDING */}
                  {isPending && (
                    <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3">
                      <div className="flex items-start gap-2">
                        <Hourglass className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <p className="text-xs leading-relaxed text-amber-800">
                          Submission Anda sedang menunggu proses review dari
                          curator.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* APPROVED */}
                  {isApproved && (
                    <>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <p className="text-xs leading-relaxed text-emerald-800">
                            Submission telah disetujui oleh curator.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (submission.category === "Kuliner") {
                            navigate(`/culinary/${submission.id}`);
                          } else if (submission.category === "Budaya") {
                            navigate(`/culture/${submission.id}`);
                          } else if (submission.category === "Bahan") {
                            navigate(`/ingredient/${submission.id}`);
                          } else if (submission.category === "Destinasi") {
                            navigate(`/destination/${submission.id}`);
                          } else {
                            navigate("/explore");
                          }
                        }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B1E14] px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#2A150E] active:scale-[0.98]"
                      >
                        <FileText className="h-4 w-4" />
                        Lihat Aset
                      </button>
                    </>
                  )}

                  {/* REJECTED */}
                  {isRejected && (
                    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                      <div className="flex items-start gap-2">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
                        <p className="text-xs leading-relaxed text-stone-600">
                          Submission ini telah ditolak dan tidak dapat
                          diterbitkan.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* BACK BUTTON */}
                  <button
                    type="button"
                    onClick={() => navigate("/my-submission")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-xs font-bold text-stone-700 transition hover:bg-stone-50 active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke My Submission
                  </button>

                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}