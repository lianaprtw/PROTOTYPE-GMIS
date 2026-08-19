import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  MapPin,
  CalendarDays,
  Clock3,
  FileText,
  CheckCircle2,
  XCircle,
  Star,
  UserCheck,
  UserX,
  ChevronRight,
  Utensils,
  Clock,
  Activity,
} from "lucide-react";
import CuratorSidebar from "../components/CuratorSidebar";

// Mock Data Contributors
const MOCK_CONTRIBUTORS = [
  {
    id: "1",
    name: "Ni Luh Putu Sari",
    email: "putusari@gmail.com",
    location: "Denpasar, Bali, Indonesia",
    joinedDate: "12 Juni 2025",
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    bio: "Putu Sari merupakan pecinta kuliner tradisional Bali yang aktif mendokumentasikan berbagai makanan khas daerah. Ia berkontribusi dengan informasi yang akurat dan foto berkualitas tinggi.",
  },
  {
    id: "2",
    name: "I Made Arya",
    email: "madearya@gmail.com",
    location: "Gianyar, Bali, Indonesia",
    joinedDate: "8 Juli 2025",
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
    bio: "Made Arya berfokus pada riset dokumentasi resep warisan leluhur dan ritual tradisi sajen gastronomi di wilayah Gianyar.",
  },
  {
    id: "3",
    name: "Ni Kadek Ayu",
    email: "kadekayu@gmail.com",
    location: "Karangasem, Bali, Indonesia",
    joinedDate: "20 September 2025",
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    bio: "Kadek Ayu adalah seorang pemerhati budaya kuliner lokal yang berdedikasi mengarsipkan variasi olahan rempah khas Bali Timur.",
  },
  {
    id: "4",
    name: "I Wayan Putra",
    email: "wayanputra@gmail.com",
    location: "Tabanan, Bali, Indonesia",
    joinedDate: "3 November 2025",
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    bio: "Wayan Putra aktif mengeksplorasi tanaman pangan lokal dan dokumentasi kuliner agraris di pedesaan Tabanan.",
  },
  {
    id: "5",
    name: "Ni Made Ratih",
    email: "maderatih@gmail.com",
    location: "Badung, Bali, Indonesia",
    joinedDate: "15 Januari 2026",
    status: "Aktif",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
    bio: "Made Ratih rutin membagikan dokumentasi komprehensif seputar jajanan pasar dan kue-kue tradisional Bali.",
  },
  {
    id: "6",
    name: "I Ketut Dharma",
    email: "ketutdharma@gmail.com",
    location: "Denpasar, Bali, Indonesia",
    joinedDate: "2 Februari 2026",
    status: "Tidak Aktif",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop",
    bio: "Ketut Dharma berkontribusi dalam pengarsipan dokumentasi foto dan catatan sejarah komoditas rempah daerah.",
  },
];

// Mock Data Submissions dengan relasi contributorId & struktur detail kategori
const MOCK_SUBMISSIONS = [
  {
    id: "S001",
    contributorId: "1",
    title: "Nasi Campur Bali",
    category: "Makanan Utama",
    status: "Approved",
    submittedDate: "16 Agustus 2026",
    submittedTime: "09:15 WIB",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop",
    detail: {
      description: "Hidangan nasi khas Bali yang disajikan dengan aneka lauk pauk tradisional.",
      origin: "Denpasar, Bali",
      ingredients: ["Ayam suwir", "Sate lilit", "Lawar", "Sambal matah"],
      cookingSteps: ["Menyiapkan nasi putih", "Meracik lauk pendamping"],
      culturalContext: "Disajikan pada upacara adat dan konsumsi harian masyarakat.",
      historicalBackground: "Merupakan salah satu sajian variatif paling ikonik di Bali.",
    },
  },
  {
    id: "S002",
    contributorId: "1",
    title: "Lawar Merah",
    category: "Makanan Tradisional",
    status: "Pending",
    submittedDate: "15 Agustus 2026",
    submittedTime: "14:20 WIB",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=300&auto=format&fit=crop",
    detail: {
      description: "Campuran sayuran, kelapa parut, dan daging berbumbu khas dengan racikan rempah.",
      origin: "Gianyar, Bali",
      ingredients: ["Nangka muda", "Kelapa parut", "Bumbu genep"],
      culturalContext: "Kerap dibuat secara gotong royong (ngelawar) saat upacara keagamaan.",
    },
  },
  {
    id: "S003",
    contributorId: "1",
    title: "Sate Lilit Ikan",
    category: "Makanan Utama",
    status: "Approved",
    submittedDate: "14 Agustus 2026",
    submittedTime: "10:45 WIB",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=300&auto=format&fit=crop",
    detail: {
      description: "Daging ikan cincang yang dililitkan pada batang serai dan dipanggang.",
      origin: "Klungkung, Bali",
      ingredients: ["Daging ikan tenggiri", "Santan", "Bumbu bali", "Batang serai"],
    },
  },
  {
    id: "S004",
    contributorId: "1",
    title: "Tipat Cantok",
    category: "Camilan",
    status: "Rejected",
    submittedDate: "12 Agustus 2026",
    submittedTime: "11:30 WIB",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop",
    detail: {
      description: "Ketupat dan rebusan sayuran yang diulek bersama bumbu kacang gurih manis.",
      origin: "Badung, Bali",
    },
  },
  {
    id: "S005",
    contributorId: "1",
    title: "Es Daluman",
    category: "Minuman Tradisional",
    status: "Approved",
    submittedDate: "10 Agustus 2026",
    submittedTime: "16:00 WIB",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=300&auto=format&fit=crop",
    detail: {
      description: "Minuman segar cincau hijau alami disajikan dengan santan dan gula merah.",
      origin: "Denpasar, Bali",
    },
  },
  {
    id: "S006",
    contributorId: "2",
    title: "Bebek Betutu",
    category: "Makanan Utama",
    status: "Approved",
    submittedDate: "11 Agustus 2026",
    submittedTime: "13:00 WIB",
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=300&auto=format&fit=crop",
    detail: { description: "Bebek utuh berbumbu rempah basa genep yang dipanggang lambat." },
  },
];

const CATEGORY_COLORS = ["#3B1E14", "#C98A2E", "#10B981", "#F59E0B", "#6366F1"];

export default function ContributorDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const contributor = useMemo(() => {
    return MOCK_CONTRIBUTORS.find((item) => item.id === id);
  }, [id]);

  const contributorSubmissions = useMemo(() => {
    return MOCK_SUBMISSIONS.filter((sub) => sub.contributorId === id);
  }, [id]);

  // Perhitungan statistik secara dinamis dari data submission
  const stats = useMemo(() => {
    const total = contributorSubmissions.length;
    const approved = contributorSubmissions.filter((s) => s.status === "Approved").length;
    const pending = contributorSubmissions.filter((s) => s.status === "Pending").length;
    const rejected = contributorSubmissions.filter((s) => s.status === "Rejected").length;
    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
    const pendingRate = total > 0 ? Math.round((pending / total) * 100) : 0;
    const rejectedRate = total > 0 ? Math.round((rejected / total) * 100) : 0;

    return {
      total,
      approved,
      pending,
      rejected,
      approvalRate,
      pendingRate,
      rejectedRate,
    };
  }, [contributorSubmissions]);

  // Hitung distribusi kategori secara dinamis
  const categoryStats = useMemo(() => {
    if (contributorSubmissions.length === 0) return { categories: [], topCategory: null };

    const counts = {};
    contributorSubmissions.forEach((sub) => {
      counts[sub.category] = (counts[sub.category] || 0) + 1;
    });

    const total = contributorSubmissions.length;
    const categories = Object.keys(counts).map((catName, index) => {
      const count = counts[catName];
      const percentage = Math.round((count / total) * 100);
      return {
        name: catName,
        count,
        percentage,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      };
    });

    categories.sort((a, b) => b.count - a.count);
    const topCategory = categories[0] || null;

    return { categories, topCategory };
  }, [contributorSubmissions]);

  // Tangani kasus contributor tidak ditemukan
  if (!contributor) {
    return (
      <div className="flex min-h-screen bg-[#FDFBF9] font-sans text-stone-800">
        <CuratorSidebar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md rounded-2xl border border-stone-200/80 bg-white p-8 shadow-xs">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <UserX size={28} />
            </div>
            <h2 className="font-serif text-xl font-bold text-stone-800">
              Contributor tidak ditemukan
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              Contributor yang Anda cari tidak tersedia atau ID tidak valid.
            </p>
            <button
              type="button"
              onClick={() => navigate("/curator/contributors")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3B1E14] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2A150E] cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Contributors</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  const isTopContributor = stats.total >= 4;

  // Pie/Donut conic-gradient generator
  let accumulatedPercent = 0;
  const gradientStops = categoryStats.categories.map((cat) => {
    const start = accumulatedPercent;
    accumulatedPercent += cat.percentage;
    return `${cat.color} ${start}% ${accumulatedPercent}%`;
  });
  const conicStyle = {
    background:
      gradientStops.length > 0
        ? `conic-gradient(${gradientStops.join(", ")})`
        : "#e7e5e4",
  };

  return (
    <div className="flex min-h-screen bg-[#FDFBF9] font-sans text-stone-800 antialiased">
      <CuratorSidebar />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mx-auto max-w-7xl">

          {/* HEADER & BREADCRUMB */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs text-stone-500">
                <button
                  type="button"
                  onClick={() => navigate("/curator/contributors")}
                  className="hover:text-[#3B1E14] transition cursor-pointer"
                >
                  Contributors
                </button>
                <ChevronRight size={12} className="text-stone-400" />
                <span className="font-medium text-[#3B1E14]">Detail Contributor</span>
              </div>

              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                Detail Contributor
              </h1>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                Informasi lengkap dan aktivitas contributor.
              </p>
              
              <div className="relative mt-2.5 flex items-center max-w-[240px]">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#C98A2E]/80 via-[#C98A2E]/40 to-transparent" />
                <div className="absolute left-6 h-1.5 w-1.5 rotate-45 border border-[#C98A2E] bg-[#FDFBF9]" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-medium text-stone-600 shadow-xs">
                <CalendarDays size={15} className="text-[#C98A2E]" />
                <span>Jumat, 16 Agustus 2026</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-medium text-stone-600 shadow-xs">
                <Clock3 size={15} className="text-[#C98A2E]" />
                <span>10:30 WIB</span>
              </div>
              <button
                type="button"
                onClick={() => navigate("/curator/contributors")}
                className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-xs transition hover:bg-stone-50 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Kembali ke Daftar</span>
              </button>
            </div>
          </div>

          {/* MAIN GRID LAYOUT */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* LEFT 2 COLUMNS (PROFILE + SUMMARY + ACTIVITIES + SUBMISSIONS) */}
            <div className="space-y-6 lg:col-span-2">
              
              {/* PROFILE CARD */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  
                  {/* Avatar & Main Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="h-24 w-24 rounded-full object-cover border-2 border-stone-200 shrink-0 shadow-xs"
                    />
                    <div className="space-y-2">
                      <div>
                        <h2 className="font-serif text-xl font-bold text-[#3B1E14]">
                          {contributor.name}
                        </h2>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold">
                          {isTopContributor && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-amber-700 border border-amber-200/60">
                              <Star size={11} className="fill-amber-500 text-amber-500" />
                              Top Contributor
                            </span>
                          )}
                          {contributor.status === "Aktif" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-700 border border-emerald-200/60">
                              <UserCheck size={11} />
                              Aktif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-stone-600 border border-stone-200">
                              <UserX size={11} />
                              Tidak Aktif
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Mail size={13} className="text-stone-400 shrink-0" />
                          <span>{contributor.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-[#C98A2E] shrink-0" />
                          <span>{contributor.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays size={13} className="text-stone-400 shrink-0" />
                          <span>Bergabung sejak {contributor.joinedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="border-t border-stone-100 pt-4 md:w-64 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Tentang Contributor
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600">
                      {contributor.bio}
                    </p>
                  </div>

                </div>
              </div>

              {/* 4 SUMMARY CARDS */}
              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                {/* Total Submission */}
                <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500">Total Submission</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                      <FileText size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-[#3B1E14]">
                      {stats.total} <span className="text-xs font-normal text-stone-400">aset</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-stone-400">Semua kontribusi</p>
                  </div>
                </div>

                {/* Disetujui */}
                <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500">Disetujui</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-emerald-700">
                      {stats.approved} <span className="text-xs font-normal text-stone-400">aset</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-emerald-600 font-medium">
                      {stats.approvalRate}% dari total
                    </p>
                  </div>
                </div>

                {/* Dalam Review */}
                <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500">Dalam Review</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <Clock3 size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-amber-700">
                      {stats.pending} <span className="text-xs font-normal text-stone-400">aset</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-amber-600 font-medium">
                      {stats.pendingRate}% dari total
                    </p>
                  </div>
                </div>

                {/* Ditolak */}
                <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500">Ditolak</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                      <XCircle size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-rose-700">
                      {stats.rejected} <span className="text-xs font-normal text-stone-400">aset</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-rose-600 font-medium">
                      {stats.rejectedRate}% dari total
                    </p>
                  </div>
                </div>
              </div>

              {/* AKTIVITAS TERBARU & SUBMISSION TERBARU GRID */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                
                {/* AKTIVITAS TERBARU */}
                <div className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
                      <h3 className="font-serif text-base font-bold text-stone-800">
                        Aktivitas Terbaru
                      </h3>
                      <Activity size={16} className="text-[#C98A2E]" />
                    </div>

                    {contributorSubmissions.length === 0 ? (
                      <p className="py-6 text-center text-xs text-stone-400">Belum ada aktivitas.</p>
                    ) : (
                      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-100">
                        {contributorSubmissions.map((item) => {
                          let iconNode = <FileText size={12} className="text-stone-600" />;
                          let badgeBg = "bg-stone-100 border-stone-200";
                          let labelText = "Submission baru";

                          if (item.status === "Approved") {
                            iconNode = <CheckCircle2 size={12} className="text-emerald-600" />;
                            badgeBg = "bg-emerald-50 border-emerald-200";
                            labelText = "Submission disetujui";
                          } else if (item.status === "Pending") {
                            iconNode = <Clock3 size={12} className="text-amber-600" />;
                            badgeBg = "bg-amber-50 border-amber-200";
                            labelText = "Submission dalam review";
                          } else if (item.status === "Rejected") {
                            iconNode = <XCircle size={12} className="text-rose-600" />;
                            badgeBg = "bg-rose-50 border-rose-200";
                            labelText = "Submission ditolak";
                          }

                          return (
                            <div key={item.id} className="relative text-xs">
                              <div className={`absolute -left-[23px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${badgeBg} bg-white shadow-xs`}>
                                {iconNode}
                              </div>
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-semibold text-stone-800">{labelText}</p>
                                  <p className="text-stone-500 text-[11px]">{item.title}</p>
                                </div>
                                <span className="text-[10px] text-stone-400 whitespace-nowrap">
                                  {item.submittedDate} · {item.submittedTime}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 text-center">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:text-[#3B1E14] transition cursor-pointer"
                    >
                      <span>Lihat Semua Aktivitas</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* SUBMISSION TERBARU */}
                <div className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
                      <h3 className="font-serif text-base font-bold text-stone-800">
                        Submission Terbaru
                      </h3>
                      <Utensils size={16} className="text-[#C98A2E]" />
                    </div>

                    {contributorSubmissions.length === 0 ? (
                      <p className="py-6 text-center text-xs text-stone-400">Belum ada submission.</p>
                    ) : (
                      <div className="space-y-3">
                        {contributorSubmissions.slice(0, 3).map((sub) => (
                          <div
                            key={sub.id}
                            onClick={() => navigate(`/curator/submissions/${sub.id}`)}
                            className="group flex items-center justify-between gap-3 rounded-xl border border-stone-100 p-2.5 transition hover:border-stone-300 hover:bg-stone-50/70 cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={sub.image}
                                alt={sub.title}
                                className="h-12 w-12 rounded-lg object-cover shrink-0 border border-stone-200"
                              />
                              <div className="min-w-0">
                                <h4 className="font-bold text-xs text-[#3B1E14] truncate group-hover:underline">
                                  {sub.title}
                                </h4>
                                <p className="text-[11px] text-stone-500 truncate">{sub.category}</p>
                                <p className="text-[10px] text-stone-400 mt-0.5">
                                  {sub.submittedDate} · {sub.submittedTime}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              {sub.status === "Approved" && (
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                                  Disetujui
                                </span>
                              )}
                              {sub.status === "Pending" && (
                                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200">
                                  Dalam Review
                                </span>
                              )}
                              {sub.status === "Rejected" && (
                                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 border border-rose-200">
                                  Ditolak
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 text-center">
                    <button
                      type="button"
                      onClick={() => navigate(`/curator/submissions?contributorId=${contributor.id}`)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#C98A2E] hover:text-[#3B1E14] transition cursor-pointer"
                    >
                      <span>Lihat Semua Submission</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN (RINGKASAN KONTRIBUSI & KATEGORI) */}
            <div className="space-y-6">

              {/* RINGKASAN KONTRIBUSI CARD */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
                <h3 className="font-serif text-base font-bold text-stone-800 border-b border-stone-100 pb-3 mb-4">
                  Ringkasan Kontribusi
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600">
                      <FileText size={15} className="text-stone-400" />
                      <span>Total Submission</span>
                    </div>
                    <span className="font-bold text-stone-800">{stats.total} aset</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600">
                      <CheckCircle2 size={15} className="text-emerald-500" />
                      <span>Disetujui</span>
                    </div>
                    <span className="font-bold text-emerald-700">{stats.approved} aset</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600">
                      <Clock3 size={15} className="text-amber-500" />
                      <span>Dalam Review</span>
                    </div>
                    <span className="font-bold text-amber-700">{stats.pending} aset</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600">
                      <XCircle size={15} className="text-rose-500" />
                      <span>Ditolak</span>
                    </div>
                    <span className="font-bold text-rose-700">{stats.rejected} aset</span>
                  </div>
                </div>

                {/* Progress Bar Dinamis */}
                <div className="mt-6 border-t border-stone-100 pt-4">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-stone-600">Tingkat Persetujuan</span>
                    <span className="text-emerald-700 font-bold">{stats.approvalRate}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${stats.approvalRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* KONTRIBUSI PER KATEGORI CARD */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
                <h3 className="font-serif text-base font-bold text-stone-800 border-b border-stone-100 pb-3 mb-4">
                  Kontribusi per Kategori
                </h3>

                {categoryStats.categories.length === 0 ? (
                  <p className="py-6 text-center text-xs text-stone-400">Data kategori belum tersedia.</p>
                ) : (
                  <div>
                    {/* Visualisasi Donut Chart sederhana berbasis CSS Conic Gradient */}
                    <div className="flex items-center justify-between gap-4 my-2">
                      <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full shadow-inner" style={conicStyle}>
                        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-xs">
                          <span className="text-xs font-bold text-stone-700">{stats.total} Aset</span>
                        </div>
                      </div>

                      {/* Legend Categories */}
                      <div className="flex-1 space-y-2 text-xs">
                        {categoryStats.categories.map((cat, i) => (
                          <div key={i} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                className="h-2.5 w-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: cat.color }}
                              />
                              <span className="truncate text-stone-600 text-[11px]">{cat.name}</span>
                            </div>
                            <span className="font-bold text-stone-800 text-[11px]">{cat.count} aset</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlight Kategori Terbanyak */}
                    {categoryStats.topCategory && (
                      <div className="mt-5 rounded-xl border border-stone-100 bg-[#FDFBF9] p-3.5 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B1E14] text-white">
                          <Utensils size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400">
                            Kategori Terbanyak
                          </p>
                          <p className="font-bold text-sm text-[#3B1E14]">
                            {categoryStats.topCategory.name}
                          </p>
                          <p className="text-xs text-stone-500">
                            {categoryStats.topCategory.count} aset ({categoryStats.topCategory.percentage}%)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}