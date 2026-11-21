import React from 'react'
import { X, Printer, Utensils } from 'lucide-react'
import type { ThemeMode } from '../types'

interface RuModalProps {
  isOpen: boolean
  onClose: () => void
  theme?: ThemeMode
}

export const RuModal: React.FC<RuModalProps> = ({
  isOpen,
  onClose,
  theme = 'light',
}) => {
  if (!isOpen) return null
  const isDark = theme === 'dark'

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className={`rounded-2xl max-w-sm w-full p-5 border shadow-2xl animate-in zoom-in-95 ${
          isDark
            ? 'bg-[#121214] border-[#27272A] text-white'
            : 'bg-white border-[#E5E5EA] text-[#111111]'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 mb-3.5 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            <h3 className="text-[16px] font-bold tracking-tight">
              Comprovante de Refeição
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8E8E93] hover:text-white rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Voucher */}
        <div
          className={`border rounded-xl p-4 text-center space-y-3 ${
            isDark
              ? 'bg-[#18181B] border-[#27272A]'
              : 'bg-[#F5F5F7] border-[#E5E5EA]'
          }`}
        >
          <div className="flex items-center justify-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-[#10B981] border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              Autenticado pelo SUAP
            </span>
          </div>

          <div>
            <div className="text-[18px] font-bold">Lucas Mendes Silva</div>
            <div className="text-[13px] font-mono text-[#8E8E93] tabular-nums">
              20231TADS042 • IFSP Central
            </div>
          </div>

          {/* QR Code */}
          <div className="p-3 bg-white border border-[#E5E5EA] rounded-xl inline-block">
            <svg
              width="120"
              height="120"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <rect x="6" y="6" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
              <rect x="12" y="12" width="12" height="12" fill="currentColor" />
              <rect x="66" y="6" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
              <rect x="72" y="12" width="12" height="12" fill="currentColor" />
              <rect x="6" y="66" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
              <rect x="12" y="72" width="12" height="12" fill="currentColor" />
              <rect x="36" y="6" width="6" height="6" fill="currentColor" />
              <rect x="48" y="6" width="6" height="6" fill="currentColor" />
              <rect x="36" y="18" width="6" height="12" fill="currentColor" />
              <rect x="48" y="24" width="6" height="6" fill="currentColor" />
              <rect x="6" y="36" width="6" height="6" fill="currentColor" />
              <rect x="18" y="36" width="12" height="6" fill="currentColor" />
              <rect x="36" y="36" width="24" height="6" fill="currentColor" />
              <rect x="66" y="36" width="6" height="12" fill="currentColor" />
              <rect x="78" y="36" width="12" height="6" fill="currentColor" />
              <rect x="6" y="48" width="12" height="6" fill="currentColor" />
              <rect x="24" y="48" width="6" height="6" fill="currentColor" />
              <rect x="42" y="48" width="12" height="12" fill="currentColor" />
              <rect x="60" y="48" width="6" height="6" fill="currentColor" />
              <rect x="78" y="48" width="12" height="6" fill="currentColor" />
              <rect x="36" y="66" width="12" height="6" fill="currentColor" />
              <rect x="54" y="66" width="6" height="12" fill="currentColor" />
              <rect x="72" y="66" width="18" height="6" fill="currentColor" />
              <rect x="36" y="78" width="6" height="12" fill="currentColor" />
              <rect x="48" y="84" width="12" height="6" fill="currentColor" />
              <rect x="66" y="78" width="6" height="12" fill="currentColor" />
              <rect x="78" y="84" width="12" height="6" fill="currentColor" />
            </svg>
            <div className="text-[11px] font-mono font-bold text-black mt-1 tabular-nums">
              #RU-2026-8842
            </div>
          </div>

          <div
            className={`text-left text-[13px] space-y-1 p-2.5 rounded-xl border ${
              isDark ? 'bg-[#121214] border-[#27272A]' : 'bg-white border-[#E5E5EA]'
            }`}
          >
            <div className="flex justify-between">
              <span className={isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}>Refeição:</span>
              <span className="font-semibold">Almoço Hoje</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}>Horário:</span>
              <span className="font-mono tabular-nums font-semibold">11:30 às 13:30</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}>Local:</span>
              <span>Catraca 02 - Central</span>
            </div>
          </div>
        </div>

        <div className="mt-3.5 flex gap-2">
          <button
            onClick={() => window.print()}
            className={`flex-1 h-11 text-[13px] font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition cursor-pointer ${
              isDark
                ? 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-white'
                : 'bg-[#F5F5F7] hover:bg-[#E5E5EA] border-[#E5E5EA] text-[#111111]'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
          <button
            onClick={onClose}
            className={`h-11 px-5 rounded-xl text-[13px] font-semibold transition cursor-pointer ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-100'
                : 'bg-[#111111] text-white hover:bg-neutral-800'
            }`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
