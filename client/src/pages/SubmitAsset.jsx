import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Landmark,
  BookOpen,
  CheckCircle2,
  Upload,
  Trash2,
  AlertCircle,
  Users,
  History,
  Leaf,
  TrendingUp,
  Info,
  ChevronRight,
  Send,
  Utensils,
  CalendarDays,
  Image as ImageIcon,
  MapPin,
  Clock,
  UserRound,
  Link as LinkIcon,
  Globe2,
  ChefHat,
  List,
  MapPinned,
  FileText
} from 'lucide-react';

const CATEGORIES = [
  'Kuliner',
  'Budaya',
  'Bahan',
  'Agenda',
  'Multimedia',
  'Destinasi'
];

const GASTRONOMY_VALUES = [
  { id: 'Budaya', label: 'Budaya', icon: Landmark },
  { id: 'Sosial', label: 'Sosial', icon: Users },
  { id: 'Sejarah', label: 'Sejarah', icon: History },
  { id: 'Tradisi', label: 'Tradisi', icon: BookOpen },
  { id: 'Lingkungan', label: 'Lingkungan', icon: Leaf },
  { id: 'Ekonomi', label: 'Ekonomi', icon: TrendingUp }
];

// Mock data pengajuan untuk keperluan edit
const MOCK_SUBMISSIONS = {
  '3': {
    name: 'Base Genep Bali',
    category: 'Bahan',
    location: 'Denpasar, Bali',
    description:
      'Base genep adalah bumbu dasar khas Bali yang terdiri dari rempah-rempah lengkap yang diolah secara tradisional.',
    culturalMeaning:
      'Mencerminkan filosofi keseimbangan rasa dan harmonisasi kehidupan masyarakat Bali.',
    reference: 'Wawancara dengan Tokoh Adat Denpasar & Jurnal Gastronomi',
    selectedValues: ['Budaya', 'Tradisi', 'Sejarah'],
    previewUrl:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d',

    detailData: {
      origin: 'Bali',
      characteristics: 'Campuran rempah yang lengkap dan memiliki aroma khas.',
      usage: 'Digunakan sebagai bumbu dasar berbagai masakan Bali.',
      availability: 'Sepanjang tahun'
    }
  }
};

export default function SubmitAsset() {
  const navigate = useNavigate();
  const { id } = useParams();

  const fileInputRef = useRef(null);

  const isEditMode = Boolean(id);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    culturalMeaning: '',
    reference: ''
  });

  const [detailData, setDetailData] = useState({});

  const [selectedValues, setSelectedValues] = useState([]);

  const [uploadedFile, setUploadedFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState('');

  const [agreed, setAgreed] = useState(false);

  const [errors, setErrors] = useState({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // =========================================================
  // DETAIL FIELD CONFIGURATION
  // =========================================================

  const CATEGORY_DETAILS = {
    Kuliner: [
      {
        name: 'recipeDescription',
        label: 'Deskripsi Resep',
        type: 'textarea',
        rows: 3,
        placeholder:
          'Jelaskan secara singkat mengenai hidangan atau resep ini...'
      },
      {
        name: 'ingredients',
        label: 'Bahan-bahan',
        type: 'textarea',
        rows: 6,
        placeholder:
          'Contoh:\n- 500 gram daging ayam\n- 5 siung bawang putih\n- 3 buah cabai\n- 2 lembar daun salam'
      },
      {
        name: 'steps',
        label: 'Langkah-langkah Memasak',
        type: 'textarea',
        rows: 7,
        placeholder:
          'Contoh:\n1. Bersihkan bahan.\n2. Haluskan bumbu.\n3. Tumis bumbu hingga harum.\n4. Masukkan bahan utama.'
      },
      {
        name: 'prepTime',
        label: 'Waktu Persiapan',
        type: 'text',
        placeholder: 'Contoh: 20 menit'
      },
      {
        name: 'cookTime',
        label: 'Waktu Memasak',
        type: 'text',
        placeholder: 'Contoh: 45 menit'
      },
      {
        name: 'servings',
        label: 'Jumlah Porsi',
        type: 'text',
        placeholder: 'Contoh: 4 porsi'
      },
      {
        name: 'cookingMethod',
        label: 'Metode Memasak',
        type: 'text',
        placeholder: 'Contoh: Merebus, mengukus, memanggang'
      }
    ],

    Budaya: [
      {
        name: 'origin',
        label: 'Asal / Wilayah Budaya',
        type: 'text',
        placeholder: 'Contoh: Gianyar, Bali'
      },
      {
        name: 'historicalContext',
        label: 'Konteks Sejarah',
        type: 'textarea',
        rows: 5,
        placeholder:
          'Jelaskan sejarah, perkembangan, atau latar belakang budaya yang berkaitan dengan aset ini...'
      },
      {
        name: 'traditionContext',
        label: 'Tradisi / Praktik Budaya',
        type: 'textarea',
        rows: 5,
        placeholder:
          'Jelaskan bagaimana aset ini digunakan atau diwariskan dalam tradisi masyarakat...'
      },
      {
        name: 'communityRole',
        label: 'Peran dalam Masyarakat',
        type: 'textarea',
        rows: 4,
        placeholder:
          'Jelaskan peran aset dalam kehidupan sosial atau komunitas...'
      }
    ],

    Bahan: [
      {
        name: 'origin',
        label: 'Asal Bahan',
        type: 'text',
        placeholder: 'Contoh: Karangasem, Bali'
      },
      {
        name: 'characteristics',
        label: 'Karakteristik Bahan',
        type: 'textarea',
        rows: 4,
        placeholder:
          'Jelaskan bentuk, rasa, aroma, warna, tekstur, atau karakteristik khas bahan...'
      },
      {
        name: 'usage',
        label: 'Penggunaan dalam Gastronomi',
        type: 'textarea',
        rows: 4,
        placeholder:
          'Jelaskan penggunaan bahan dalam masakan, minuman, atau praktik gastronomi lainnya...'
      },
      {
        name: 'availability',
        label: 'Ketersediaan / Musim',
        type: 'text',
        placeholder: 'Contoh: Sepanjang tahun / Musim hujan'
      },
      {
        name: 'processing',
        label: 'Cara Pengolahan',
        type: 'textarea',
        rows: 4,
        placeholder:
          'Jelaskan proses pengolahan bahan sebelum digunakan...'
      }
    ],

    Agenda: [
      {
        name: 'eventName',
        label: 'Nama Agenda',
        type: 'text',
        placeholder: 'Contoh: Festival Gastronomi Bali'
      },
      {
        name: 'eventDate',
        label: 'Tanggal Pelaksanaan',
        type: 'date'
      },
      {
        name: 'eventTime',
        label: 'Waktu Pelaksanaan',
        type: 'text',
        placeholder: 'Contoh: 09.00 - 17.00 WITA'
      },
      {
        name: 'organizer',
        label: 'Penyelenggara',
        type: 'text',
        placeholder: 'Contoh: Dinas Pariwisata / Komunitas Gastronomi'
      },
      {
        name: 'venue',
        label: 'Tempat Pelaksanaan',
        type: 'text',
        placeholder: 'Contoh: Art Center Bali'
      },
      {
        name: 'eventDescription',
        label: 'Deskripsi Agenda',
        type: 'textarea',
        rows: 5,
        placeholder:
          'Jelaskan kegiatan, tema, tujuan, rangkaian acara, dan informasi penting lainnya...'
      },
      {
        name: 'registration',
        label: 'Informasi Pendaftaran',
        type: 'text',
        placeholder: 'Contoh: Gratis / Rp50.000 / Registrasi melalui website'
      },
      {
        name: 'contact',
        label: 'Kontak Penyelenggara',
        type: 'text',
        placeholder: 'Contoh: 0812xxxxxxx / email@example.com'
      },
      {
        name: 'eventLink',
        label: 'Link Informasi / Pendaftaran',
        type: 'url',
        placeholder: 'https://...'
      }
    ],

    Multimedia: [
      {
        name: 'mediaType',
        label: 'Jenis Media',
        type: 'select',
        options: [
          'Foto',
          'Video',
          'Audio',
          'Dokumen',
          'Infografis'
        ]
      },
      {
        name: 'creator',
        label: 'Pembuat / Sumber Media',
        type: 'text',
        placeholder: 'Contoh: Dokumentasi Komunitas X'
      },
      {
        name: 'captureDate',
        label: 'Tanggal Dokumentasi',
        type: 'date'
      },
      {
        name: 'mediaDescription',
        label: 'Deskripsi Media',
        type: 'textarea',
        rows: 4,
        placeholder:
          'Jelaskan isi, konteks, atau informasi yang terdapat dalam media...'
      },
      {
        name: 'license',
        label: 'Lisensi / Hak Penggunaan',
        type: 'text',
        placeholder:
          'Contoh: Hak cipta pemilik / Creative Commons / Izin penggunaan'
      },
      {
        name: 'sourceUrl',
        label: 'Sumber / URL',
        type: 'url',
        placeholder: 'https://...'
      }
    ],

    Destinasi: [
      {
        name: 'destinationType',
        label: 'Jenis Destinasi',
        type: 'select',
        options: [
          'Restoran',
          'Pasar Tradisional',
          'Desa Wisata',
          'Agrowisata',
          'Pusat Kuliner',
          'Museum',
          'Tempat Budaya',
          'Lainnya'
        ]
      },
      {
        name: 'address',
        label: 'Alamat Lengkap',
        type: 'textarea',
        rows: 3,
        placeholder:
          'Contoh: Jl. Raya Ubud No. 10, Ubud, Gianyar, Bali'
      },
      {
        name: 'attraction',
        label: 'Daya Tarik Gastronomi',
        type: 'textarea',
        rows: 4,
        placeholder:
          'Jelaskan makanan, minuman, pengalaman, budaya, atau aktivitas gastronomi yang tersedia...'
      },
      {
        name: 'facilities',
        label: 'Fasilitas',
        type: 'textarea',
        rows: 3,
        placeholder:
          'Contoh: Parkir, toilet, restoran, pusat informasi, area kuliner'
      },
      {
        name: 'openingHours',
        label: 'Jam Operasional',
        type: 'text',
        placeholder: 'Contoh: 08.00 - 18.00 WITA'
      },
      {
        name: 'contact',
        label: 'Kontak',
        type: 'text',
        placeholder: 'Contoh: 0812xxxxxxx'
      },
      {
        name: 'website',
        label: 'Website / Media Sosial',
        type: 'url',
        placeholder: 'https://...'
      }
    ]
  };

  // =========================================================
  // LOAD DATA UNTUK EDIT MODE
  // =========================================================

  useEffect(() => {
    if (isEditMode && MOCK_SUBMISSIONS[id]) {
      const data = MOCK_SUBMISSIONS[id];

      setFormData({
        name: data.name || '',
        category: data.category || '',
        location: data.location || '',
        description: data.description || '',
        culturalMeaning: data.culturalMeaning || '',
        reference: data.reference || ''
      });

      setDetailData(data.detailData || {});

      setSelectedValues(data.selectedValues || []);

      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);

        setUploadedFile({
          name: 'foto_dokumentasi_existing.jpg',
          size: 1048576,
          isExisting: true
        });
      }
    }
  }, [id, isEditMode]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;

    setDetailData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // =========================================================
  // CATEGORY CHANGE
  // =========================================================

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      category: value
    }));

    // Reset detail category sebelumnya
    setDetailData({});

    // Reset error kategori
    setErrors((prev) => ({
      ...prev,
      category: null
    }));
  };

  // =========================================================
  // FILE UPLOAD
  // =========================================================

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        file: 'Ukuran file maksimal 10 MB'
      }));

      return;
    }

    setUploadedFile(file);

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    setErrors((prev) => ({
      ...prev,
      file: null
    }));
  };

  const handleRemoveFile = () => {
    if (previewUrl && !uploadedFile?.isExisting) {
      URL.revokeObjectURL(previewUrl);
    }

    setUploadedFile(null);
    setPreviewUrl('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // =========================================================
  // GASTRONOMY VALUES
  // =========================================================

  const handleToggleValue = (valueId) => {
    setSelectedValues((prev) => {
      const next = prev.includes(valueId)
        ? prev.filter((item) => item !== valueId)
        : [...prev, valueId];

      if (next.length > 0 && errors.values) {
        setErrors((errs) => ({
          ...errs,
          values: null
        }));
      }

      return next;
    });
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    // Informasi umum
    if (!formData.name.trim()) {
      newErrors.name = 'Nama aset wajib diisi.';
    }

    if (!formData.category) {
      newErrors.category = 'Silakan pilih kategori aset.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi / daerah wajib diisi.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi singkat wajib diisi.';
    }

    // Dokumentasi
    if (!uploadedFile && !previewUrl) {
      newErrors.file = 'Silakan unggah dokumentasi foto/media.';
    }

    // Nilai gastronomi
    if (selectedValues.length === 0) {
      newErrors.values =
        'Silakan pilih minimal satu nilai gastronomi.';
    }

    if (!formData.culturalMeaning.trim()) {
      newErrors.culturalMeaning =
        'Makna / nilai budaya wajib diisi.';
    }

    // Validasi detail kategori
    const currentFields =
      CATEGORY_DETAILS[formData.category] || [];

    currentFields.forEach((field) => {
      const value = detailData[field.name];

      // Field wajib hanya untuk field inti
      const requiredFields = {
        Kuliner: [
          'ingredients',
          'steps',
          'servings'
        ],

        Budaya: [
          'origin',
          'historicalContext'
        ],

        Bahan: [
          'origin',
          'characteristics',
          'usage'
        ],

        Agenda: [
          'eventName',
          'eventDate',
          'organizer',
          'venue',
          'eventDescription'
        ],

        Multimedia: [
          'mediaType',
          'creator',
          'mediaDescription'
        ],

        Destinasi: [
          'destinationType',
          'address',
          'attraction'
        ]
      };

      const required =
        requiredFields[formData.category]?.includes(field.name);

      if (required && !value?.trim()) {
        newErrors[field.name] =
          `${field.label} wajib diisi.`;
      }
    });

    // Agreement
    if (!agreed) {
      newErrors.agreed =
        'Anda harus menyetujui pernyataan persetujuan.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('SUBMISSION DATA:', {
        ...formData,
        detailData,
        selectedValues,
        uploadedFile
      });

      setShowSuccessModal(true);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleResetForm = () => {
    setFormData({
      name: '',
      category: '',
      location: '',
      description: '',
      culturalMeaning: '',
      reference: ''
    });

    setDetailData({});

    setSelectedValues([]);

    handleRemoveFile();

    setAgreed(false);

    setErrors({});

    setShowSuccessModal(false);
  };

  // =========================================================
  // FILE SIZE
  // =========================================================

  const formatFileSize = (bytes) => {
    if (!bytes) return '';

    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }

    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // =========================================================
  // DETAIL SECTION TITLE
  // =========================================================

  const getDetailSectionTitle = () => {
    switch (formData.category) {
      case 'Kuliner':
        return 'DETAIL RESEP';

      case 'Budaya':
        return 'DETAIL BUDAYA';

      case 'Bahan':
        return 'DETAIL BAHAN';

      case 'Agenda':
        return 'DETAIL AGENDA';

      case 'Multimedia':
        return 'DETAIL MULTIMEDIA';

      case 'Destinasi':
        return 'DETAIL DESTINASI';

      default:
        return 'DETAIL ASET';
    }
  };

  const getDetailSectionDescription = () => {
    switch (formData.category) {
      case 'Kuliner':
        return 'Lengkapi informasi resep agar dapat didokumentasikan secara terstruktur.';

      case 'Budaya':
        return 'Lengkapi informasi mengenai sejarah, tradisi, dan konteks budaya aset.';

      case 'Bahan':
        return 'Lengkapi informasi mengenai bahan pangan dan penggunaannya dalam gastronomi.';

      case 'Agenda':
        return 'Lengkapi informasi mengenai kegiatan atau agenda gastronomi.';

      case 'Multimedia':
        return 'Lengkapi informasi mengenai media, sumber, dan hak penggunaannya.';

      case 'Destinasi':
        return 'Lengkapi informasi mengenai destinasi dan pengalaman gastronomi yang tersedia.';

      default:
        return 'Lengkapi informasi khusus sesuai dengan kategori aset.';
    }
  };

  // =========================================================
  // RENDER DETAIL FIELD
  // =========================================================

  const renderDetailField = (field) => {
    const value = detailData[field.name] || '';

    const inputClass = `
      w-full rounded-xl border bg-white p-3 text-sm text-gray-800
      transition placeholder:text-gray-400 focus:outline-none focus:ring-1
      ${
        errors[field.name]
          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
          : 'border-stone-200 focus:border-[#3B1E14] focus:ring-[#3B1E14]'
      }
    `;

    return (
      <div key={field.name}>
        <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
          {field.label}

          {[
            'ingredients',
            'steps',
            'servings',
            'origin',
            'historicalContext',
            'characteristics',
            'usage',
            'eventName',
            'eventDate',
            'organizer',
            'venue',
            'eventDescription',
            'mediaType',
            'creator',
            'mediaDescription',
            'destinationType',
            'address',
            'attraction'
          ].includes(field.name) && (
            <span className="text-rose-500"> *</span>
          )}
        </label>

        {field.type === 'textarea' && (
          <>
            <textarea
              name={field.name}
              rows={field.rows || 4}
              maxLength={1500}
              value={value}
              onChange={handleDetailChange}
              placeholder={field.placeholder}
              className={inputClass}
            />

            <div className="mt-1 text-right text-[11px] text-gray-400">
              {value.length} / 1500
            </div>
          </>
        )}

        {field.type === 'select' && (
          <div className="relative">
            <select
              name={field.name}
              value={value}
              onChange={handleDetailChange}
              className={`${inputClass} cursor-pointer appearance-none pr-10 ${
                value ? 'text-gray-800' : 'text-gray-400'
              }`}
            >
              <option value="" disabled>
                Pilih {field.label}
              </option>

              {field.options.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="text-gray-800"
                >
                  {option}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <ChevronRight
                size={16}
                className="rotate-90"
              />
            </div>
          </div>
        )}

        {(field.type === 'text' ||
          field.type === 'url' ||
          field.type === 'date') && (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={handleDetailChange}
            placeholder={field.placeholder}
            className={inputClass}
          />
        )}

        {errors[field.name] && (
          <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
            <AlertCircle size={13} />
            {errors[field.name]}
          </p>
        )}
      </div>
    );
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF9] font-sans text-gray-800">

      <Navbar />

      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="relative mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div className="max-w-2xl">

              <h1 className="text-2xl font-bold tracking-tight text-[#3B1E14] sm:text-3xl">
                {isEditMode
                  ? 'Edit / Perbaiki Pengajuan Aset'
                  : 'Submit Aset'}
              </h1>

              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:text-base">
                {isEditMode
                  ? `Perbarui detail informasi aset gastronomi (ID: ${id}) sesuai dengan catatan revisi.`
                  : 'Bagikan pengetahuan dan aset gastronomi Bali untuk mendukung dokumentasi dan pelestarian budaya kuliner.'}
              </p>

              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50/70 px-3.5 py-2.5 text-xs text-amber-900 shadow-2xs">

                <Info
                  size={16}
                  className="shrink-0 text-amber-700"
                />

                <span>
                  Pastikan informasi yang Anda masukkan akurat
                  dan dapat dipertanggungjawabkan.
                </span>

              </div>

            </div>

            {/* CANDI BENTAR */}
            <div className="hidden shrink-0 opacity-20 md:block">
              <svg
                width="180"
                height="90"
                viewBox="0 0 200 100"
                fill="none"
                stroke="#3B1E14"
                strokeWidth="1.5"
              >
                <path d="M 20,90 L 20,40 L 40,20 L 70,20 L 70,90 M 130,90 L 130,20 L 160,20 L 180,40 L 180,90" />
                <path
                  d="M 40,20 L 40,90 M 160,20 L 160,90"
                  strokeDasharray="2 2"
                />
                <circle
                  cx="100"
                  cy="50"
                  r="15"
                  strokeWidth="1"
                />
                <path d="M 90,50 L 110,50 M 100,40 L 100,60" />
              </svg>
            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >

            {/* =================================================
                SECTION 1
            ================================================= */}

            <div className="border-b border-stone-100 p-6 sm:p-8">

              <div className="mb-6 flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/70 font-bold text-[#3B1E14]">
                  01
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#3B1E14]">
                    INFORMASI ASET
                  </h2>

                  <p className="text-xs text-gray-500">
                    Informasi dasar mengenai aset yang ingin didokumentasikan.
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                {/* NAMA */}
                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                    Nama Aset <span className="text-rose-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Lawar Bali"
                    className={`w-full rounded-xl border bg-white p-3 text-sm text-gray-800 transition placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                      errors.name
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-stone-200 focus:border-[#3B1E14] focus:ring-[#3B1E14]'
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                      <AlertCircle size={13} />
                      {errors.name}
                    </p>
                  )}

                </div>

                {/* KATEGORI + LOKASI */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* KATEGORI */}
                  <div>

                    <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                      Kategori <span className="text-rose-500">*</span>
                    </label>

                    <div className="relative">

                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        className={`w-full cursor-pointer appearance-none rounded-xl border bg-white p-3 pr-10 text-sm transition focus:outline-none focus:ring-1 ${
                          formData.category
                            ? 'text-gray-800'
                            : 'text-gray-400'
                        } ${
                          errors.category
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                            : 'border-stone-200 focus:border-[#3B1E14] focus:ring-[#3B1E14]'
                        }`}
                      >

                        <option
                          value=""
                          disabled
                          hidden
                        >
                          Pilih kategori
                        </option>

                        {CATEGORIES.map((cat) => (
                          <option
                            key={cat}
                            value={cat}
                            className="text-gray-800"
                          >
                            {cat}
                          </option>
                        ))}

                      </select>

                      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <ChevronRight
                          size={16}
                          className="rotate-90"
                        />
                      </div>

                    </div>

                    {errors.category && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={13} />
                        {errors.category}
                      </p>
                    )}

                  </div>

                  {/* LOKASI */}
                  <div>

                    <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                      Lokasi / Daerah{' '}
                      <span className="text-rose-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Contoh: Gianyar, Bali"
                      className={`w-full rounded-xl border bg-white p-3 text-sm text-gray-800 transition placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                        errors.location
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-stone-200 focus:border-[#3B1E14] focus:ring-[#3B1E14]'
                      }`}
                    />

                    {errors.location && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={13} />
                        {errors.location}
                      </p>
                    )}

                  </div>

                </div>

                {/* DESKRIPSI */}
                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                    Deskripsi <span className="text-rose-500">*</span>
                  </label>

                  <textarea
                    name="description"
                    rows={4}
                    maxLength={1000}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Jelaskan secara umum mengenai aset gastronomi ini..."
                    className={`w-full rounded-xl border bg-white p-3 text-sm text-gray-800 transition placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                      errors.description
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-stone-200 focus:border-[#3B1E14] focus:ring-[#3B1E14]'
                    }`}
                  />

                  <div className="mt-1 text-right text-[11px] text-gray-400">
                    {formData.description.length} / 1000
                  </div>

                  {errors.description && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                      <AlertCircle size={13} />
                      {errors.description}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                CATEGORY DETAIL
            ================================================= */}

            {formData.category && (
              <div className="border-b border-stone-100 bg-[#FFFCF8] p-6 sm:p-8">

                <div className="mb-6 flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/70 font-bold text-[#3B1E14]">
                    02
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-[#3B1E14]">
                      {getDetailSectionTitle()}
                    </h2>

                    <p className="text-xs text-gray-500">
                      {getDetailSectionDescription()}
                    </p>

                  </div>

                </div>

                {/* CATEGORY ICON INFO */}
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/50 p-4">

                  {formData.category === 'Kuliner' && (
                    <Utensils
                      size={20}
                      className="text-amber-800"
                    />
                  )}

                  {formData.category === 'Budaya' && (
                    <Landmark
                      size={20}
                      className="text-amber-800"
                    />
                  )}

                  {formData.category === 'Bahan' && (
                    <Leaf
                      size={20}
                      className="text-amber-800"
                    />
                  )}

                  {formData.category === 'Agenda' && (
                    <CalendarDays
                      size={20}
                      className="text-amber-800"
                    />
                  )}

                  {formData.category === 'Multimedia' && (
                    <ImageIcon
                      size={20}
                      className="text-amber-800"
                    />
                  )}

                  {formData.category === 'Destinasi' && (
                    <MapPinned
                      size={20}
                      className="text-amber-800"
                    />
                  )}

                  <p className="text-xs leading-relaxed text-amber-900">
                    Informasi pada bagian ini disesuaikan dengan
                    kategori <strong>{formData.category}</strong>.
                  </p>

                </div>

                {/* DETAIL FORM */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {CATEGORY_DETAILS[
                    formData.category
                  ]?.map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.type === 'textarea'
                          ? 'md:col-span-2'
                          : ''
                      }
                    >
                      {renderDetailField(field)}
                    </div>
                  ))}

                </div>

              </div>
            )}

            {/* =================================================
                DOKUMENTASI
            ================================================= */}

            <div className="border-b border-stone-100 p-6 sm:p-8">

              <div className="mb-6 flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/70 font-bold text-[#3B1E14]">
                  03
                </div>

                <div>

                  <h2 className="text-lg font-bold text-[#3B1E14]">
                    DOKUMENTASI
                  </h2>

                  <p className="text-xs text-gray-500">
                    Tambahkan foto atau media yang dapat membantu
                    mendokumentasikan aset.
                  </p>

                </div>

              </div>

              {!previewUrl ? (

                <div
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition hover:bg-amber-50/20 ${
                    errors.file
                      ? 'border-rose-300 bg-rose-50/20'
                      : 'border-stone-300 bg-[#FDFBF9]'
                  }`}
                >

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={
                      formData.category === 'Multimedia'
                        ? 'image/*,video/*,audio/*,.pdf'
                        : 'image/jpeg,image/png,image/webp'
                    }
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white text-[#3B1E14] shadow-2xs transition-transform group-hover:scale-105">
                    <Upload size={22} />
                  </div>

                  <p className="text-xs font-semibold text-gray-700 sm:text-sm">
                    Tarik & lepas file di sini atau{' '}
                    <span className="text-[#3B1E14] underline">
                      Pilih File
                    </span>
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    {formData.category === 'Multimedia'
                      ? 'Foto, Video, Audio, atau PDF • Maks. 10 MB'
                      : 'JPG, PNG, atau WEBP • Maks. 10 MB'}
                  </p>

                </div>

              ) : (

                <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-4">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                    {uploadedFile?.type?.startsWith('image/') ||
                    uploadedFile?.isExisting ? (
                      <img
                        src={previewUrl}
                        alt="Preview Dokumentasi"
                        className="h-28 w-full shrink-0 rounded-xl border border-stone-100 object-cover sm:w-36"
                      />
                    ) : (
                      <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl border border-stone-100 bg-stone-50 text-[#3B1E14] sm:w-36">
                        <FileText size={32} />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-bold text-gray-900">
                        {uploadedFile?.name ||
                          'Dokumentasi-Aset'}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {uploadedFile?.size
                          ? formatFileSize(
                              uploadedFile.size
                            )
                          : 'File Dokumentasi'}
                      </p>

                      <span className="mt-2 inline-flex items-center gap-1 rounded-md border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">

                        <CheckCircle2 size={12} />

                        {uploadedFile?.isExisting
                          ? 'Dokumentasi Terpasang'
                          : 'Siap diunggah'}

                      </span>

                    </div>

                    <div className="flex gap-2 sm:flex-col sm:items-end">

                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="rounded-xl border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
                      >
                        Ganti File
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50/50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100/70"
                      >
                        <Trash2 size={13} />
                        Hapus
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={
                          formData.category === 'Multimedia'
                            ? 'image/*,video/*,audio/*,.pdf'
                            : 'image/jpeg,image/png,image/webp'
                        }
                        onChange={handleFileChange}
                        className="hidden"
                      />

                    </div>

                  </div>

                </div>

              )}

              {errors.file && (
                <p className="mt-2 flex items-center gap-1 text-xs text-rose-600">
                  <AlertCircle size={13} />
                  {errors.file}
                </p>
              )}

            </div>

            {/* =================================================
                NILAI GASTRONOMI
            ================================================= */}

            <div className="border-b border-stone-100 p-6 sm:p-8">

              <div className="mb-6 flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/70 font-bold text-[#3B1E14]">
                  04
                </div>

                <div>

                  <h2 className="text-lg font-bold text-[#3B1E14]">
                    NILAI GASTRONOMI
                  </h2>

                  <p className="text-xs text-gray-500">
                    Tambahkan konteks dan nilai yang terkandung
                    dalam aset.
                  </p>

                </div>

              </div>

              <div className="space-y-6">

                {/* CHIPS */}
                <div>

                  <label className="mb-2.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                    Nilai Gastronomi{' '}
                    <span className="text-rose-500">*</span>
                  </label>

                  <div className="flex flex-wrap gap-2.5">

                    {GASTRONOMY_VALUES.map((item) => {

                      const IconComp = item.icon;

                      const isSelected =
                        selectedValues.includes(item.id);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            handleToggleValue(item.id)
                          }
                          className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
                            isSelected
                              ? 'border-[#3B1E14] bg-[#3B1E14] text-white shadow-xs'
                              : 'border-stone-200 bg-[#FDFBF9] text-stone-700 hover:border-amber-800/40 hover:bg-amber-50/40'
                          }`}
                        >
                          <IconComp
                            size={15}
                            className={
                              isSelected
                                ? 'text-amber-200'
                                : 'text-amber-800'
                            }
                          />

                          {item.label}
                        </button>
                      );
                    })}

                  </div>

                  {errors.values && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-rose-600">
                      <AlertCircle size={13} />
                      {errors.values}
                    </p>
                  )}

                </div>

                {/* CULTURAL MEANING */}
                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                    Makna / Nilai Budaya{' '}
                    <span className="text-rose-500">*</span>
                  </label>

                  <textarea
                    name="culturalMeaning"
                    rows={4}
                    maxLength={1000}
                    value={formData.culturalMeaning}
                    onChange={handleInputChange}
                    placeholder="Jelaskan makna budaya, tradisi, nilai sosial, atau konteks gastronomi yang berkaitan dengan aset ini..."
                    className={`w-full rounded-xl border bg-white p-3 text-sm text-gray-800 transition placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                      errors.culturalMeaning
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-stone-200 focus:border-[#3B1E14] focus:ring-[#3B1E14]'
                    }`}
                  />

                  <div className="mt-1 text-right text-[11px] text-gray-400">
                    {formData.culturalMeaning.length} / 1000
                  </div>

                  {errors.culturalMeaning && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                      <AlertCircle size={13} />
                      {errors.culturalMeaning}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                SUMBER INFORMASI
            ================================================= */}

            <div className="border-b border-stone-100 p-6 sm:p-8">

              <div className="mb-6 flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/70 font-bold text-[#3B1E14]">
                  05
                </div>

                <div>

                  <h2 className="text-lg font-bold text-[#3B1E14]">
                    SUMBER INFORMASI
                  </h2>

                  <p className="text-xs text-gray-500">
                    Cantumkan sumber informasi yang digunakan
                    jika tersedia.
                  </p>

                </div>

              </div>

              <textarea
                name="reference"
                rows={4}
                maxLength={500}
                value={formData.reference}
                onChange={handleInputChange}
                placeholder="Contoh: wawancara, buku, artikel ilmiah, dokumentasi masyarakat, arsip, atau sumber lainnya..."
                className="w-full rounded-xl border border-stone-200 bg-white p-3 text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-[#3B1E14] focus:outline-none focus:ring-1 focus:ring-[#3B1E14]"
              />

              <div className="mt-1 text-right text-[11px] text-gray-400">
                {formData.reference.length} / 500
              </div>

            </div>

            {/* =================================================
                AGREEMENT + ACTION
            ================================================= */}

            <div className="bg-[#FDFBF9]/60 p-6 sm:p-8">

              <div className="mb-8 rounded-xl border border-stone-200/80 bg-white p-4">

                <label className="flex cursor-pointer select-none items-start gap-3">

                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {

                      setAgreed(e.target.checked);

                      if (
                        e.target.checked &&
                        errors.agreed
                      ) {
                        setErrors((errs) => ({
                          ...errs,
                          agreed: null
                        }));
                      }

                    }}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-[#3B1E14] accent-[#3B1E14] focus:ring-[#3B1E14]"
                  />

                  <span className="text-xs text-gray-700 sm:text-sm">

                    Saya memastikan bahwa informasi yang
                    saya kirimkan dapat dipertanggungjawabkan
                    dan dapat digunakan untuk keperluan
                    dokumentasi Gastro Pustaka.

                    <span className="text-rose-500">
                      {' '}
                      *
                    </span>

                  </span>

                </label>

                {errors.agreed && (
                  <p className="mt-2 flex items-center gap-1 pl-7 text-xs text-rose-600">
                    <AlertCircle size={13} />
                    {errors.agreed}
                  </p>
                )}

              </div>

              <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    navigate('/my-submission')
                  }
                  className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-xs font-bold text-gray-700 transition hover:bg-stone-50 active:scale-95 sm:text-sm"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B1E14] px-8 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#2A150E] active:scale-95 sm:text-sm"
                >

                  <Send size={16} />

                  {isEditMode
                    ? 'Simpan Perubahan'
                    : 'Kirim Aset'}

                </button>

              </div>

            </div>

          </form>

        </div>
      </main>

      {/* =====================================================
          SUCCESS MODAL
      ===================================================== */}

      {showSuccessModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">

          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-2xl sm:p-8">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-xl font-bold text-[#3B1E14]">

              {isEditMode
                ? 'Aset Berhasil Diperbarui'
                : 'Aset Berhasil Dikirim'}

            </h3>

            <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">

              {isEditMode
                ? 'Perubahan aset Anda telah tersimpan dan akan ditinjau kembali oleh kurator Gastro Pustaka.'
                : 'Terima kasih telah berkontribusi dalam dokumentasi gastronomi Bali. Aset yang Anda kirimkan akan melalui proses peninjauan sebelum ditampilkan di Gastro Pustaka.'}

            </p>

            <div className="mt-6 flex flex-col gap-2.5">

              <button
                type="button"
                onClick={() =>
                  navigate('/my-submission')
                }
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#3B1E14] py-3 text-xs font-bold text-white shadow transition hover:bg-[#2A150E] sm:text-sm"
              >

                Lihat My Submission

                <ChevronRight size={16} />

              </button>

              {!isEditMode && (

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-stone-100 sm:text-sm"
                >
                  Kirim Aset Lain
                </button>

              )}

            </div>

          </div>

        </div>

      )}

      <Footer />

    </div>
  );
}