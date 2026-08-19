import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CuratorSidebar from '../components/CuratorSidebar';
import {
  Hourglass,
  History,
  Pencil,
  CheckCircle2,
  XCircle,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  MoreVertical,
  Filter,
  RotateCcw,
  SearchX,
  X,
  Check,
  AlertCircle,
  Eye,
  User,
  Star,
  FileText,
  Info,
  BookOpen,
  Share2
} from 'lucide-react';

// MOCK DATA SUBMISSION GASTRO PUSTAKA
const INITIAL_SUBMISSIONS = [
  {
    id: 1,
    assetName: "Base Genep Bali",
    contributor: "Ni Luh Putu Sari",
    email: "putusari@gmail.com",
    location: "Denpasar, Bali",
    category: "Bahan",
    submittedAt: "16 Agu 2026",
    time: "09:12",
    status: "Menunggu Review",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    description: "Bumbu dasar khas Bali yang terdiri dari 15 macam rempah tradisional seperti lengkuas, kunyit, jahe, kencur, cabai, serai, bawang merah, bawang putih, kemiri, ketumbar, merica, dan terasi.",
    gastronomyValue: "Base Genep merupakan fondasi rasa utama dalam kebudayaan kuliner Bali yang merepresentasikan filosofi keharmonisan rasa dan konsep pengobatan tradisional Usada Bali.",
    culturalSignificance: "Digunakan dalam hampir seluruh olahan hidangan ritual piodalan dan upacara adat di Bali, merepresentasikan keberagaman yang menyatu dalam keharmonisan.",
    sourceInfo: "Naskah Kuno Lontar Usada Bali & Wawancara dengan Tokoh Adat Desa Panglipuran",
    notes: ""
  },
  {
    id: 2,
    assetName: "Lawar Bali",
    contributor: "I Made Arya",
    email: "madearya@gmail.com",
    location: "Gianyar, Bali",
    category: "Kuliner",
    submittedAt: "15 Agu 2026",
    time: "14:35",
    status: "Menunggu Review",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    description: "Masakan berupa campuran sayuran, daging cincang, kelapa parut, dan bumbu rempah khas Bali. Tersedia dalam varian Lawar Merah dan Lawar Putih.",
    gastronomyValue: "Menggambarkan keterampilan tinggi masyarakat Bali dalam mengolah bahan pangan segar dengan rasio rempah yang presisi.",
    culturalSignificance: "Merupakan makanan wajib dalam perayaan keagamaan Hindu Bali dan ajang kebersamaan saat proses pembuatannya (Melebat).",
    sourceInfo: "Dokumentasi Komunitas Kuliner Tradisional Gianyar",
    notes: ""
  },
  {
    id: 3,
    assetName: "Upacara Megibung",
    contributor: "Ni Kadek Ayu",
    email: "kadekayu@gmail.com",
    location: "Karangasem, Bali",
    category: "Budaya",
    submittedAt: "15 Agu 2026",
    time: "11:20",
    status: "Perlu Perbaikan",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    description: "Tradisi makan bersama dalam satu wadah besar (nampan/daun pisang) yang dilakukan oleh sekelompok orang (satu sela).",
    gastronomyValue: "Simbol kebersamaan, kesetaraan sosial, dan etika santap tradisional Karangasem.",
    culturalSignificance: "Diperkenalkan oleh Raja Karangasem I Gusti Anglurah Ketut Karangasem pada abad ke-17 pasca kemenangan perang.",
    sourceInfo: "Studi Etnografi Puri Agung Karangasem",
    notes: "Tolong lengkapi foto pendukung urutan tata cara pembagian nampan."
  },
  {
    id: 4,
    assetName: "Jatiluwih",
    contributor: "I Wayan Putra",
    email: "wayanputra@gmail.com",
    location: "Tabanan, Bali",
    category: "Destinasi",
    submittedAt: "14 Agu 2026",
    time: "16:45",
    status: "Menunggu Review",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    description: "Kawasan lanskap budaya terasering sawah dengan sistem irigasi tradisional Subak yang diakui sebagai Warisan Budaya Dunia UNESCO.",
    gastronomyValue: "Pusat penghasil beras merah organik kultivar lokal Bali dengan metode tanam tradisional.",
    culturalSignificance: "Wujud nyata filosofi Tri Hita Karana dalam menjaga kearifan ekologi pertanian beras khas Bali.",
    sourceInfo: "Bappeda Tabanan & Organisasi Subak Jatiluwih",
    notes: ""
  },
  {
    id: 5,
    assetName: "Sate Lilit",
    contributor: "Ni Komang Dewi",
    email: "komangdewi@gmail.com",
    location: "Badung, Bali",
    category: "Kuliner",
    submittedAt: "14 Agu 2026",
    time: "08:10",
    status: "Perlu Perbaikan",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80",
    description: "Varian sate khas Bali dari daging cincang (ikan/ayam) yang dicampur kelapa parut dan bumbu, lalu dililitkan pada batang serai atau pelepah kelapa.",
    gastronomyValue: "Inovasi tekstur dan aromatik melalui penggunaan pelepah serai sebagai tusukan sate alami.",
    culturalSignificance: "Sering disajikan dalam ritual Galungan dan Kuningan sebagai ucapan syukur.",
    sourceInfo: "Resep Warisan Keluarga Kuliner Badung",
    notes: "Harap perbaiki detail takaran bahan utama daging ikan dan kelapa parut."
  },
  {
    id: 6,
    assetName: "Tipat Cantok",
    contributor: "I Komang Yuda",
    email: "komangyuda@gmail.com",
    location: "Jembrana, Bali",
    category: "Kuliner",
    submittedAt: "13 Agu 2026",
    time: "13:00",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    description: "Makanan tradisional Bali berupa ketupat dan sayuran rebus yang diulek bersama bumbu kacang gurih dan sedikit kencur.",
    gastronomyValue: "Keseimbangan gizi serat dan karbohidrat lokal yang praktis dan kaya cita rasa alami.",
    culturalSignificance: "Makanan sehari-hari masyarakat Bali yang melambangkan kesederhanaan.",
    sourceInfo: "Arsip Gastronomi Jembrana",
    notes: "Disetujui tanpa catatan."
  },
  {
    id: 7,
    assetName: "Piodalan di Pura Besakih",
    contributor: "Ni Ketut Rini",
    email: "rini.ketut@gmail.com",
    location: "Karangasem, Bali",
    category: "Budaya",
    submittedAt: "12 Agu 2026",
    time: "10:22",
    status: "Rejected",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80",
    description: "Upacara peringatan hari jadi pura yang diisi dengan berbagai sesaji kuliner suci (Gebogan dan Penyekahan).",
    gastronomyValue: "Pengolahan bahan kuliner suci untuk banten ritual keagamaan.",
    culturalSignificance: "Puncak peribadatan suci bagi umat Hindu di Pura Ibukota Bali.",
    sourceInfo: "Dokumentasi Mandiri",
    notes: "Penjelasan nilai gastronomi spesifik masakan belum dicantumkan secara memadai."
  },
  {
    id: 8,
    assetName: "Ayam Betutu Gilimanuk",
    contributor: "I Gede Putu",
    email: "gedeputu@gmail.com",
    location: "Jembrana, Bali",
    category: "Kuliner",
    submittedAt: "11 Agu 2026",
    time: "15:10",
    status: "Under Review",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&q=80",
    description: "Ayam utuh yang diisi dengan bumbu base genep lengkap lalu dipanggang atau dikukus lama dengan sekam tebal.",
    gastronomyValue: "Teknik memasak slow-cooking tradisional dengan pengasapan sekam padi yang meresapkan bumbu hingga ke tulang.",
    culturalSignificance: "Hidangan istimewa dalam jamuan tamu kehormatan dan upacara penting.",
    sourceInfo: "Pustaka Kuliner Jembrana",
    notes: "Sedang dalam verifikasi tim pustakawan adat."
  }
];

export default function ReviewSubmission() {
  const navigate = useNavigate();

  // Submissions State
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [dateRange] = useState('01/08/2026 - 16/08/2026');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Review Modal State
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  
  // Confirmation Modal State
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    actionType: null, // 'Approve' | 'Perlu Perbaikan' | 'Rejected'
  });

  // Action Dropdown State
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Handle outside click to close row dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // Real-time Search & Filter Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      const matchSearch =
        item.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contributor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'Semua Kategori' || item.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'Semua Status' || item.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [submissions, searchQuery, selectedCategory, selectedStatus]);

  // Dynamic Summary Cards Count
  const summaryCounts = useMemo(() => {
    const counts = {
      'Menunggu Review': 0,
      'Under Review': 0,
      'Perlu Perbaikan': 0,
      'Approved': 0,
      'Rejected': 0,
    };
    submissions.forEach((sub) => {
      if (counts[sub.status] !== undefined) {
        counts[sub.status] += 1;
      }
    });
    return counts;
  }, [submissions]);

  // Pagination Calculations
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
    setSelectedStatus('Semua Status');
    setCurrentPage(1);
  };

  // Open Review Modal
  const handleOpenReviewModal = (submission) => {
    setSelectedSubmission(submission);
    setReviewerNotes(submission.notes || '');
    setOpenDropdownId(null);
  };

  // Close Review Modal
  const handleCloseReviewModal = () => {
    setSelectedSubmission(null);
    setReviewerNotes('');
  };

  // Trigger Confirmation Modal
  const handleTriggerAction = (actionType) => {
    setConfirmationModal({
      isOpen: true,
      actionType,
    });
  };

  // Execute Review Action (Approve / Perlu Perbaikan / Reject)
  const handleExecuteAction = () => {
    const { actionType } = confirmationModal;
    if (!selectedSubmission || !actionType) return;

    let newStatus = selectedSubmission.status;
    let toastMsg = '';

    if (actionType === 'Approve') {
      newStatus = 'Approved';
      toastMsg = `Aset "${selectedSubmission.assetName}" berhasil disetujui!`;
    } else if (actionType === 'Perlu Perbaikan') {
      newStatus = 'Perlu Perbaikan';
      toastMsg = `Catatan revisi untuk "${selectedSubmission.assetName}" telah dikirim.`;
    } else if (actionType === 'Rejected') {
      newStatus = 'Rejected';
      toastMsg = `Pengajuan "${selectedSubmission.assetName}" telah ditolak.`;
    }

    // Update Status in State
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === selectedSubmission.id
          ? { ...sub, status: newStatus, notes: reviewerNotes }
          : sub
      )
    );

    setConfirmationModal({ isOpen: false, actionType: null });
    handleCloseReviewModal();
    showToast(toastMsg, actionType === 'Rejected' ? 'error' : 'success');
  };

  // Render Badge Kategori
  const renderCategoryBadge = (category) => {
    switch (category) {
      case 'Kuliner':
        return (
          <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 border border-amber-200/60">
            Kuliner
          </span>
        );
      case 'Budaya':
        return (
          <span className="inline-flex items-center rounded-md bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-800 border border-purple-200/60">
            Budaya
          </span>
        );
      case 'Bahan':
        return (
          <span className="inline-flex items-center rounded-md bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-800 border border-orange-200/60">
            Bahan
          </span>
        );
      case 'Destinasi':
        return (
          <span className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 border border-blue-200/60">
            Destinasi
          </span>
        );
      case 'Agenda':
        return (
          <span className="inline-flex items-center rounded-md bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-800 border border-rose-200/60">
            Agenda
          </span>
        );
      case 'Multimedia':
        return (
          <span className="inline-flex items-center rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/60">
            Multimedia
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">
            {category}
          </span>
        );
    }
  };

  // Render Badge Status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Menunggu Review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200/60">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            Menunggu Review
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200/60">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            Under Review
          </span>
        );
      case 'Perlu Perbaikan':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 border border-orange-200/60">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            Perlu Perbaikan
          </span>
        );
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Approved
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200/60">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFBF9] font-sans text-stone-800">
      
      {/* 1. CURATOR SIDEBAR (FIXED/STICKY) */}
      <CuratorSidebar />

      {/* MAIN CONTENT CONTAINER */}
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">
          
          {/* 2. HEADER */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                Review Submission
              </h1>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                Tinjau semua pengajuan aset yang dikirim oleh contributor.
              </p>

              {/* Aksen Budaya Bali */}
              <div className="relative mt-3 flex items-center max-w-[280px]">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#C89B5C]/80 via-[#C89B5C]/40 to-transparent" />
                <div className="absolute left-6 h-1.5 w-1.5 rotate-45 border border-[#C89B5C] bg-[#FDFBF9]" />
              </div>
            </div>

            {/* Date & Time Header Display */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-stone-600 sm:text-sm">
              <div className="flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-2xs">
                <Calendar size={15} className="text-[#C89B5C]" />
                <span>Jumat, 16 Agustus 2026</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-2xs">
                <Clock size={15} className="text-[#C89B5C]" />
                <span>10:30 WIB</span>
              </div>
            </div>
          </div>

          {/* 3. SUMMARY CARDS (5 HORIZONTAL CARDS) */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {/* Card 1: Menunggu Review */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-4.5 shadow-2xs transition hover:border-amber-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-stone-500">Menunggu Review</p>
                  <p className="mt-2 text-2xl font-bold text-amber-600 sm:text-3xl">
                    {summaryCounts['Menunggu Review']}
                  </p>
                  <p className="mt-1 text-[11px] text-amber-700/70 font-medium">Perlu ditinjau</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100/70 text-amber-600">
                  <Hourglass size={20} />
                </div>
              </div>
            </div>

            {/* Card 2: Under Review */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-4.5 shadow-2xs transition hover:border-blue-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-stone-500">Under Review</p>
                  <p className="mt-2 text-2xl font-bold text-blue-600 sm:text-3xl">
                    {summaryCounts['Under Review']}
                  </p>
                  <p className="mt-1 text-[11px] text-blue-700/70 font-medium">Sedang ditinjau</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100/70 text-blue-600">
                  <History size={20} />
                </div>
              </div>
            </div>

            {/* Card 3: Perlu Perbaikan */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-4.5 shadow-2xs transition hover:border-orange-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-stone-500">Perlu Perbaikan</p>
                  <p className="mt-2 text-2xl font-bold text-orange-600 sm:text-3xl">
                    {summaryCounts['Perlu Perbaikan']}
                  </p>
                  <p className="mt-1 text-[11px] text-orange-700/70 font-medium">Menunggu perbaikan</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100/70 text-orange-600">
                  <Pencil size={20} />
                </div>
              </div>
            </div>

            {/* Card 4: Approved */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-4.5 shadow-2xs transition hover:border-emerald-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-stone-500">Approved</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-600 sm:text-3xl">
                    {summaryCounts['Approved']}
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-700/70 font-medium">Telah disetujui</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
              </div>
            </div>

            {/* Card 5: Rejected */}
            <div className="rounded-2xl border border-stone-200/70 bg-white p-4.5 shadow-2xs transition hover:border-rose-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-stone-500">Rejected</p>
                  <p className="mt-2 text-2xl font-bold text-rose-600 sm:text-3xl">
                    {summaryCounts['Rejected']}
                  </p>
                  <p className="mt-1 text-[11px] text-rose-700/70 font-medium">Ditolak</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100/70 text-rose-600">
                  <XCircle size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* 4. SEARCH & FILTER TOOLBAR */}
          <div className="mb-6 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12">
              
              {/* Search Input */}
              <div className="relative sm:col-span-2 md:col-span-4">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Cari nama aset, contributor, atau lokasi..."
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-9 pr-3 text-xs text-stone-800 transition placeholder:text-stone-400 focus:border-[#3B1E14] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                />
              </div>

              {/* Kategori Dropdown */}
              <div className="relative sm:col-span-1 md:col-span-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
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

              {/* Status Dropdown */}
              <div className="relative sm:col-span-1 md:col-span-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FDFBF9] py-2 pl-3 pr-8 text-xs font-medium text-stone-700 transition focus:border-[#3B1E14] focus:bg-white focus:outline-none"
                >
                  <option value="Semua Status">Semua Status</option>
                  <option value="Menunggu Review">Menunggu Review</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>

              {/* Date Range Input */}
              <div className="relative sm:col-span-1 md:col-span-2">
                <div className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-[#FDFBF9] px-3 py-2 text-xs text-stone-700">
                  <div className="flex items-center gap-1.5 truncate">
                    <Calendar size={13} className="text-stone-400 shrink-0" />
                    <span className="truncate">{dateRange}</span>
                  </div>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2 sm:col-span-1 md:col-span-2">
                <button
                  onClick={handleResetFilters}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
                <button
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#3B1E14] px-3 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-[#2A150E]"
                >
                  <Filter size={13} />
                  <span>Filter</span>
                </button>
              </div>

            </div>
          </div>

          {/* 6. SUBMISSION TABLE */}
          <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-2xs">
            {filteredSubmissions.length === 0 ? (
              
              /* 13. EMPTY STATE */
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                  <SearchX size={32} />
                </div>
                <h3 className="text-base font-bold text-stone-800">
                  Submission tidak ditemukan
                </h3>
                <p className="mt-1 max-w-sm text-xs text-stone-500">
                  Belum ada pengajuan yang sesuai dengan filter Anda.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#3B1E14] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2A150E]"
                >
                  <RotateCcw size={14} />
                  <span>Reset Filter</span>
                </button>
              </div>

            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200/70 bg-[#FDFBF9] font-semibold text-stone-600">
                      <th className="py-3.5 pl-6 pr-4">Aset Gastronomi</th>
                      <th className="px-4 py-3.5">Contributor</th>
                      <th className="px-4 py-3.5">Kategori</th>
                      <th className="px-4 py-3.5">Tanggal Pengajuan</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="py-3.5 pl-4 pr-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                    {paginatedSubmissions.map((sub) => (
                      <tr
                        key={sub.id}
                        className="transition-colors hover:bg-stone-50/70"
                      >
                        {/* Kolom Aset Gastronomi */}
                        <td className="py-3.5 pl-6 pr-4">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <img
                              src={sub.image}
                              alt={sub.assetName}
                              className="h-12 w-16 shrink-0 rounded-xl object-cover border border-stone-200/60"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-[#3B1E14] text-sm truncate">
                                {sub.assetName}
                              </p>
                              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-stone-500">
                                <MapPin size={12} className="text-[#C89B5C] shrink-0" />
                                <span className="truncate">{sub.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Kolom Contributor */}
                        <td className="px-4 py-3.5 min-w-[160px]">
                          <p className="font-semibold text-stone-800">{sub.contributor}</p>
                          <p className="text-[11px] text-stone-400">{sub.email}</p>
                        </td>

                        {/* Kolom Kategori */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {renderCategoryBadge(sub.category)}
                        </td>

                        {/* Kolom Tanggal Pengajuan */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-stone-700">
                            <Calendar size={13} className="text-stone-400" />
                            <span>{sub.submittedAt}</span>
                          </div>
                          <p className="mt-0.5 pl-4.5 text-[11px] text-stone-400">
                            {sub.time}
                          </p>
                        </td>

                        {/* 7. STATUS BADGE */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {getStatusStyle(sub.status)}
                        </td>

                        {/* 8. TOMBOL REVIEW & 11. MENU TIGA TITIK */}
                        <td className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenReviewModal(sub)}
                              className="inline-flex items-center gap-1 rounded-xl bg-[#3B1E14] px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-[#2A150E] active:scale-95"
                            >
                              <span>Review</span>
                              <ChevronRight size={14} />
                            </button>

                            {/* Dropdown Menu Tiga Titik */}
                            <div className="relative" ref={openDropdownId === sub.id ? dropdownRef : null}>
                              <button
                                onClick={() =>
                                  setOpenDropdownId(
                                    openDropdownId === sub.id ? null : sub.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-xl text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition"
                              >
                                <MoreVertical size={16} />
                              </button>

                              {openDropdownId === sub.id && (
                                <div className="absolute right-0 top-full mt-1 z-30 w-44 rounded-xl border border-stone-200 bg-white py-1.5 shadow-lg text-left">
                                  <button
                                    onClick={() => {
                                      setOpenDropdownId(null);
                                      navigate(`/curator/review-submission/${sub.id}`);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
                                  >
                                    <Eye size={14} className="text-stone-400" />
                                    <span>Lihat Detail</span>
                                  </button>
                                  <button
                                    onClick={() => handleOpenReviewModal(sub)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
                                  >
                                    <Pencil size={14} className="text-stone-400" />
                                    <span>Review</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      setOpenDropdownId(null);
                                      showToast(`Melihat profil ${sub.contributor}`, 'info');
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
                                  >
                                    <User size={14} className="text-stone-400" />
                                    <span>Lihat Contributor</span>
                                  </button>
                                  <div className="my-1 border-t border-stone-100" />
                                  <button
                                    onClick={() => {
                                      setOpenDropdownId(null);
                                      showToast(`Tandai prioritas untuk ${sub.assetName}`, 'info');
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50"
                                  >
                                    <Star size={14} className="text-amber-500" />
                                    <span>Tandai Prioritas</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 12. PAGINATION */}
            {filteredSubmissions.length > 0 && (
              <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-200/80 bg-[#FDFBF9] px-6 py-4 sm:flex-row">
                <p className="text-xs text-stone-500">
                  Tampilkan{' '}
                  <span className="font-semibold text-stone-800">
                    {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredSubmissions.length)}
                  </span>{' '}
                  dari{' '}
                  <span className="font-semibold text-stone-800">
                    {filteredSubmissions.length}
                  </span>{' '}
                  data
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-semibold transition ${
                          currentPage === page
                            ? 'bg-[#3B1E14] text-white'
                            : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="relative">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="appearance-none rounded-xl border border-stone-200 bg-white py-1.5 pl-3 pr-7 text-xs font-semibold text-stone-700 focus:border-[#3B1E14] focus:outline-none"
                    >
                      <option value={5}>5 / halaman</option>
                      <option value={10}>10 / halaman</option>
                      <option value={20}>20 / halaman</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* 9. REVIEW MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-900/60 p-4 backdrop-blur-xs">
          <div className="relative my-8 w-full max-w-3xl rounded-3xl border border-stone-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 bg-[#FDFBF9] px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C89B5C]">
                    Review Submission
                  </span>
                  <span>•</span>
                  {renderCategoryBadge(selectedSubmission.category)}
                </div>
                <h2 className="font-serif text-xl font-bold text-[#3B1E14] mt-0.5">
                  {selectedSubmission.assetName}
                </h2>
              </div>
              <button
                onClick={handleCloseReviewModal}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6 text-xs text-stone-700">
              
              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-[#FDFBF9] p-4 border border-stone-200/60">
                <div>
                  <p className="text-[11px] text-stone-400 font-medium">Contributor</p>
                  <p className="font-bold text-stone-800 text-sm mt-0.5">
                    {selectedSubmission.contributor}
                  </p>
                  <p className="text-[11px] text-stone-500">{selectedSubmission.email}</p>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400 font-medium">Lokasi</p>
                  <p className="font-bold text-stone-800 text-sm mt-0.5 flex items-center gap-1">
                    <MapPin size={13} className="text-[#C89B5C]" />
                    {selectedSubmission.location}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400 font-medium">Status Saat Ini</p>
                  <div className="mt-1">{getStatusStyle(selectedSubmission.status)}</div>
                </div>
              </div>

              {/* Gambar Aset Besar */}
              <div className="overflow-hidden rounded-2xl border border-stone-200/80">
                <img
                  src={selectedSubmission.image}
                  alt={selectedSubmission.assetName}
                  className="h-64 w-full object-cover"
                />
              </div>

              {/* Deskripsi & Nilai Gastronomi */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-[#3B1E14] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <FileText size={14} className="text-[#C89B5C]" />
                    Deskripsi Aset
                  </h4>
                  <p className="leading-relaxed bg-stone-50/70 p-3 rounded-xl border border-stone-100">
                    {selectedSubmission.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#3B1E14] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-[#C89B5C]" />
                    Nilai Gastronomi
                  </h4>
                  <p className="leading-relaxed bg-stone-50/70 p-3 rounded-xl border border-stone-100">
                    {selectedSubmission.gastronomyValue}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#3B1E14] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Info size={14} className="text-[#C89B5C]" />
                    Makna Budaya
                  </h4>
                  <p className="leading-relaxed bg-stone-50/70 p-3 rounded-xl border border-stone-100">
                    {selectedSubmission.culturalSignificance}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#3B1E14] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Share2 size={14} className="text-[#C89B5C]" />
                    Sumber Informasi / Referensi
                  </h4>
                  <p className="leading-relaxed bg-stone-50/70 p-3 rounded-xl border border-stone-100 italic text-stone-600">
                    {selectedSubmission.sourceInfo}
                  </p>
                </div>
              </div>

              {/* Textarea Catatan Reviewer */}
              <div className="border-t border-stone-100 pt-4">
                <label className="block font-bold text-[#3B1E14] text-xs mb-1.5">
                  Catatan Reviewer
                </label>
                <textarea
                  rows={3}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="Masukkan catatan, koreksi, atau alasan keputusan..."
                  className="w-full rounded-xl border border-stone-200 bg-[#FDFBF9] p-3 text-xs text-stone-800 placeholder:text-stone-400 focus:border-[#3B1E14] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
                />
              </div>

            </div>

            {/* 10. ACTION REVIEW BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100 bg-[#FDFBF9] px-6 py-4">
              <button
                onClick={() => handleTriggerAction('Rejected')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                <XCircle size={15} />
                <span>Tolak</span>
              </button>

              <div className="flex w-full sm:w-auto items-center gap-2">
                <button
                  onClick={() => handleTriggerAction('Perlu Perbaikan')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-100"
                >
                  <Pencil size={15} />
                  <span>Minta Perbaikan</span>
                </button>

                <button
                  onClick={() => handleTriggerAction('Approve')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-emerald-700"
                >
                  <CheckCircle2 size={15} />
                  <span>Approve</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG MODAL */}
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-bold text-stone-800 text-sm">
              Konfirmasi Keputusan
            </h3>
            <p className="mt-2 text-xs text-stone-500 leading-relaxed">
              Apakah Anda yakin ingin mengubah status submission ini menjadi{' '}
              <span className="font-bold text-[#3B1E14]">
                "{confirmationModal.actionType}"
              </span>
              ?
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setConfirmationModal({ isOpen: false, actionType: null })}
                className="flex-1 rounded-xl border border-stone-200 bg-white py-2 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Batal
              </button>
              <button
                onClick={handleExecuteAction}
                className="flex-1 rounded-xl bg-[#3B1E14] py-2 text-xs font-semibold text-white hover:bg-[#2A150E]"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-70 flex items-center gap-2 rounded-2xl border border-stone-200 bg-stone-900 px-4 py-3 text-xs text-white shadow-2xl animate-in slide-in-from-bottom-5">
          <Check size={16} className="text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}