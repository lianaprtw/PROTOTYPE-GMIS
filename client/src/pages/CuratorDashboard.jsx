import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CuratorSidebar from '../components/CuratorSidebar';
import {
  FileText,
  Hourglass,
  CheckCircle2,
  Pencil,
  Search,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  XCircle,
  UserPlus,
  SearchX,
  History
} from 'lucide-react';

// Mock Data Submission
const SUBMISSIONS = [
  {
    id: '1',
    name: 'Base Genep Bali',
    category: 'Bahan',
    location: 'Denpasar, Bali',
    contributor: 'Ni Luh Putu Sari',
    date: '16 Agu 2026',
    status: 'Menunggu Review',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80'
  },
  {
    id: '2',
    name: 'Lawar Bali',
    category: 'Kuliner',
    location: 'Gianyar, Bali',
    contributor: 'I Made Arya',
    date: '15 Agu 2026',
    status: 'Menunggu Review',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80'
  },
  {
    id: '3',
    name: 'Upacara Megibung',
    category: 'Budaya',
    location: 'Karangasem, Bali',
    contributor: 'Ni Kadek Ayu',
    date: '15 Agu 2026',
    status: 'Perlu Perbaikan',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&q=80'
  },
  {
    id: '4',
    name: 'Jatiluwih',
    category: 'Destinasi',
    location: 'Tabanan, Bali',
    contributor: 'I Wayan Putra',
    date: '14 Agu 2026',
    status: 'Menunggu Review',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80'
  },
  {
    id: '5',
    name: 'Sate Lilit',
    category: 'Kuliner',
    location: 'Badung, Bali',
    contributor: 'Ni Komang Dewi',
    date: '14 Agu 2026',
    status: 'Perlu Perbaikan',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=300&q=80'
  }
];

// Mock Data Aktivitas Terbaru
const RECENT_ACTIVITIES = [
  {
    id: 'a1',
    title: 'Base Genep Bali',
    action: 'diterima dan dipublikasikan',
    time: '10 menit yang lalu',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50 border-emerald-100'
  },
  {
    id: 'a2',
    title: 'Lawar Bali',
    action: 'diminta perbaikan',
    time: '2 jam yang lalu',
    icon: Pencil,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-50 border-orange-100'
  },
  {
    id: 'a3',
    title: 'Upacara Megibung',
    action: 'ditolak',
    time: '5 jam yang lalu',
    icon: XCircle,
    iconColor: 'text-rose-500',
    bgColor: 'bg-rose-50 border-rose-100'
  },
  {
    id: 'a4',
    title: 'I Komang Yuda',
    action: 'mendaftar sebagai contributor',
    time: 'Kemarin 09:15',
    icon: UserPlus,
    iconColor: 'text-sky-500',
    bgColor: 'bg-sky-50 border-sky-100'
  },
  {
    id: 'a5',
    title: 'Tipat Cantok',
    action: 'diterima dan dipublikasikan',
    time: 'Kemarin 15:30',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50 border-emerald-100'
  },
  {
    id: 'a6',
    title: 'Nasi Ayam Betutu',
    action: 'diminta perbaikan',
    time: '2 hari lalu 11:20',
    icon: Pencil,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-50 border-orange-100'
  },
  {
    id: 'a7',
    title: 'Ni Putu Sari',
    action: 'mengirim submission baru',
    time: '2 hari lalu 09:45',
    icon: UserPlus,
    iconColor: 'text-sky-500',
    bgColor: 'bg-sky-50 border-sky-100'
  }
];

export default function CuratorDashboard() {
  const navigate = useNavigate();

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [sortBy, setSortBy] = useState('Terbaru');

  // Filter Functionality via useMemo
  const filteredSubmissions = useMemo(() => {
    return SUBMISSIONS.filter((item) => {
      // Search Matching
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contributor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Category Matching
      const matchCategory =
        selectedCategory === 'Semua Kategori' || item.category === selectedCategory;

      // Status Matching
      const matchStatus =
        selectedStatus === 'Semua Status' || item.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'Terbaru') {
        return b.id.localeCompare(a.id);
      } else {
        return a.id.localeCompare(b.id);
      }
    });
  }, [searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Helper untuk Status Badge Styling
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Menunggu Review':
        return (
          <span className="inline-flex items-center rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200/60">
            Menunggu Review
          </span>
        );
      case 'Perlu Perbaikan':
        return (
          <span className="inline-flex items-center rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 border border-orange-200/60">
            Perlu Perbaikan
          </span>
        );
      case 'Published':
        return (
          <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            Published
          </span>
        );
      case 'Ditolak':
        return (
          <span className="inline-flex items-center rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200/60">
            Ditolak
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFBF9] font-sans text-stone-800">
      {/* CURATOR SIDEBAR */}
      <CuratorSidebar />

      {/* MAIN CONTENT AREA */}
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">
          
          {/* HEADER DASHBOARD */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                Dashboard
              </h1>
              <p className="mt-1 text-sm font-semibold text-[#3B1E14]">
                Selamat datang kembali, Curator Gastronomi
              </p>
              <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">
                Tinjau dan kelola pengajuan aset gastronomi dengan cermat.
              </p>

              {/* Decorative Gold Accent Line with Diamond */}
              <div className="relative mt-3 flex items-center max-w-[280px]">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#C89B5C]/80 via-[#C89B5C]/40 to-transparent" />
                <div className="absolute left-6 h-1.5 w-1.5 rotate-45 border border-[#C89B5C] bg-[#FDFBF9]" />
              </div>
            </div>

            {/* Date & Time Widget */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600 sm:text-sm">
              <div className="flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3 py-2 shadow-2xs">
                <Calendar size={15} className="text-[#C89B5C]" />
                <span>Jumat, 16 Agustus 2026</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3 py-2 shadow-2xs">
                <Clock size={15} className="text-[#C89B5C]" />
                <span>10:30 WIB</span>
              </div>
            </div>
          </div>

          {/* STATISTIC CARDS */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Total Submission */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-xs transition hover:border-stone-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-500">Total Submission</p>
                  <p className="mt-2 text-3xl font-bold text-[#3B1E14]">24</p>
                  <p className="mt-1 text-[11px] text-stone-400">Semua pengajuan</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-[#C89B5C]">
                  <FileText size={22} />
                </div>
              </div>
            </div>

            {/* Card 2: Menunggu Review */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-xs transition hover:border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-500">Menunggu Review</p>
                  <p className="mt-2 text-3xl font-bold text-amber-700">24</p>
                  <p className="mt-1 text-[11px] text-amber-600/80">Perlu ditinjau</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Hourglass size={22} />
                </div>
              </div>
            </div>

            {/* Card 3: Published Assets */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-xs transition hover:border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-500">Published Assets</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-700">156</p>
                  <p className="mt-1 text-[11px] text-emerald-600/80">Telah dipublikasikan</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={22} />
                </div>
              </div>
            </div>

            {/* Card 4: Perlu Perbaikan */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-xs transition hover:border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-500">Perlu Perbaikan</p>
                  <p className="mt-2 text-3xl font-bold text-orange-700">8</p>
                  <p className="mt-1 text-[11px] text-orange-600/80">Menunggu perbaikan</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Pencil size={22} />
                </div>
              </div>
            </div>
          </div>

          {/* TWO COLUMN CONTENT LAYOUT */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
            
            {/* LEFT COLUMN: SUBMISSION PERLU REVIEW (70%) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs sm:p-6">
                
                {/* Section Header */}
                <div className="mb-5 flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <FileText size={20} className="text-[#3B1E14]" />
                    <h2 className="text-base font-bold text-[#3B1E14]">
                      Submission Perlu Review
                    </h2>
                  </div>
                  <button
                    onClick={() => navigate('/curator/reviews')}
                    className="flex items-center gap-1 text-xs font-semibold text-[#C89B5C] hover:text-[#3B1E14] transition-colors"
                  >
                    <span>Lihat semua</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Filter Bar */}
                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-12">
                  {/* Search Input */}
                  <div className="relative sm:col-span-5">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama aset, contributor, atau lokasi..."
                      className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-9 pr-3 text-xs text-stone-800 transition placeholder:text-stone-400 focus:border-[#3B1E14] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                    />
                  </div>

                  {/* Kategori Filter */}
                  <div className="relative sm:col-span-3">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-none"
                    >
                      <option value="Semua Kategori">Semua Kategori</option>
                      <option value="Kuliner">Kuliner</option>
                      <option value="Budaya">Budaya</option>
                      <option value="Bahan">Bahan</option>
                      <option value="Agenda">Agenda</option>
                      <option value="Multimedia">Multimedia</option>
                      <option value="Destinasi">Destinasi</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="relative sm:col-span-2">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-none"
                    >
                      <option value="Semua Status">Semua Status</option>
                      <option value="Menunggu Review">Menunggu Review</option>
                      <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                      <option value="Published">Published</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  </div>

                  {/* Sort Filter */}
                  <div className="relative sm:col-span-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-none"
                    >
                      <option value="Terbaru">Terbaru</option>
                      <option value="Terlama">Terlama</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  </div>
                </div>

                {/* SUBMISSION LIST CONTAINER */}
                {filteredSubmissions.length === 0 ? (
                  /* EMPTY STATE */
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                      <SearchX size={28} />
                    </div>
                    <h3 className="text-sm font-bold text-stone-800">
                      Submission tidak ditemukan
                    </h3>
                    <p className="mt-1 text-xs text-stone-500 max-w-xs">
                      Tidak ada pengajuan yang sesuai dengan filter yang dipilih.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredSubmissions.map((item) => (
                      <div
                        key={item.id}
                        className="group flex flex-col justify-between gap-4 rounded-xl border border-stone-200/70 bg-[#FDFBF9]/40 p-3.5 transition hover:border-stone-300 hover:bg-white sm:flex-row sm:items-center"
                      >
                        {/* Thumbnail & Basic Info */}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-14 w-20 shrink-0 rounded-xl object-cover border border-stone-200/60"
                          />
                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold text-[#3B1E14] group-hover:text-[#2A150E]">
                              {item.name}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                              <span className="rounded-md bg-stone-100 px-1.5 py-0.5 font-medium text-stone-600">
                                {item.category}
                              </span>
                              <span>•</span>
                              <span className="truncate">{item.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Contributor & Date */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-2 sm:border-0 sm:pt-0 sm:justify-end">
                          <div className="text-left sm:text-right">
                            <p className="text-xs font-semibold text-stone-700">
                              {item.contributor}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-stone-400 sm:justify-end">
                              <Calendar size={12} />
                              <span>{item.date}</span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="shrink-0">
                            {renderStatusBadge(item.status)}
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => navigate(`/curator/review-submission/${item.id}`)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#3B1E14] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#2A150E] active:scale-95 shrink-0"
                          >
                            <span>Review</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT COLUMN: AKTIVITAS TERBARU (30%) */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs sm:p-6">
                
                {/* Section Header */}
                <div className="mb-5 flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2">
                    <History size={18} className="text-[#3B1E14]" />
                    <h2 className="text-base font-bold text-[#3B1E14]">
                      Aktivitas Terbaru
                    </h2>
                  </div>
                </div>

                {/* Activity Timeline List */}
                <div className="space-y-4">
                  {RECENT_ACTIVITIES.map((act) => {
                    const IconComp = act.icon;
                    return (
                      <div key={act.id} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${act.bgColor}`}
                        >
                          <IconComp size={15} className={act.iconColor} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-stone-800 leading-snug">
                            <span className="font-bold text-[#3B1E14]">{act.title}</span>{' '}
                            <span className="text-stone-600">{act.action}</span>
                          </p>
                          <p className="mt-0.5 text-[10px] text-stone-400">{act.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Link */}
                <div className="mt-6 border-t border-stone-100 pt-4 text-center">
                  <button
                    onClick={() => navigate('/curator/activity')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C89B5C] hover:text-[#3B1E14] transition-colors"
                  >
                    <span>Lihat semua aktivitas</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}