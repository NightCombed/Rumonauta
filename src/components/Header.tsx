import React from 'react'
import { SailboatLogo } from './SailboatLogo'
import { Bell, Search, ShieldCheck } from 'lucide-react'

interface HeaderProps {
  onOpenCopilot?: () => void
  unreadNotificationsCount?: number
  onToggleSidebar?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  unreadNotificationsCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Nautical Identity */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md flex items-center justify-center">
            <SailboatLogo size={36} accentColor="#22C55E" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[#0F172A]">
                Rumonauta
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-[#F1F5F9] text-[#64748B] rounded border border-[#E2E8F0]">
                IFSP • TADS
              </span>
            </div>
            <p className="text-xs text-[#64748B] hidden sm:block">
              Navegação e copiloto acadêmico integrado
            </p>
          </div>
        </div>

        {/* Center / Search bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Buscar matérias, atividades da tripulação, notas... (Ctrl+K)"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-9 pr-12 py-1.5 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#22C55E] focus:bg-white transition"
              readOnly
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#94A3B8] bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Actions: SUAP Sync + Notifications + Profile */}
        <div className="flex items-center gap-3">
          {/* SUAP OAuth2 Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-xs font-medium text-[#0F172A]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[#0F172A] font-semibold text-[11px]">SUAP</span>
            <span className="text-[#64748B] text-[11px]">OAuth2 ativo</span>
          </div>

          {/* Notifications */}
          <button
            title="Notificações acadêmicas"
            className="relative p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] rounded-lg transition"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* User Mini Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#E2E8F0]">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-semibold text-xs tracking-wide">
              LM
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-[#0F172A] leading-tight">
                Lucas Silva
              </div>
              <div className="text-[11px] text-[#64748B] font-mono leading-tight">
                20231TADS042
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
