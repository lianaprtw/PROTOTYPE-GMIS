import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  Send,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ChevronRight,
  Utensils,
  BookOpen,
  MapPin,
  Users,
  FileText,
  Info,
  Bot,
  Compass,
  Search,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  MOCK_AI_RESPONSES,
  MOCK_RELATED_ASSETS,
  SUGGESTED_CHIPS,
} from "../data/gastronomyAIData";

export default function GastronomyAI() {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================
  const [inputText, setInputText] = useState("");
  const [activeQuery, setActiveQuery] = useState("makanan khas bali");
  const [isLoading, setIsLoading] = useState(false);
  const [isSummary, setIsSummary] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // =========================================================
  // GET AI RESPONSE
  // =========================================================
  const currentAiData = useMemo(() => {
    const key = activeQuery.toLowerCase().trim();

    if (MOCK_AI_RESPONSES?.[key]) {
      return MOCK_AI_RESPONSES[key];
    }

    return {
      topic: activeQuery,

      summary:
        "Informasi mengenai pertanyaan tersebut belum tersedia secara lengkap dalam repository Gastro Pustaka.",

      intro:
        "Maaf, informasi untuk pertanyaan tersebut belum tersedia dalam repository Gastro Pustaka. Coba gunakan pertanyaan yang lebih spesifik mengenai kuliner, budaya, bahan, resep, atau destinasi gastronomi.",

      sections: [],

      sources: ["Repository Gastro Pustaka"],

      quickSummary: {
        jenis: "Informasi Kuliner",
        asal: "Indonesia",
        bahanUtama: "Variatif",
        disajikanDalam: "Umum",
        rasaDominan: "-",
      },

      categories: ["Kuliner Nusantara"],

      followUpQuestions: [
        "Apa saja makanan khas Bali?",
        "Bagaimana sejarah tradisi Megibung?",
        "Bahan apa saja yang digunakan dalam masakan Bali?",
      ],
    };
  }, [activeQuery]);

  // =========================================================
  // SEND QUERY
  // =========================================================
  const handleSendQuery = (queryToSubmit = null) => {
    const query = (queryToSubmit ?? inputText).trim();

    if (!query || isLoading) return;

    setIsLoading(true);
    setFeedback(null);
    setIsSummary(false);

    setTimeout(() => {
      setActiveQuery(query.toLowerCase());
      setInputText("");
      setIsLoading(false);
    }, 1000);
  };

  // =========================================================
  // ENTER KEY
  // =========================================================
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendQuery();
    }
  };

  // =========================================================
  // RESET
  // =========================================================
  const handleReset = () => {
    setInputText("");
    setActiveQuery("makanan khas bali");
    setFeedback(null);
    setIsSummary(false);
    setIsLoading(false);
  };

  // =========================================================
  // NAVIGATION
  // =========================================================
  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-[#3B1E14] antialiased">
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <Navbar />

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =====================================================
            BREADCRUMB
        ====================================================== */}
        <div className="mb-5 flex items-center gap-2 text-xs text-[#78716C]">
          <button
            type="button"
            onClick={() => goTo("/")}
            className="transition hover:text-[#3B1E14]"
          >
            Beranda
          </button>

          <ChevronRight size={12} />

          <span className="font-semibold text-[#3B1E14]">
            Gastronomy AI
          </span>
        </div>

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-[#E7E1DA] bg-white">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#F7F2EC] to-transparent" />

          <div className="relative flex flex-col justify-between gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
            {/* HERO TEXT */}
            <div className="max-w-2xl">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#3B1E14] sm:text-4xl lg:text-[42px]">
                Gastronomy AI Assistant
              </h1>

              <p className="mt-3 text-sm font-medium text-[#78716C] sm:text-base">
                Tanyakan apa saja tentang gastronomi Bali.
              </p>

              <p className="mt-1 text-xs leading-relaxed text-[#78716C] sm:text-sm">
                AI kami siap membantu memberikan informasi, rekomendasi, dan
                wawasan budaya.
              </p>

              <div className="relative mt-5 h-[2px] w-40 bg-[#C98A2E]">
                <span className="absolute left-16 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-[#C98A2E] bg-white" />
              </div>
            </div>

            {/* BALI ILLUSTRATION */}
            <div className="relative flex min-h-[135px] min-w-[280px] items-center justify-center">
              <div className="absolute bottom-0 h-20 w-64 rounded-full bg-[#C98A2E]/10 blur-2xl" />

              <div className="relative flex items-end gap-1">
                <div className="relative h-32 w-20 border-x-4 border-t-4 border-[#C98A2E]/60 bg-[#C98A2E]/5">
                  <div className="absolute left-1/2 top-8 h-16 w-8 -translate-x-1/2 border border-[#C98A2E]/50" />

                  <div className="absolute -left-4 -top-8 h-10 w-16 rotate-12 border-l-4 border-t-4 border-[#C98A2E]/60" />
                </div>

                <div className="h-24 w-1 bg-[#C98A2E]/50" />

                <div className="relative h-32 w-20 border-x-4 border-t-4 border-[#C98A2E]/60 bg-[#C98A2E]/5">
                  <div className="absolute left-1/2 top-8 h-16 w-8 -translate-x-1/2 border border-[#C98A2E]/50" />

                  <div className="absolute -right-4 -top-8 h-10 w-16 -rotate-12 border-r-4 border-t-4 border-[#C98A2E]/60" />
                </div>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-xl border border-[#E7E1DA] bg-white/95 px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#C98A2E]" />

                  <div>
                    <span className="block text-[9px] text-stone-400">
                      Powered by
                    </span>

                    <span className="block text-xs font-bold text-[#3B1E14]">
                      Gastro AI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SEARCH BOX
          ================================================== */}
          <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="flex items-center rounded-2xl border border-[#E7E1DA] bg-white p-2 shadow-sm transition focus-within:border-[#C98A2E] focus-within:ring-2 focus-within:ring-[#C98A2E]/20">
              <div className="pl-3 text-[#C98A2E]">
                <Sparkles size={18} />
              </div>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Tanyakan apa saja tentang kuliner, budaya, bahan, resep, atau destinasi gastronomi..."
                className="w-full bg-transparent px-3 py-3 text-xs text-[#3B1E14] outline-none placeholder:text-stone-400 sm:text-sm"
              />

              <button
                type="button"
                onClick={() => handleSendQuery()}
                disabled={isLoading || !inputText.trim()}
                className="flex h-10 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3B1E14] text-white transition hover:bg-[#5A3828] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            SUGGESTED QUESTIONS
        ====================================================== */}
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#3B1E14] sm:text-sm">
              Pertanyaan Populer
            </h2>

            <Search size={15} className="text-stone-400" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {SUGGESTED_CHIPS?.map((chip, index) => (
              <button
                key={chip.id ?? index}
                type="button"
                onClick={() => handleSendQuery(chip.query)}
                disabled={isLoading}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-[#E7E1DA] bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-700 shadow-sm transition hover:border-[#C98A2E] hover:text-[#3B1E14] disabled:opacity-50"
              >
                <Utensils size={13} className="text-[#C98A2E]" />
                {chip.label}
              </button>
            ))}
          </div>
        </section>

        {/* =====================================================
            LOADING
        ====================================================== */}
        {isLoading && (
          <div className="mb-8 flex flex-col items-center justify-center rounded-2xl border border-[#E7E1DA] bg-white px-6 py-14 text-center shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F2EC]">
              <Sparkles
                size={25}
                className="animate-pulse text-[#C98A2E]"
              />
            </div>

            <p className="mt-4 text-sm font-bold text-[#3B1E14]">
              AI sedang mencari informasi...
            </p>

            <p className="mt-1 text-xs text-stone-400">
              Menggunakan mock data repository Gastro Pustaka
            </p>
          </div>
        )}

        {/* =====================================================
            MAIN CONTENT
            LEFT  = AI RESPONSE + RELATED ASSETS
            RIGHT = SIDEBAR
        ====================================================== */}
        {!isLoading && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {/* =================================================
                LEFT COLUMN
            ================================================== */}
            <div className="space-y-6 lg:col-span-2">
              {/* =================================================
                  AI RESPONSE
              ================================================== */}
              <section>
                <div className="rounded-2xl border border-[#E7E1DA] bg-white p-5 shadow-sm sm:p-7">
                  {/* HEADER */}
                  <div className="mb-5 flex items-center justify-between border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F2EC] text-[#C98A2E]">
                        <Sparkles size={16} />
                      </div>

                      <h2 className="font-serif text-lg font-bold text-[#3B1E14]">
                        Jawaban AI
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSummary((prev) => !prev)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#E7E1DA] bg-[#FDFBF9] px-3 py-2 text-[11px] font-semibold text-stone-700 transition hover:bg-stone-100 sm:text-xs"
                    >
                      <FileText
                        size={13}
                        className="text-[#C98A2E]"
                      />

                      {isSummary
                        ? "Tampilkan Lengkap"
                        : "Ringkas Jawaban"}
                    </button>
                  </div>

                  {/* RESPONSE */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B1E14] text-[#C98A2E]">
                      <Bot size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      {isSummary ? (
                        <div className="rounded-xl border border-[#C98A2E]/20 bg-[#F7F2EC] p-4">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#C98A2E]">
                            Ringkasan Inti
                          </p>

                          <p className="text-xs leading-6 text-[#3B1E14] sm:text-sm">
                            {currentAiData.summary}
                          </p>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-medium leading-6 text-stone-800 sm:text-sm">
                            {currentAiData.intro}
                          </p>

                          <div className="mt-5 space-y-5">
                            {currentAiData.sections?.map(
                              (section, index) => {
                                const title =
                                  section.title?.toLowerCase() || "";

                                return (
                                  <div
                                    key={section.title ?? index}
                                  >
                                    <h3 className="flex items-center gap-2 text-xs font-bold text-[#3B1E14] sm:text-sm">
                                      {title.includes("sejarah") && (
                                        <BookOpen
                                          size={15}
                                          className="text-[#C98A2E]"
                                        />
                                      )}

                                      {title.includes("budaya") && (
                                        <Users
                                          size={15}
                                          className="text-[#C98A2E]"
                                        />
                                      )}

                                      {title.includes("rasa") && (
                                        <Sparkles
                                          size={15}
                                          className="text-[#C98A2E]"
                                        />
                                      )}

                                      <span>
                                        {section.title}
                                      </span>
                                    </h3>

                                    <p className="mt-1 pl-6 text-xs leading-6 text-stone-600 sm:text-sm">
                                      {section.content}
                                    </p>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </>
                      )}

                      {/* SOURCES */}
                      <div className="mt-6 border-t border-stone-100 pt-4">
                        <p className="mb-2 text-xs font-semibold text-stone-500">
                          Sumber Informasi
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {currentAiData.sources?.map(
                            (source, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-medium text-stone-600"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#C98A2E]" />

                                {source}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* FEEDBACK */}
                      <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
                        <span className="text-xs text-stone-500">
                          Apakah jawaban ini membantu?
                        </span>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setFeedback("up")}
                            aria-label="Jawaban membantu"
                            className={`rounded-lg border p-2 transition ${
                              feedback === "up"
                                ? "border-green-400 bg-green-50 text-green-700"
                                : "border-[#E7E1DA] text-stone-500 hover:bg-stone-50"
                            }`}
                          >
                            <ThumbsUp size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setFeedback("down")}
                            aria-label="Jawaban tidak membantu"
                            className={`rounded-lg border p-2 transition ${
                              feedback === "down"
                                ? "border-red-400 bg-red-50 text-red-700"
                                : "border-[#E7E1DA] text-stone-500 hover:bg-stone-50"
                            }`}
                          >
                            <ThumbsDown size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* =================================================
                  RELATED ASSETS
              ================================================== */}
              <section className="rounded-2xl border border-[#E7E1DA] bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={16}
                      className="text-[#C98A2E]"
                    />

                    <h2 className="font-serif text-lg font-bold text-[#3B1E14]">
                      Aset Terkait
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => goTo("/explore")}
                    className="flex items-center gap-1 rounded-xl border border-[#E7E1DA] bg-[#FDFBF9] px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
                  >
                    Lihat Semua
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                  {MOCK_RELATED_ASSETS?.map((asset) => (
                    <div
                      key={asset.id}
                      className="w-56 shrink-0 rounded-xl border border-[#E7E1DA] bg-white p-2.5 transition hover:border-[#C98A2E] hover:shadow-md"
                    >
                      <img
                        src={asset.image}
                        alt={asset.title}
                        className="h-32 w-full rounded-lg object-cover"
                      />

                      <div className="mt-2.5">
                        <span className="inline-block rounded-md border border-[#C98A2E]/20 bg-[#F7F2EC] px-2 py-0.5 text-[10px] font-semibold text-[#5A3828]">
                          {asset.category}
                        </span>

                        <h4 className="mt-1.5 truncate text-xs font-bold text-[#3B1E14]">
                          {asset.title}
                        </h4>

                        <div className="mt-1 flex items-center gap-1 text-[11px] text-stone-400">
                          <MapPin
                            size={11}
                            className="text-[#C98A2E]"
                          />

                          {asset.location}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              asset.route ||
                                `/curator/submissions/${asset.id}`
                            )
                          }
                          className="mt-3 flex w-full items-center justify-between rounded-lg bg-stone-50 px-2.5 py-2 text-[11px] font-semibold text-[#3B1E14] transition hover:bg-[#3B1E14] hover:text-white"
                        >
                          <span>Lihat Detail</span>

                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================== */}
            <aside className="space-y-6">
              {/* =================================================
                  QUICK SUMMARY
              ================================================== */}
              <div className="rounded-2xl border border-[#E7E1DA] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2 border-b border-stone-100 pb-3">
                  <FileText
                    size={16}
                    className="text-[#C98A2E]"
                  />

                  <h3 className="font-serif text-base font-bold text-[#3B1E14]">
                    Ringkasan Cepat
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <SummaryRow
                    label="Jenis Hidangan"
                    value={currentAiData.quickSummary?.jenis}
                  />

                  <SummaryRow
                    label="Asal"
                    value={currentAiData.quickSummary?.asal}
                  />

                  <SummaryRow
                    label="Bahan Utama"
                    value={currentAiData.quickSummary?.bahanUtama}
                  />

                  <SummaryRow
                    label="Disajikan Dalam"
                    value={
                      currentAiData.quickSummary?.disajikanDalam
                    }
                  />

                  <SummaryRow
                    label="Rasa Dominan"
                    value={currentAiData.quickSummary?.rasaDominan}
                    last
                  />
                </div>
              </div>

              {/* =================================================
                  RELATED CATEGORIES
              ================================================== */}
              <div className="rounded-2xl border border-[#E7E1DA] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2 border-b border-stone-100 pb-3">
                  <Compass
                    size={16}
                    className="text-[#C98A2E]"
                  />

                  <h3 className="font-serif text-base font-bold text-[#3B1E14]">
                    Kategori Terkait
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentAiData.categories?.map(
                    (category, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          navigate(
                            `/explore?category=${encodeURIComponent(
                              category
                            )}`
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#E7E1DA] bg-[#FDFBF9] px-3 py-1.5 text-[11px] font-semibold text-stone-700 transition hover:border-[#C98A2E] hover:text-[#3B1E14]"
                      >
                        <Utensils
                          size={12}
                          className="text-[#C98A2E]"
                        />

                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* =================================================
                  FOLLOW UP
              ================================================== */}
              <div className="rounded-2xl border border-[#E7E1DA] bg-white p-5 shadow-sm">
                <div className="border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={16}
                      className="text-[#C98A2E]"
                    />

                    <h3 className="font-serif text-base font-bold text-[#3B1E14]">
                      Tanyakan Lebih Lanjut
                    </h3>
                  </div>

                  <p className="mt-1 text-[11px] text-stone-400">
                    Ingin bertanya lebih spesifik?
                  </p>
                </div>

                <div className="space-y-2 pt-3">
                  {currentAiData.followUpQuestions?.map(
                    (question, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSendQuery(question)}
                        disabled={isLoading}
                        className="w-full rounded-xl border border-stone-100 bg-stone-50/70 p-3 text-left text-xs font-medium leading-5 text-stone-700 transition hover:border-[#C98A2E] hover:bg-white hover:text-[#3B1E14]"
                      >
                        {question}
                      </button>
                    )
                  )}
                </div>

                <div className="mt-4 border-t border-stone-100 pt-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7E1DA] bg-white py-2.5 text-xs font-semibold text-stone-600 transition hover:bg-stone-50"
                  >
                    <RefreshCw size={13} />
                    Pertanyaan Baru
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* =====================================================
            DISCLAIMER
        ====================================================== */}
        <div className="mb-12 mt-6 flex items-start gap-3 rounded-xl border border-[#C98A2E]/20 bg-[#F7F2EC] p-3.5 text-xs leading-5 text-stone-600">
          <Info
            size={18}
            className="mt-0.5 shrink-0 text-[#C98A2E]"
          />

          <p>
            AI ini menggunakan data dari Gastro Pustaka dan sumber
            terverifikasi. Informasi dapat berubah seiring penambahan
            data baru.
          </p>
        </div>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <Footer />
    </div>
  );
}

/* ============================================================
   COMPONENT: SUMMARY ROW
============================================================ */

function SummaryRow({ label, value, last = false }) {
  return (
    <div
      className={`flex items-start justify-between gap-4 ${
        !last ? "border-b border-stone-50 pb-2" : ""
      }`}
    >
      <span className="text-stone-500">{label}</span>

      <span className="max-w-[160px] text-right font-semibold text-stone-800">
        {value || "-"}
      </span>
    </div>
  );
}