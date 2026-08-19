import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  User,
  Mail,
  Shield,
  MapPin,
  Globe,
  Calendar,
  Camera,
  Edit3,
  Bookmark,
  Eye,
  FileText,
  ChevronRight,
  Utensils,
  Landmark,
  BookOpen,
  Leaf,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  XCircle,
  X,
  Heart
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();

  // State Profil Pengguna
  const [profile, setProfile] = useState({
    name: 'Ni Kadek Liana Pratiwi',
    email: 'liana@email.com',
    role: 'Pengguna',
    location: 'Denpasar, Bali',
    language: 'Bahasa Indonesia',
    joinedDate: '12 Juli 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    dietPreference: 'Tidak ada preferensi khusus'
  });

  // State Modal Edit Profil
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  // Data Preference Chips
  const interestChips = [
    { name: 'Kuliner', icon: Utensils },
    { name: 'Budaya', icon: Landmark },
    { name: 'Resep', icon: BookOpen },
    { name: 'Bahan', icon: Leaf },
    { name: 'Destinasi', icon: MapPin },
    { name: 'Agenda', icon: Calendar },
    { name: 'Multimedia', icon: ImageIcon }
  ];

  // Data Kontribusi Terbaru
  const contributions = [
    {
      id: '1',
      title: 'Lawar Tradisional Bali',
      category: 'Kuliner',
      status: 'Disetujui',
      date: '12 Agu 2024',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '2',
      title: 'Tradisi Megibung',
      category: 'Budaya',
      status: 'Ditinjau',
      date: '10 Agu 2024',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '3',
      title: 'Base Genep Bali',
      category: 'Bahan',
      status: 'Ditolak',
      date: '8 Agu 2024',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Disetujui':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <CheckCircle2 size={13} /> Disetujui
          </span>
        );
      case 'Ditinjau':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200/60">
            <Clock size={13} /> Ditinjau
          </span>
        );
      case 'Ditolak':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200/60">
            <XCircle size={13} /> Ditolak
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF9] text-gray-800 font-sans">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
          
          {/* HEADER SECTION */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#3B1E14]">
              Profil Saya
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Kelola informasi akun dan preferensi gastronomi Anda.
            </p>
          </div>

          {/* SECTION 2: PROFILE HEADER CARD */}
          <div className="relative mb-8 overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              
              {/* Left Profile Info */}
              <div className="flex flex-col items-center gap-5 sm:flex-row text-center sm:text-left z-10">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-24 w-24 rounded-full border-4 border-[#FDFBF9] object-cover shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#3B1E14] text-white shadow-md transition hover:bg-[#2A150E]"
                    title="Ubah Foto Profil"
                  >
                    <Camera size={15} />
                  </button>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3B1E14]">
                    {profile.name}
                  </h2>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-amber-800/80">
                    {profile.role}
                  </p>
                  
                  <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} className="text-stone-400" />
                      {profile.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-stone-400" />
                      Bergabung sejak {profile.joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Balinese Decorative Illustration + Edit Button */}
              <div className="flex items-center gap-6 z-10 w-full md:w-auto justify-center md:justify-end">
                {/* Visual Motif Gapura/Candi Bentar Line Art */}
                <div className="hidden lg:block opacity-25">
                  <svg width="180" height="90" viewBox="0 0 200 100" fill="none" stroke="#3B1E14" strokeWidth="1.5">
                    <path d="M 20,90 L 20,40 L 40,20 L 70,20 L 70,90 M 130,90 L 130,20 L 160,20 L 180,40 L 180,90" />
                    <path d="M 40,20 L 40,90 M 160,20 L 160,90" strokeDasharray="2 2" />
                    <circle cx="100" cy="50" r="15" strokeWidth="1" />
                    <path d="M 90,50 L 110,50 M 100,40 L 100,60" />
                  </svg>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3B1E14] px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#2A150E] active:scale-95"
                >
                  <Edit3 size={15} />
                  Edit Profil
                </button>
              </div>
            </div>
          </div>

          {/* GRID ROW 1: INFORMASI AKUN & PREFERENSI GASTRONOMI */}
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* SECTION 3: INFORMASI AKUN */}
            <div className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              <div>
                <div className="mb-5 flex items-center gap-2.5 border-b border-stone-100 pb-4">
                  <User className="text-[#3B1E14]" size={20} />
                  <h3 className="text-lg font-bold text-[#3B1E14]">Informasi Akun</h3>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-100/60">
                    <span className="flex items-center gap-2 font-medium text-gray-500">
                      <User size={15} className="text-stone-400" />
                      Nama Lengkap
                    </span>
                    <span className="font-semibold text-gray-800">{profile.name}</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-stone-100/60">
                    <span className="flex items-center gap-2 font-medium text-gray-500">
                      <Mail size={15} className="text-stone-400" />
                      Email
                    </span>
                    <span className="font-semibold text-gray-800">{profile.email}</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-stone-100/60">
                    <span className="flex items-center gap-2 font-medium text-gray-500">
                      <Shield size={15} className="text-stone-400" />
                      Peran
                    </span>
                    <span className="font-semibold text-gray-800">{profile.role}</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-stone-100/60">
                    <span className="flex items-center gap-2 font-medium text-gray-500">
                      <MapPin size={15} className="text-stone-400" />
                      Lokasi
                    </span>
                    <span className="font-semibold text-gray-800">{profile.location}</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-stone-100/60">
                    <span className="flex items-center gap-2 font-medium text-gray-500">
                      <Globe size={15} className="text-stone-400" />
                      Bahasa
                    </span>
                    <span className="font-semibold text-gray-800">{profile.language}</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5">
                    <span className="flex items-center gap-2 font-medium text-gray-500">
                      <Calendar size={15} className="text-stone-400" />
                      Bergabung Sejak
                    </span>
                    <span className="font-semibold text-gray-800">{profile.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: PREFERENSI GASTRONOMI */}
            <div className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              <div>
                <div className="mb-5 flex items-center gap-2.5 border-b border-stone-100 pb-4">
                  <Heart className="text-[#3B1E14]" size={20} />
                  <h3 className="text-lg font-bold text-[#3B1E14]">Preferensi Gastronomi</h3>
                </div>

                {/* Subbagian Minat */}
                <div className="mb-6">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Minat</h4>
                  <div className="flex flex-wrap gap-2">
                    {interestChips.map((chip) => {
                      const IconComponent = chip.icon;
                      return (
                        <span
                          key={chip.name}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-[#FDFBF9] px-3 py-1.5 text-xs font-medium text-[#3B1E14] shadow-2xs transition hover:border-amber-700/40 hover:bg-amber-50/40"
                        >
                          <IconComponent size={14} className="text-amber-800" />
                          {chip.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Subbagian Preferensi Diet */}
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Preferensi Diet</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-[#FDFBF9] px-3.5 py-1.5 text-xs font-medium text-stone-700">
                      <Leaf size={14} className="text-emerald-600" />
                      {profile.dietPreference}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* GRID ROW 2: RINGKASAN AKTIVITAS & KONTRIBUSI TERBARU */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* SECTION 5: RINGKASAN AKTIVITAS */}
            <div className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              <div>
                <div className="mb-5 flex items-center gap-2.5 border-b border-stone-100 pb-4">
                  <Bookmark className="text-[#3B1E14]" size={20} />
                  <h3 className="text-lg font-bold text-[#3B1E14]">Ringkasan Aktivitas</h3>
                </div>

                {/* 3 Grid Statistik */}
                <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
                  
                  <div className="flex flex-col items-center justify-center rounded-xl border border-amber-100 bg-amber-50/50 p-3 sm:p-4 text-center">
                    <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                      <Bookmark size={18} />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-[#3B1E14]">12</span>
                    <span className="text-[11px] font-medium text-stone-600">Disimpan</span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-sky-100 bg-sky-50/50 p-3 sm:p-4 text-center">
                    <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-800">
                      <Eye size={18} />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-[#3B1E14]">28</span>
                    <span className="text-[11px] font-medium text-stone-600">Dilihat</span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 sm:p-4 text-center">
                    <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                      <FileText size={18} />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-[#3B1E14]">4</span>
                    <span className="text-[11px] font-medium text-stone-600">Kontribusi</span>
                  </div>

                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/my-submission')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-[#FDFBF9] py-2.5 text-xs font-semibold text-[#3B1E14] transition hover:bg-stone-100 hover:border-stone-300"
              >
                Lihat Riwayat Aktivitas
                <ChevronRight size={15} />
              </button>
            </div>

            {/* SECTION 6: KONTRIBUSI TERBARU */}
            <div className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              <div>
                <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <FileText className="text-[#3B1E14]" size={20} />
                    <h3 className="text-lg font-bold text-[#3B1E14]">Kontribusi Terbaru</h3>
                  </div>
                </div>

                {/* List Item Kontribusi */}
                <div className="mb-6 space-y-3">
                  {contributions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate('/my-submission')}
                      className="group flex cursor-pointer items-center justify-between rounded-xl border border-stone-100 bg-[#FDFBF9] p-3 transition hover:border-stone-200 hover:bg-stone-50"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#3B1E14]">
                            {item.title}
                          </h4>
                          <p className="mt-0.5 text-[11px] text-gray-500">
                            Kategori: <span className="font-medium text-gray-700">{item.category}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end gap-1">
                          {getStatusBadge(item.status)}
                          <span className="text-[10px] text-gray-400">{item.date}</span>
                        </div>
                        <div className="sm:hidden">
                          {getStatusBadge(item.status)}
                        </div>
                        <ChevronRight size={16} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/my-submission')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B1E14] py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#2A150E]"
              >
                Lihat Semua Pengajuan di My Submission
                <ChevronRight size={15} />
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* MODAL EDIT PROFIL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl transition-all">
            <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-[#3B1E14]">Edit Profil</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-stone-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-stone-200 p-2.5 text-gray-800 focus:border-[#3B1E14] focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-stone-200 p-2.5 text-gray-800 focus:border-[#3B1E14] focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Lokasi</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-stone-200 p-2.5 text-gray-800 focus:border-[#3B1E14] focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Bahasa</label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-stone-200 p-2.5 text-gray-800 focus:border-[#3B1E14] focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">Preferensi Diet</label>
                <input
                  type="text"
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-stone-200 p-2.5 text-gray-800 focus:border-[#3B1E14] focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-stone-200 px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#3B1E14] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2A150E]"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}