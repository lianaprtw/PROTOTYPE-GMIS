import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  FileText,
  Landmark,
  BookOpen,
  Info,
  CheckCircle2,
  RefreshCw,
  XCircle,
  Send,
  Expand,
  ChevronRight,
  ChevronLeft,
  X,
  Star,
  AlertCircle,
  User,
  Utensils,
  Sparkles,
  Layers,
  Globe,
  Phone,
} from "lucide-react";

import CuratorSidebar from "../components/CuratorSidebar";
import { SUBMISSIONS } from "./SubmissionDetail";

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function DetailReviewSubmission() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =====================================================
  // AMBIL DATA SUBMISSION DARI SUMBER YANG SAMA
  // DENGAN SUBMISSION DETAIL
  // =====================================================

  const submission = SUBMISSIONS[id];

  // =====================================================
  // JIKA SUBMISSION TIDAK DITEMUKAN
  // =====================================================

  if (!submission) {
    return (
      <div className="flex min-h-screen bg-[#FDFBF9] font-sans text-stone-800">
        <CuratorSidebar />

        <main className="flex-1 flex items-center justify-center p-6">
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
              onClick={() => navigate("/curator/reviews")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3B1E14] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2A150E]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Review Submission
            </button>
          </div>
        </main>
      </div>
    );
  }

  // =====================================================
  // NORMALISASI DATA
  // =====================================================

  const reviewData = {
    id: submission.id,

    status: submission.status,

    submittedAt: submission.submittedAt,

    currentDate: submission.submittedAt
      ? submission.submittedAt.split(",")[0]
      : "-",

    currentTime: submission.submittedAt
      ? submission.submittedAt.split(",")[1]?.trim() || "-"
      : "-",

    contributor: {
      ...submission.contributor,

      // Lokasi contributor diambil dari lokasi submission
      location: submission.location,
    },

    asset: {
      name: submission.name,

      category: submission.category,

      location: submission.location,

      description: submission.description,

      images: submission.image ? [submission.image] : [],

      gastronomyValues: submission.gastronomyValues || [],

      culturalMeaning: submission.culturalMeaning || "",

      references: submission.references || [],

      details: submission.details || null,
    },
  };

  // =====================================================
  // STATE
  // =====================================================

  const [reviewNote, setReviewNote] = useState("");
  const [decision, setDecision] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Gallery
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // =====================================================
  // ESC KEY
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsGalleryOpen(false);
        setShowConfirmModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =====================================================
  // REVIEW HANDLER
  // =====================================================

  const handleDecisionSelect = (type) => {
    setDecision(type);

    if (validationError) {
      setValidationError("");
    }
  };

  const handleNoteChange = (e) => {
    if (e.target.value.length <= 500) {
      setReviewNote(e.target.value);

      if (validationError) {
        setValidationError("");
      }
    }
  };

  const handleOpenConfirm = () => {
    if (!decision) {
      setValidationError("Silakan pilih keputusan review.");
      return;
    }

    if (!reviewNote.trim()) {
      setValidationError("Catatan review wajib diisi.");
      return;
    }

    setValidationError("");
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 800);
  };

  const handleFinishAndNavigate = () => {
    setShowSuccessModal(false);
    navigate("/curator/reviews");
  };

  // =====================================================
  // GALLERY
  // =====================================================

  const images = reviewData.asset.images || [];

  const mainImage =
    images[0] ||
    "https://via.placeholder.com/1200x800?text=No+Image";

  const thumbnails = images.slice(1, 6);

  const remainingImageCount =
    images.length > 6 ? images.length - 6 : 0;

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusStyle = () => {
    switch (reviewData.status) {
      case "Disetujui":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Perlu Perbaikan":
        return "bg-rose-50 text-rose-700 border-rose-200";

      case "Ditolak":
        return "bg-stone-100 text-stone-700 border-stone-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  // =====================================================
  // MODAL CONFIG
  // =====================================================

  const getModalConfig = () => {
    switch (decision) {
      case "approve":
        return {
          title: "Setujui Aset Ini?",
          text:
            "Aset akan diterbitkan dan dapat diakses oleh pengguna Gastro Pustaka.",
          confirmBtnText: "Ya, Approve",
          confirmBg: "bg-emerald-600 hover:bg-emerald-700",
          icon: (
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          ),
        };

      case "revision":
        return {
          title: "Minta Revisi?",
          text:
            "Catatan review akan dikirim kepada contributor untuk memperbaiki pengajuan.",
          confirmBtnText: "Ya, Minta Revisi",
          confirmBg: "bg-amber-600 hover:bg-amber-700",
          icon: (
            <RefreshCw className="h-12 w-12 text-amber-600" />
          ),
        };

      case "reject":
        return {
          title: "Tolak Pengajuan?",
          text:
            "Pengajuan ini akan ditolak dan tidak diterbitkan.",
          confirmBtnText: "Ya, Tolak",
          confirmBg: "bg-rose-600 hover:bg-rose-700",
          icon: (
            <XCircle className="h-12 w-12 text-rose-600" />
          ),
        };

      default:
        return {};
    }
  };

  // =====================================================
  // RENDER DETAIL KATEGORI
  // =====================================================

  const renderCategoryDetails = () => {
    const details = reviewData.asset.details;

    if (!details) {
      return null;
    }

    switch (reviewData.asset.category) {
      // =================================================
      // KULINER
      // =================================================

      case "Kuliner":
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                <Utensils className="h-4 w-4 text-amber-900" />
              </div>

              <h3 className="text-sm font-semibold text-[#3B1E14]">
                Spesifikasi Resep & Olahan Kuliner
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {details.prepTime && (
                <DetailBox
                  label="Waktu Persiapan"
                  value={details.prepTime}
                />
              )}

              {details.cookTime && (
                <DetailBox
                  label="Waktu Memasak"
                  value={details.cookTime}
                />
              )}

              {details.servings && (
                <DetailBox
                  label="Porsi"
                  value={details.servings}
                />
              )}

              {details.cookingMethod && (
                <DetailBox
                  label="Teknik / Metode"
                  value={details.cookingMethod}
                />
              )}
            </div>

            {details.ingredients?.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-bold text-[#3B1E14]">
                  Daftar Bahan Utama
                </h4>

                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {details.ingredients.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2 text-xs text-stone-600"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details.cookingSteps?.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-bold text-[#3B1E14]">
                  Tahapan Pembuatan
                </h4>

                <ol className="space-y-2">
                  {details.cookingSteps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-xs text-stone-600"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-900">
                        {index + 1}
                      </span>

                      <span className="leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        );

      // =================================================
      // BUDAYA
      // =================================================

      case "Budaya":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                <Sparkles className="h-4 w-4 text-purple-900" />
              </div>

              <h3 className="text-sm font-semibold text-[#3B1E14]">
                Detail Nilai & Tradisi Kebudayaan
              </h3>
            </div>

            {details.origin && (
              <DetailParagraph
                label="Asal Usul & Wilayah"
                value={details.origin}
              />
            )}

            {details.historicalContext && (
              <DetailParagraph
                label="Konteks Sejarah"
                value={details.historicalContext}
              />
            )}

            {details.ritualSteps?.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-bold text-[#3B1E14]">
                  Tahapan Pelaksanaan Tradisi
                </h4>

                <ol className="space-y-2">
                  {details.ritualSteps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs text-stone-600"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-bold text-purple-800">
                        {index + 1}
                      </span>

                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {details.communityRole && (
              <DetailParagraph
                label="Peran & Dampak Sosial"
                value={details.communityRole}
              />
            )}
          </div>
        );

      // =================================================
      // BAHAN
      // =================================================

      case "Bahan":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                <Layers className="h-4 w-4 text-emerald-900" />
              </div>

              <h3 className="text-sm font-semibold text-[#3B1E14]">
                Karakteristik & Pengolahan Bahan
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {details.originRegion && (
                <DetailBox
                  label="Asal Daerah / Sumber"
                  value={details.originRegion}
                />
              )}

              {details.availability && (
                <DetailBox
                  label="Musim & Ketersediaan"
                  value={details.availability}
                />
              )}
            </div>

            {details.characteristics && (
              <DetailParagraph
                label="Ciri Khas & Profil Rasa"
                value={details.characteristics}
              />
            )}

            {details.usageAndProcessing && (
              <DetailParagraph
                label="Penggunaan & Pengolahan Kuliner"
                value={details.usageAndProcessing}
              />
            )}
          </div>
        );

      // =================================================
      // DESTINASI
      // =================================================

      case "Destinasi":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                <MapPin className="h-4 w-4 text-sky-900" />
              </div>

              <h3 className="text-sm font-semibold text-[#3B1E14]">
                Informasi Lokasi & Akses Destinasi
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {details.operatingHours && (
                <DetailBox
                  label="Jam Operasional"
                  value={details.operatingHours}
                />
              )}

              {details.facilities && (
                <DetailBox
                  label="Fasilitas Tersedia"
                  value={details.facilities}
                />
              )}
            </div>

            {details.address && (
              <DetailParagraph
                label="Alamat Lengkap"
                value={details.address}
              />
            )}

            {details.attractions && (
              <DetailParagraph
                label="Daya Tarik Utama"
                value={details.attractions}
              />
            )}

            {details.website && (
              <div className="flex items-center gap-2 text-xs text-sky-700">
                <Globe className="h-3.5 w-3.5" />

                <a
                  href={details.website}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-sky-900"
                >
                  {details.website}
                </a>
              </div>
            )}
          </div>
        );

      // =================================================
      // AGENDA
      // =================================================

      case "Agenda":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100">
                <CalendarDays className="h-4 w-4 text-rose-900" />
              </div>

              <h3 className="text-sm font-semibold text-[#3B1E14]">
                Detail Pelaksanaan Agenda / Event
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {details.eventDate && (
                <DetailBox
                  label="Tanggal Pelaksanaan"
                  value={details.eventDate}
                />
              )}

              {details.eventTime && (
                <DetailBox
                  label="Waktu / Jam"
                  value={details.eventTime}
                />
              )}
            </div>

            {details.organizer && (
              <DetailParagraph
                label="Penyelenggara"
                value={details.organizer}
              />
            )}

            {details.venue && (
              <DetailParagraph
                label="Tempat Utama"
                value={details.venue}
              />
            )}

            <div className="flex flex-wrap gap-4 border-t border-stone-100 pt-3 text-xs">
              {details.registrationInfo && (
                <span className="text-stone-600">
                  <strong className="text-stone-800">
                    Pendaftaran:
                  </strong>{" "}
                  {details.registrationInfo}
                </span>
              )}

              {details.contactPerson && (
                <span className="flex items-center gap-1 text-stone-600">
                  <Phone className="h-3.5 w-3.5 text-stone-400" />
                  {details.contactPerson}
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
  // UI
  // =====================================================

  return (
    <div className="flex min-h-screen bg-[#FDFBF9] font-sans text-stone-800 antialiased">
      <CuratorSidebar />

      <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1280px] space-y-6">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="space-y-4">
            <button
              onClick={() => navigate("/curator/reviews")}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-[#3B1E14] shadow-sm transition hover:bg-stone-50 sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Review Submission
            </button>

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                  Detail Review Submission
                </h1>

                <p className="mt-1 text-sm text-stone-500">
                  Tinjau detail pengajuan aset yang dikirim oleh contributor.
                </p>
              </div>

              <div className="flex flex-col gap-1.5 text-xs sm:text-sm md:items-end">
                <div className="flex items-center gap-2 text-stone-600">
                  <CalendarDays className="h-4 w-4 text-stone-400" />
                  {reviewData.currentDate}

                  <span className="text-stone-300">•</span>

                  <Clock3 className="h-4 w-4 text-stone-400" />
                  {reviewData.currentTime}
                </div>

                <span
                  className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle()}`}
                >
                  {reviewData.status}
                </span>

                <p className="text-xs text-stone-400">
                  Diajukan pada {reviewData.submittedAt}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-6 lg:col-span-8">

              {/* =================================================
                  CONTRIBUTOR
              ================================================= */}

              <section className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 text-base font-bold text-[#3B1E14] sm:text-lg">
                  Informasi Contributor
                </h2>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-stone-100 bg-amber-50 text-[#3B1E14] shadow-sm sm:h-16 sm:w-16">
                    <User className="h-7 w-7" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#3B1E14] sm:text-lg">
                      {reviewData.contributor.name}
                    </h3>

                    <div className="flex flex-col gap-2 text-xs text-stone-500 sm:flex-row sm:items-center sm:gap-4 sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-stone-400" />
                        {reviewData.contributor.email}
                      </span>

                      {reviewData.contributor.location && (
                        <>
                          <span className="hidden text-stone-300 sm:inline">
                            •
                          </span>

                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-stone-400" />
                            {reviewData.contributor.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* =================================================
                  INFORMASI ASET
              ================================================= */}

              <section className="space-y-6 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">

                <div>
                  <h2 className="mb-4 text-base font-bold text-[#3B1E14] sm:text-lg">
                    Informasi Aset
                  </h2>

                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-amber-700">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl font-bold text-[#3B1E14] sm:text-2xl">
                          {reviewData.asset.name}
                        </h3>

                        <span className="rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          {reviewData.asset.category}
                        </span>

                        <span className="flex items-center gap-1 rounded-md border border-stone-200 bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
                          <MapPin className="h-3 w-3 text-stone-400" />
                          {reviewData.asset.location}
                        </span>
                      </div>

                      <p className="pt-1 text-sm leading-relaxed text-stone-600">
                        {reviewData.asset.description}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-stone-100" />

                {/* =================================================
                    GALLERY
                ================================================= */}

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-stone-700">
                    Dokumentasi Aset
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                    <div
                      onClick={() => {
                        setActiveImageIndex(0);
                        setIsGalleryOpen(true);
                      }}
                      className="group relative h-[220px] cursor-pointer overflow-hidden rounded-xl bg-stone-100 sm:col-span-7 sm:h-[260px]"
                    >
                      <img
                        src={mainImage}
                        alt={reviewData.asset.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                    </div>

                    <div className="grid h-[220px] grid-cols-3 gap-2.5 sm:col-span-5 sm:h-[260px]">
                      {thumbnails.map((imgUrl, idx) => {
                        const actualIndex = idx + 1;

                        const isLast =
                          idx === thumbnails.length - 1 &&
                          remainingImageCount > 0;

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setActiveImageIndex(actualIndex);
                              setIsGalleryOpen(true);
                            }}
                            className="group relative h-full cursor-pointer overflow-hidden rounded-lg bg-stone-100"
                          >
                            <img
                              src={imgUrl}
                              alt={`Dokumentasi ${actualIndex + 1}`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {isLast && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-bold text-white backdrop-blur-[1px]">
                                +{remainingImageCount + 1} Lainnya
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveImageIndex(0);
                      setIsGalleryOpen(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 py-2.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 sm:text-sm"
                  >
                    <Expand className="h-4 w-4 text-stone-500" />
                    Lihat Gambar Lebih Besar
                  </button>
                </div>

                <hr className="border-stone-100" />

                {/* =================================================
                    CATEGORY DETAILS
                ================================================= */}

                {reviewData.asset.details && (
                  <>
                    {renderCategoryDetails()}

                    <hr className="border-stone-100" />
                  </>
                )}

                {/* =================================================
                    GASTRONOMY VALUES
                ================================================= */}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-[#3B1E14]">
                      <Landmark className="h-4 w-4" />
                    </div>

                    <h3 className="text-sm font-semibold text-[#3B1E14]">
                      Nilai Gastronomi & Budaya
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {reviewData.asset.gastronomyValues.map(
                      (value, index) => {
                        const styles = [
                          "bg-purple-50 text-purple-700 border-purple-100",
                          "bg-blue-50 text-blue-700 border-blue-100",
                          "bg-emerald-50 text-emerald-700 border-emerald-100",
                          "bg-amber-50 text-amber-800 border-amber-100",
                        ];

                        return (
                          <span
                            key={value}
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${styles[index % styles.length]}`}
                          >
                            {value}
                          </span>
                        );
                      }
                    )}
                  </div>

                  <p className="pt-1 text-xs leading-relaxed text-stone-600 sm:text-sm">
                    {reviewData.asset.culturalMeaning}
                  </p>
                </div>

                <hr className="border-stone-100" />

                {/* =================================================
                    REFERENCES
                ================================================= */}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-[#3B1E14]">
                      <BookOpen className="h-4 w-4" />
                    </div>

                    <h3 className="text-sm font-semibold text-[#3B1E14]">
                      Sumber Informasi
                    </h3>
                  </div>

                  <ul className="list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-stone-600 sm:text-sm">
                    {reviewData.asset.references.map(
                      (reference, index) => (
                        <li key={index}>{reference}</li>
                      )
                    )}
                  </ul>
                </div>
              </section>
            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="space-y-6 lg:col-span-4">

              {/* =================================================
                  STATUS
              ================================================= */}

              <section className="space-y-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-base font-bold text-[#3B1E14]">
                  Status Submission
                </h2>

                <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-2.5 before:top-2 before:w-0.5 before:bg-stone-200">

                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 h-5 w-5 rounded-full border-4 border-amber-100 bg-amber-500" />

                    <p className="text-xs font-bold text-[#3B1E14] sm:text-sm">
                      Diajukan
                    </p>

                    <p className="text-xs text-stone-400">
                      {reviewData.submittedAt}
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 h-5 w-5 rounded-full border-4 border-stone-100 bg-stone-300" />

                    <p className="text-xs font-medium text-stone-400 sm:text-sm">
                      Sedang Direview
                    </p>

                    <p className="text-xs text-stone-300">
                      -
                    </p>
                  </div>

                  <div className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 h-5 w-5 rounded-full border-4 ${
                        reviewData.status === "Disetujui"
                          ? "border-emerald-100 bg-emerald-500"
                          : reviewData.status === "Perlu Perbaikan"
                          ? "border-rose-100 bg-rose-500"
                          : reviewData.status === "Ditolak"
                          ? "border-stone-200 bg-stone-500"
                          : "border-stone-100 bg-stone-300"
                      }`}
                    />

                    <p
                      className={`text-xs sm:text-sm ${
                        reviewData.status === "Menunggu Review"
                          ? "font-medium text-stone-400"
                          : "font-bold text-[#3B1E14]"
                      }`}
                    >
                      {reviewData.status === "Menunggu Review"
                        ? "Selesai"
                        : reviewData.status}
                    </p>

                    <p className="text-xs text-stone-400">
                      {reviewData.status === "Menunggu Review"
                        ? "-"
                        : reviewData.submittedAt}
                    </p>
                  </div>
                </div>
              </section>

              {/* =================================================
                  REVIEW CURATOR
              ================================================= */}

              <section className="space-y-5 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-base font-bold text-[#3B1E14]">
                  Review oleh Curator
                </h2>

                <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-3.5 text-xs leading-relaxed text-sky-900">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />

                  <p>
                    Berikan keputusan setelah meninjau detail informasi aset
                    di sebelah kiri.
                  </p>
                </div>

                {/* CATATAN */}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 sm:text-sm">
                    Catatan Review{" "}
                    <span className="text-rose-500">*</span>
                  </label>

                  <textarea
                    rows={4}
                    value={reviewNote}
                    onChange={handleNoteChange}
                    placeholder="Tuliskan catatan, koreksi, atau saran terkait pengajuan ini..."
                    className="w-full resize-y rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs text-stone-800 placeholder-stone-400 transition-all focus:border-[#C98A2E] focus:outline-none focus:ring-2 focus:ring-[#C98A2E]/50 sm:text-sm"
                  />

                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>
                      Catatan ini akan dikirim ke contributor.
                    </span>

                    <span>{reviewNote.length}/500</span>
                  </div>
                </div>

                {/* KEPUTUSAN */}

                <div className="space-y-2.5">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 sm:text-sm">
                      Keputusan Review{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <p className="text-xs text-stone-400">
                      Pilih keputusan review
                    </p>
                  </div>

                  {/* APPROVE */}

                  <DecisionCard
                    selected={decision === "approve"}
                    onClick={() =>
                      handleDecisionSelect("approve")
                    }
                    color="emerald"
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    title="Approve"
                    description="Setujui dan terbitkan aset ini"
                  />

                  {/* REVISION */}

                  <DecisionCard
                    selected={decision === "revision"}
                    onClick={() =>
                      handleDecisionSelect("revision")
                    }
                    color="amber"
                    icon={<RefreshCw className="h-5 w-5" />}
                    title="Request Revision"
                    description="Minta contributor untuk memperbaiki"
                  />

                  {/* REJECT */}

                  <DecisionCard
                    selected={decision === "reject"}
                    onClick={() =>
                      handleDecisionSelect("reject")
                    }
                    color="rose"
                    icon={<XCircle className="h-5 w-5" />}
                    title="Reject"
                    description="Tolak pengajuan ini"
                  />
                </div>

                {/* ERROR */}

                {validationError && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* SUBMIT */}

                <button
                  onClick={handleOpenConfirm}
                  disabled={
                    !decision ||
                    !reviewNote.trim() ||
                    isSubmitting
                  }
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold shadow-sm transition-all sm:text-sm ${
                    !decision || !reviewNote.trim()
                      ? "cursor-not-allowed bg-stone-200 text-stone-400"
                      : decision === "approve"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : decision === "revision"
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "bg-rose-600 text-white hover:bg-rose-700"
                  }`}
                >
                  {decision === "approve" && (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Approve & Terbitkan
                    </>
                  )}

                  {decision === "revision" && (
                    <>
                      <Send className="h-4 w-4" />
                      Kirim Permintaan Revisi
                    </>
                  )}

                  {decision === "reject" && (
                    <>
                      <XCircle className="h-4 w-4" />
                      Konfirmasi Penolakan
                    </>
                  )}

                  {!decision && "Pilih Keputusan Review"}
                </button>

                <div className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-[11px] leading-tight text-amber-900">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                  <span>
                    Pastikan semua informasi sudah sesuai sebelum memberikan
                    keputusan.
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================
          GALLERY MODAL
      ===================================================== */}

      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/90 p-4 backdrop-blur-sm sm:p-6">

          <div className="mx-auto flex w-full max-w-6xl items-center justify-between text-white">
            <span className="text-xs font-medium text-stone-300 sm:text-sm">
              Dokumentasi Aset ({activeImageIndex + 1} dari{" "}
              {images.length})
            </span>

            <button
              onClick={() => setIsGalleryOpen(false)}
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative mx-auto my-4 flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden">

            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === 0
                    ? images.length - 1
                    : prev - 1
                )
              }
              className="absolute left-2 z-10 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/80 sm:left-4"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <img
              src={images[activeImageIndex]}
              alt={`Dokumentasi ${activeImageIndex + 1}`}
              className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-2xl"
            />

            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === images.length - 1
                    ? 0
                    : prev + 1
                )
              }
              className="absolute right-2 z-10 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/80 sm:right-4"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="mx-auto w-full max-w-4xl overflow-x-auto pb-2">
            <div className="flex min-w-max items-center justify-center gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setActiveImageIndex(index)
                  }
                  className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition-all sm:h-16 sm:w-16 ${
                    activeImageIndex === index
                      ? "scale-105 border-[#C98A2E]"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CONFIRMATION MODAL
      ===================================================== */}

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md space-y-5 rounded-2xl border border-stone-100 bg-white p-6 shadow-2xl">

            <div className="space-y-2 text-center">
              <div className="mb-1 flex justify-center">
                {getModalConfig().icon}
              </div>

              <h3 className="text-xl font-bold text-[#3B1E14]">
                {getModalConfig().title}
              </h3>

              <p className="text-xs leading-relaxed text-stone-600 sm:text-sm">
                {getModalConfig().text}
              </p>
            </div>

            <div className="space-y-1 rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs text-stone-600">
              <span className="font-semibold text-stone-800">
                Catatan Review Anda:
              </span>

              <p className="break-words italic text-stone-700">
                "{reviewNote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 rounded-xl bg-stone-100 px-4 py-2.5 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-200 sm:text-sm"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmSubmit}
                className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors sm:text-sm ${getModalConfig().confirmBg}`}
              >
                {getModalConfig().confirmBtnText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SUCCESS MODAL
      ===================================================== */}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm space-y-4 rounded-2xl border border-stone-100 bg-white p-6 text-center shadow-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#3B1E14]">
                Keputusan Berhasil Disimpan
              </h3>

              <p className="text-xs text-stone-500">
                Status submission telah diperbarui dan notifikasi telah
                dikirim ke contributor.
              </p>
            </div>

            <button
              onClick={handleFinishAndNavigate}
              className="w-full rounded-xl bg-[#3B1E14] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#2A150E] sm:text-sm"
            >
              Kembali ke Review Submission
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// HELPER COMPONENTS
// =====================================================

function DetailBox({ label, value }) {
  return (
    <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
      <p className="text-[11px] font-semibold text-stone-500">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold leading-relaxed text-stone-800">
        {value}
      </p>
    </div>
  );
}

function DetailParagraph({ label, value }) {
  return (
    <div>
      <h4 className="mb-1 text-xs font-bold text-[#3B1E14]">
        {label}
      </h4>

      <p className="text-xs leading-relaxed text-stone-600 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

function DecisionCard({
  selected,
  onClick,
  color,
  icon,
  title,
  description,
}) {
  const styles = {
    emerald: {
      selected: "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20",
      normal: "border-stone-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/20",
      iconSelected: "bg-emerald-500 text-white",
      iconNormal: "bg-emerald-100 text-emerald-700",
      arrow: "text-emerald-600",
    },

    amber: {
      selected: "border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20",
      normal: "border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/20",
      iconSelected: "bg-amber-500 text-white",
      iconNormal: "bg-amber-100 text-amber-700",
      arrow: "text-amber-600",
    },

    rose: {
      selected: "border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20",
      normal: "border-stone-200 bg-white hover:border-rose-300 hover:bg-rose-50/20",
      iconSelected: "bg-rose-500 text-white",
      iconNormal: "bg-rose-100 text-rose-700",
      arrow: "text-rose-600",
    },
  };

  const style = styles[color];

  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
        selected ? style.selected : style.normal
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            selected
              ? style.iconSelected
              : style.iconNormal
          }`}
        >
          {icon}
        </div>

        <div>
          <p className="text-xs font-bold text-stone-800 sm:text-sm">
            {title}
          </p>

          <p className="text-[11px] text-stone-500">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight
        className={`h-4 w-4 ${
          selected ? style.arrow : "text-stone-300"
        }`}
      />
    </div>
  );
}