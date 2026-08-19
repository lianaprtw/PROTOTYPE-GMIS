import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  CalendarDays,
  Camera,
  Globe,
  Clock3,
  Monitor,
  List,
  Bell,
  Pencil,
  ShieldCheck,
  Lock,
  Smartphone,
  LogOut,
  Info,
  Database,
  ExternalLink,
  RotateCcw,
  Save,
  ChevronRight,
  ChevronDown,
  Sun,
  CheckCircle2,
  FileText,
  X,
  AlertTriangle,
} from "lucide-react";
import CuratorSidebar from "../components/CuratorSidebar";

// REUSABLE TOGGLE COMPONENT
function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
        enabled ? "bg-[#3B1E14]" : "bg-stone-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();

  // Mock Curator State
  const [curator, setCurator] = useState({
    name: "Ni Luh Putu Sari",
    email: "putusari@gastropustaka.id",
    role: "Curator",
    joinedDate: "12 Juni 2025",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  });

  // System Preferences States
  const [language, setLanguage] = useState("Bahasa Indonesia");
  const [timezone, setTimezone] = useState("WIB (UTC+7)");
  const [theme, setTheme] = useState("Terang");
  const [itemsPerPage, setItemsPerPage] = useState("10 Item");

  // Review Settings States
  const [newSubmissionNotification, setNewSubmissionNotification] = useState(true);
  const [revisionNotification, setRevisionNotification] = useState(true);
  const [reviewConfirmation, setReviewConfirmation] = useState(true);
  const [reviewDeadline, setReviewDeadline] = useState("3 Hari");

  // Notification Preferences States
  const [emailNotification, setEmailNotification] = useState(true);
  const [newSubmission, setNewSubmission] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(true);
  const [commentsNotification, setCommentsNotification] = useState(false);
  const [reviewReminder, setReviewReminder] = useState(true);

  // Modals & UI States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form Passwords
  const [passwords, setPasswords] = useState({ old: "", newP: "", confirmP: "" });

  // Handle Save All Settings
  const handleSaveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  // Handle Reset to Default
  const handleResetToDefault = () => {
    setLanguage("Bahasa Indonesia");
    setTimezone("WIB (UTC+7)");
    setTheme("Terang");
    setItemsPerPage("10 Item");

    setNewSubmissionNotification(true);
    setRevisionNotification(true);
    setReviewConfirmation(true);
    setReviewDeadline("3 Hari");

    setEmailNotification(true);
    setNewSubmission(true);
    setSubmissionStatus(true);
    setCommentsNotification(false);
    setReviewReminder(true);

    setShowResetModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
                Settings
              </h1>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                Kelola pengaturan akun, preferensi sistem, dan notifikasi Anda.
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

          {/* GRID SETTINGS */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* 1. PROFIL CURATOR */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs lg:col-span-1 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-base font-bold text-[#3B1E14] mb-4">
                  Profil Curator
                </h2>

                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-stone-100">
                  <div className="relative shrink-0">
                    <img
                      src={curator.avatar}
                      alt={curator.name}
                      className="h-16 w-16 rounded-full object-cover border border-stone-200"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#3B1E14] text-white shadow-md transition hover:bg-[#2A150E]"
                    >
                      <Camera size={12} />
                    </button>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-stone-900 truncate text-sm">
                        {curator.name}
                      </h3>
                      <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600 border border-stone-200">
                        {curator.role}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 truncate mt-0.5">{curator.email}</p>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Bergabung sejak {curator.joinedDate}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={curator.name}
                      onChange={(e) => setCurator({ ...curator, name: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] px-3 py-2 text-stone-800 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={curator.email}
                      onChange={(e) => setCurator({ ...curator, email: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] px-3 py-2 text-stone-800 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={curator.role}
                      disabled
                      className="w-full rounded-xl border border-stone-200/60 bg-stone-100 px-3 py-2 text-stone-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B1E14] py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#2A150E]"
                >
                  <Save size={14} />
                  <span>Simpan Perubahan Profil</span>
                </button>
              </div>
            </div>

            {/* 2. PREFERENSI SISTEM */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs lg:col-span-1">
              <h2 className="font-serif text-base font-bold text-[#3B1E14] mb-4">
                Preferensi Sistem
              </h2>

              <div className="space-y-3">
                {/* Bahasa */}
                <div className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                      <Globe size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-800">Bahasa</p>
                      <p className="text-[11px] text-stone-400 truncate">Pilih bahasa aplikasi</p>
                    </div>
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="appearance-none rounded-lg border border-stone-200 bg-[#FDFBF9] py-1.5 pl-2.5 pr-7 text-xs font-medium text-stone-700 focus:border-[#3B1E14] focus:outline-hidden"
                    >
                      <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                      <option value="English">English</option>
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                </div>

                {/* Zona Waktu */}
                <div className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                      <Clock3 size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-800">Zona Waktu</p>
                      <p className="text-[11px] text-stone-400 truncate">Pilih zona waktu sistem</p>
                    </div>
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="appearance-none rounded-lg border border-stone-200 bg-[#FDFBF9] py-1.5 pl-2.5 pr-7 text-xs font-medium text-stone-700 focus:border-[#3B1E14] focus:outline-hidden"
                    >
                      <option value="WIB (UTC+7)">WIB (UTC+7)</option>
                      <option value="WITA (UTC+8)">WITA (UTC+8)</option>
                      <option value="WIT (UTC+9)">WIT (UTC+9)</option>
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                </div>

                {/* Tampilan */}
                <div className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                      <Sun size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-800">Tampilan</p>
                      <p className="text-[11px] text-stone-400 truncate">Pilih tampilan antarmuka</p>
                    </div>
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="appearance-none rounded-lg border border-stone-200 bg-[#FDFBF9] py-1.5 pl-2.5 pr-7 text-xs font-medium text-stone-700 focus:border-[#3B1E14] focus:outline-hidden"
                    >
                      <option value="Terang">Terang</option>
                      <option value="Gelap">Gelap</option>
                      <option value="Mengikuti Sistem">Mengikuti Sistem</option>
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                </div>

                {/* Item per Halaman */}
                <div className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                      <List size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-800">Item per Halaman</p>
                      <p className="text-[11px] text-stone-400 truncate">Jumlah item yang ditampilkan</p>
                    </div>
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(e.target.value)}
                      className="appearance-none rounded-lg border border-stone-200 bg-[#FDFBF9] py-1.5 pl-2.5 pr-7 text-xs font-medium text-stone-700 focus:border-[#3B1E14] focus:outline-hidden"
                    >
                      <option value="10 Item">10 Item</option>
                      <option value="20 Item">20 Item</option>
                      <option value="50 Item">50 Item</option>
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                </div>

              </div>
            </div>

            {/* 3. PENGATURAN REVIEW */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs lg:col-span-1">
              <h2 className="font-serif text-base font-bold text-[#3B1E14] mb-4">
                Pengaturan Review
              </h2>

              <div className="space-y-3">
                {/* Notifikasi Submission Baru */}
                <div className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-semibold text-stone-800">
                      Notifikasi Submission Baru
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Dapatkan notifikasi ketika ada aset baru
                    </p>
                  </div>
                  <Toggle
                    enabled={newSubmissionNotification}
                    onChange={setNewSubmissionNotification}
                  />
                </div>

                {/* Notifikasi Permintaan Perbaikan */}
                <div className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-semibold text-stone-800">
                      Notifikasi Permintaan Perbaikan
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Dapatkan notifikasi ketika perbaikan diperlukan
                    </p>
                  </div>
                  <Toggle
                    enabled={revisionNotification}
                    onChange={setRevisionNotification}
                  />
                </div>

                {/* Konfirmasi Sebelum Approve/Reject */}
                <div className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-semibold text-stone-800">
                      Konfirmasi Sebelum Approve/Reject
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Tampilkan konfirmasi sebelum memutuskan
                    </p>
                  </div>
                  <Toggle
                    enabled={reviewConfirmation}
                    onChange={setReviewConfirmation}
                  />
                </div>

                {/* Batas Waktu Review */}
                <div className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-semibold text-stone-800">
                      Batas Waktu Review
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Atur batas waktu review submission
                    </p>
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={reviewDeadline}
                      onChange={(e) => setReviewDeadline(e.target.value)}
                      className="appearance-none rounded-lg border border-stone-200 bg-[#FDFBF9] py-1.5 pl-2.5 pr-7 text-xs font-medium text-stone-700 focus:border-[#3B1E14] focus:outline-hidden"
                    >
                      <option value="1 Hari">1 Hari</option>
                      <option value="3 Hari">3 Hari</option>
                      <option value="5 Hari">5 Hari</option>
                      <option value="7 Hari">7 Hari</option>
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                </div>

              </div>
            </div>

            {/* 4. PREFERENSI NOTIFIKASI */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs lg:col-span-1">
              <h2 className="font-serif text-base font-bold text-[#3B1E14] mb-4">
                Preferensi Notifikasi
              </h2>

              <div className="divide-y divide-stone-100 text-xs">
                {/* Email Notification */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <Mail size={16} className="text-stone-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800">Email Notification</p>
                      <p className="text-[11px] text-stone-400 truncate">Terima notifikasi melalui email</p>
                    </div>
                  </div>
                  <Toggle enabled={emailNotification} onChange={setEmailNotification} />
                </div>

                {/* Submission Baru */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <FileText size={16} className="text-stone-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800">Submission Baru</p>
                      <p className="text-[11px] text-stone-400 truncate">Notifikasi ketika ada submission baru</p>
                    </div>
                  </div>
                  <Toggle enabled={newSubmission} onChange={setNewSubmission} />
                </div>

                {/* Update Status Submission */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <RotateCcw size={16} className="text-stone-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800">Update Status Submission</p>
                      <p className="text-[11px] text-stone-400 truncate">Notifikasi ketika status berubah</p>
                    </div>
                  </div>
                  <Toggle enabled={submissionStatus} onChange={setSubmissionStatus} />
                </div>

                {/* Komentar dan Diskusi */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <Bell size={16} className="text-stone-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800">Komentar dan Diskusi</p>
                      <p className="text-[11px] text-stone-400 truncate">Notifikasi komentar baru</p>
                    </div>
                  </div>
                  <Toggle enabled={commentsNotification} onChange={setCommentsNotification} />
                </div>

                {/* Pengingat Review */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <Bell size={16} className="text-stone-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800">Pengingat Review</p>
                      <p className="text-[11px] text-stone-400 truncate">Pengingat submission tertunda</p>
                    </div>
                  </div>
                  <Toggle enabled={reviewReminder} onChange={setReviewReminder} />
                </div>
              </div>
            </div>

            {/* 5. KEAMANAN */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs lg:col-span-1">
              <h2 className="font-serif text-base font-bold text-[#3B1E14] mb-4">
                Keamanan
              </h2>

              <div className="space-y-3">
                {/* Ubah Password */}
                <div className="rounded-xl border border-stone-200 p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                      <Lock size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-800">Ubah Password</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        Perbarui password akun Anda secara berkala.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowPasswordModal(true)}
                        className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#3B1E14] hover:underline"
                      >
                        <span>Ubah Password</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Perangkat Aktif */}
                <div className="rounded-xl border border-stone-200 p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                      <Smartphone size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-800">Perangkat Aktif</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        Kelola perangkat yang terhubung ke akun Anda.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowDevicesModal(true)}
                        className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#3B1E14] hover:underline"
                      >
                        <span>Lihat Perangkat</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Logout dari Semua Perangkat */}
                <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                      <LogOut size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-rose-900">Logout dari Semua Perangkat</p>
                      <p className="text-[11px] text-rose-600 mt-0.5">
                        Keluar dari semua perangkat selain perangkat ini.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowLogoutModal(true)}
                        className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:underline"
                      >
                        <span>Logout Semua</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 6. INFORMASI SISTEM */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs lg:col-span-1">
              <h2 className="font-serif text-base font-bold text-[#3B1E14] mb-4">
                Informasi Sistem
              </h2>

              <div className="divide-y divide-stone-100 text-xs">
                {/* Versi Aplikasi */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 text-stone-600">
                    <Info size={15} className="text-stone-400" />
                    <span>Versi Aplikasi</span>
                  </div>
                  <span className="font-semibold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md text-[11px]">
                    v1.0.0
                  </span>
                </div>

                {/* Data Terakhir Diperbarui */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 text-stone-600">
                    <Database size={15} className="text-stone-400" />
                    <span>Data Terakhir Diperbarui</span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    16 Agt 2026, 09:30
                  </span>
                </div>

                {/* Kebijakan Privasi */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 text-stone-600">
                    <ShieldCheck size={15} className="text-stone-400" />
                    <span>Kebijakan Privasi</span>
                  </div>
                  <a
                    href="#privacy"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1 font-semibold text-[#C98A2E] hover:underline"
                  >
                    <span>Lihat Kebijakan</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                {/* Syarat & Ketentuan */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 text-stone-600">
                    <FileText size={15} className="text-stone-400" />
                    <span>Syarat & Ketentuan</span>
                  </div>
                  <a
                    href="#terms"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1 font-semibold text-[#C98A2E] hover:underline"
                  >
                    <span>Lihat Syarat</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* FOOTER ACTION CARD */}
          <div className="mt-6 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
            >
              <RotateCcw size={14} />
              <span>Reset ke Default</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B1E14] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#2A150E] disabled:opacity-50"
            >
              <Save size={14} />
              <span>{isSaving ? "Menyimpan..." : "Simpan Semua Perubahan"}</span>
            </button>
          </div>

        </div>
      </main>

      {/* --- MODALS & TOASTS --- */}

      {/* 1. MODAL UBAH PASSWORD */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif text-base font-bold text-[#3B1E14]">
                Ubah Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="rounded-lg p-1 text-stone-400 hover:bg-stone-100"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Password Lama
                </label>
                <input
                  type="password"
                  placeholder="Masukkan password lama"
                  value={passwords.old}
                  onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] px-3 py-2 text-stone-800 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  placeholder="Masukkan password baru"
                  value={passwords.newP}
                  onChange={(e) => setPasswords({ ...passwords, newP: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] px-3 py-2 text-stone-800 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  placeholder="Ulangi password baru"
                  value={passwords.confirmP}
                  onChange={(e) => setPasswords({ ...passwords, confirmP: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] px-3 py-2 text-stone-800 transition focus:border-[#3B1E14] focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2 text-xs font-semibold">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-stone-600 hover:bg-stone-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);
                }}
                className="rounded-xl bg-[#3B1E14] px-4 py-2 text-white hover:bg-[#2A150E]"
              >
                Simpan Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL PERANGKAT AKTIF */}
      {showDevicesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif text-base font-bold text-[#3B1E14]">
                Perangkat Aktif
              </h3>
              <button
                onClick={() => setShowDevicesModal(false)}
                className="rounded-lg p-1 text-stone-400 hover:bg-stone-100"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 flex items-center gap-3">
              <Smartphone size={24} className="text-emerald-700 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-stone-800">Windows / Chrome</p>
                <p className="text-[#C98A2E] font-medium">Denpasar, Bali</p>
                <span className="mt-1 inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Aktif sekarang
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDevicesModal(false)}
                className="rounded-xl bg-[#3B1E14] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2A150E]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL CONFIRM LOGOUT ALL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-xl text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <LogOut size={22} />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Logout Semua Perangkat?
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Anda akan keluar dari seluruh sesi di perangkat lain.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full rounded-xl border border-stone-200 bg-white py-2 text-stone-600 hover:bg-stone-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);
                }}
                className="w-full rounded-xl bg-rose-600 py-2 text-white hover:bg-rose-700"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL CONFIRM RESET DEFAULT */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-xl text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <AlertTriangle size={22} />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Reset Pengaturan?
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Semua pengaturan akan dikembalikan ke nilai default awal.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold">
              <button
                onClick={() => setShowResetModal(false)}
                className="w-full rounded-xl border border-stone-200 bg-white py-2 text-stone-600 hover:bg-stone-50"
              >
                Batal
              </button>
              <button
                onClick={handleResetToDefault}
                className="w-full rounded-xl bg-[#3B1E14] py-2 text-white hover:bg-[#2A150E]"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. SUCCESS TOAST NOTIFICATION */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-xl text-xs font-semibold text-stone-800 transition-all duration-300">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-stone-900">Pengaturan Berhasil Disimpan</p>
            <p className="text-[11px] font-normal text-stone-500">
              Perubahan pengaturan Anda telah berhasil diperbarui.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}