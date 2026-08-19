import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Layers,
  Users,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function CuratorSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const workspaceNav = [
    { name: 'Dashboard', path: '/curator', icon: LayoutDashboard, end: true },
    { name: 'Review Submission', path: '/curator/reviews', icon: ClipboardCheck },
    { name: 'Published Assets', path: '/curator/published-assets', icon: Layers },
    { name: 'Contributors', path: '/curator/contributors', icon: Users }
  ];

  const managementNav = [
    { name: 'Settings', path: '/curator/settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-[#3B1E14] px-4 py-3 text-[#FDFBF9] border-b border-white/10 md:hidden">
        <div className="flex items-center gap-2">
          <span className="font-serif text-base font-bold tracking-wider text-[#FDFBF9]">
            GASTRO PUSTAKA
          </span>
          <span className="text-[10px] font-semibold tracking-widest text-[#D8B27C] uppercase">
            Curator
          </span>
        </div>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle Navigation"
          className="rounded-lg p-2 text-[#D8C2A8] hover:bg-white/10 hover:text-white transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Backdrop Drawer */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-[260px] flex-col justify-between bg-[#3B1E14] text-[#FDFBF9] border-r border-white/10 shadow-2xl transition-transform duration-300 ease-in-out md:sticky md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-5 py-6 no-scrollbar">
          
          {/* BRAND HEADER */}
          <div className="flex flex-col items-center text-center">
            {/* Balinese Candi Bentar Icon Illustration */}
            <div className="mb-2 text-[#D8B27C]">
              <svg width="64" height="42" viewBox="0 0 100 65" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 20,60 L 20,25 L 35,12 L 46,12 L 46,60 M 80,60 L 80,25 L 65,12 L 54,12 L 54,60" />
                <path d="M 32,12 L 32,60 M 68,12 L 68,60" strokeDasharray="3 3" strokeWidth="1.5" />
                <path d="M 12,60 L 88,60" />
                <circle cx="50" cy="35" r="7" strokeWidth="1.8" />
                <path d="M 46,35 L 54,35 M 50,31 L 50,39" strokeWidth="1.5" />
              </svg>
            </div>

            <h1 className="font-serif text-xl font-extrabold tracking-wider text-[#FDFBF9]">
              GASTRO PUSTAKA
            </h1>
            <p className="mt-1 text-[10px] font-bold tracking-[0.25em] text-[#D8B27C] uppercase">
              Curator Panel
            </p>

            {/* Balinese Ornate Divider */}
            <div className="relative my-5 flex w-full items-center justify-center">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute h-2 w-2 rotate-45 border border-[#D8B27C] bg-[#3B1E14]" />
            </div>
          </div>

          {/* WORKSPACE SECTION */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2 px-3 text-[11px] font-bold tracking-widest text-[#D8B27C] uppercase">
              <LayoutDashboard size={14} className="text-[#D8B27C]" />
              <span>Workspace</span>
            </div>

            <nav className="space-y-1.5">
              {workspaceNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-[#6B3F25] text-white shadow-md shadow-black/20'
                          : 'text-[#D8C2A8] hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          className={`transition-colors ${
                            isActive ? 'text-[#D8B27C]' : 'text-[#D8C2A8]'
                          }`}
                        />
                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* MANAGEMENT SECTION */}
          <div>
            {/* Divider */}
            <div className="relative my-4 flex w-full items-center justify-center">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute h-1.5 w-1.5 rotate-45 border border-[#D8B27C]/60 bg-[#3B1E14]" />
            </div>

            <div className="mb-3 flex items-center gap-2 px-3 text-[11px] font-bold tracking-widest text-[#D8B27C] uppercase">
              <Settings size={14} className="text-[#D8B27C]" />
              <span>Management</span>
            </div>

            <nav className="space-y-1.5">
              {managementNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-[#6B3F25] text-white shadow-md shadow-black/20'
                          : 'text-[#D8C2A8] hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          className={`transition-colors ${
                            isActive ? 'text-[#D8B27C]' : 'text-[#D8C2A8]'
                          }`}
                        />
                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* BOTTOM SECTION: PROFILE CARD & LOGOUT */}
        <div className="border-t border-white/10 p-4 space-y-3 bg-[#331910]/40">
          
          {/* CURATOR PROFILE CARD */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-3.5 shadow-xs">
            {/* Decorative background watermark */}
            <div className="pointer-events-none absolute -right-3 -bottom-3 opacity-10 text-[#D8B27C]">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0 Z" />
              </svg>
            </div>

            <div className="flex items-center gap-3">
              {/* Balinese Udeng Avatar Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8B27C]/40 bg-[#D8C2A8]/20 text-[#D8B27C]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
                  <path d="M4 11c0 3 2.5 5 5 5h6c2.5 0 5-2 5-5" />
                  <path d="M6 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
                  <path d="M8 5c2-1 6-1 8 0" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">
                  Pakar Gastronomi
                </p>
                <p className="text-[11px] text-[#D8C2A8]">Curator</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                  <ShieldCheck size={12} className="shrink-0 text-emerald-400" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-[#D8C2A8] transition-all duration-200 hover:border-rose-500/30 hover:bg-rose-950/40 hover:text-rose-200 active:scale-98"
          >
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}