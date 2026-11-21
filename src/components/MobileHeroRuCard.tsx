import React, { useState } from 'react'
import {
  Utensils,
  Clock,
  Loader2,
  Copy,
  ExternalLink,
  RotateCcw,
} from 'lucide-react'
import type { RuTicket, ThemeMode } from '../types'
import { RU_MENU } from '../mockData'

interface MobileHeroRuCardProps {
  theme: ThemeMode
  onOpenFullVoucher: () => void
}

export const MobileHeroRuCard: React.FC<MobileHeroRuCardProps> = ({
  theme,
  onOpenFullVoucher,
}) => {
  const isDark = theme === 'dark'

  const [ticketState, setTicketState] = useState<RuTicket>({
    isGenerated: false,
    ticketId: null,
    generatedAt: null,
    validUntil: null,
    mealType: 'Almoço',
    mealTimeWindow: '11:30 - 13:30',
    studentName: 'Lucas Mendes Silva',
    registration: '20231TADS042',
    campus: 'IFSP Central',
    dietOption: 'Padrão',
    status: null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [selectedDiet, setSelectedDiet] = useState<'Padrão' | 'Vegetariano'>('Padrão')

  const handleGenerateTicket = () => {
    setIsLoading(true)
    setLoadingStep('Conectando ao módulo SUAP...')

    setTimeout(() => {
      setLoadingStep('Validando matrícula & cota...')
    }, 400)

    setTimeout(() => {
      setLoadingStep('Emitindo ticket digital...')
    }, 900)

    setTimeout(() => {
      setIsLoading(false)
      setTicketState({
        isGenerated: true,
        ticketId: 'RU-2026-8842',
        generatedAt: '10:42',
        validUntil: '13:30',
        mealType: 'Almoço',
        mealTimeWindow: '11:30 - 13:30',
        studentName: 'Lucas Mendes Silva',
        registration: '20231TADS042',
        campus: 'IFSP Central',
        dietOption: selectedDiet,
        status: 'ready',
      })
    }, 1400)
  }

  const handleCopyCode = () => {
    if (ticketState.ticketId) {
      navigator.clipboard?.writeText(ticketState.ticketId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setTicketState({
      isGenerated: false,
      ticketId: null,
      generatedAt: null,
      validUntil: null,
      mealType: 'Almoço',
      mealTimeWindow: '11:30 - 13:30',
      studentName: 'Lucas Mendes Silva',
      registration: '20231TADS042',
      campus: 'IFSP Central',
      dietOption: 'Padrão',
      status: null,
    })
  }

  return (
    <section
      className={`relative rounded-2xl border transition-colors duration-200 overflow-hidden ${
        isDark
          ? 'bg-[#121214] border-[#27272A] text-white'
          : 'bg-white border-[#E5E5EA] text-[#111111]'
      }`}
    >
      {/* 1. Giant Apple Wallet-style Watermark Icon in Background */}
      <div
        aria-hidden="true"
        className={`absolute -right-6 -bottom-6 pointer-events-none select-none transition-opacity ${isDark ? 'text-white opacity-[0.07]' : 'text-black opacity-[0.05]'}`}
      >
        <Utensils className="w-[120px] h-[120px] stroke-[1.2]" />
      </div>

      {/* Card Header */}
      <div className="p-4 sm:p-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          {/* Badge with touch of Burnt Orange #EA580C */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
              isDark
                ? 'bg-white/5 border-white/10 text-[#22C55E]'
                : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#22C55E]'
            }`}
          >
            <Utensils className="w-4.5 h-4.5 text-[#22C55E]" />
          </div>
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">
              Ticket do RU
            </h2>
            <p
              className={`text-[13px] font-medium ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              Almoço • Janela das 11:30 às 13:30
            </p>
          </div>
        </div>

        {/* Status indicator: green ONLY for active ticket */}
        {ticketState.isGenerated ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-semibold bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>Ticket Ativo</span>
          </div>
        ) : (
          <span
            className={`text-[13px] font-medium px-2.5 py-1 rounded-full ${
              isDark ? 'text-[#8E8E93] bg-white/5' : 'text-[#6E6E73] bg-[#F5F5F7]'
            }`}
          >
            Disponível
          </span>
        )}
      </div>

      {/* Hairline Divider */}
      <div
        className={`h-px w-full ${isDark ? 'bg-[#27272A]' : 'bg-[#E5E5EA]'}`}
      />

      {/* Main Body */}
      <div className="p-4 sm:p-5 space-y-4 relative z-10">
        {!ticketState.isGenerated ? (
          <>
            {/* Menu Information */}
            <div className="space-y-1.5 text-[15px] leading-relaxed">
              <div
                className={`text-[13px] font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                  isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Cardápio de Hoje</span>
              </div>
              <p>
                <span className="font-semibold">Principal:</span>{' '}
                <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#555555]'}>
                  {RU_MENU.mainDish}
                </span>
              </p>
              <p>
                <span className="font-semibold">Vegetariano:</span>{' '}
                <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#555555]'}>
                  {RU_MENU.vegetarianDish}
                </span>
              </p>
            </div>

            {/* Apple-style Segmented Control */}
            <div className="pt-1">
              <div
                className={`p-1 rounded-xl flex items-center border ${
                  isDark
                    ? 'bg-[#18181B] border-[#27272A]'
                    : 'bg-[#F5F5F7] border-[#E5E5EA]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDiet('Padrão')}
                  className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedDiet === 'Padrão'
                      ? isDark
                        ? 'bg-white text-black shadow-xs'
                        : 'bg-white text-black shadow-xs'
                      : isDark
                      ? 'text-[#8E8E93] hover:text-white'
                      : 'text-[#6E6E73] hover:text-black'
                  }`}
                >
                  Padrão (Frango)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDiet('Vegetariano')}
                  className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedDiet === 'Vegetariano'
                      ? isDark
                        ? 'bg-white text-black shadow-xs'
                        : 'bg-white text-black shadow-xs'
                      : isDark
                      ? 'text-[#8E8E93] hover:text-white'
                      : 'text-[#6E6E73] hover:text-black'
                  }`}
                >
                  Vegetariano (Lentilha)
                </button>
              </div>
            </div>

            {/* Primary Action Button (Solid Black in Light / Solid White in Dark) */}
            {isLoading ? (
              <div
                className={`h-12 w-full rounded-xl flex items-center justify-center gap-2 text-[15px] font-medium border ${
                  isDark
                    ? 'bg-[#18181B] border-[#27272A] text-white'
                    : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#111111]'
                }`}
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{loadingStep}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGenerateTicket}
                className={`h-12 w-full text-[15px] font-semibold rounded-xl transition-opacity flex items-center justify-center gap-2 cursor-pointer active:opacity-85 ${
                  isDark
                    ? 'bg-white hover:bg-neutral-100 text-black'
                    : 'bg-[#111111] hover:bg-neutral-800 text-white'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Gerar Ticket Agora</span>
              </button>
            )}
          </>
        ) : (
          /* Ticket Generated State */
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Scannable Vector QR Code */}
              <div className="p-2.5 bg-white border border-[#E5E5EA] rounded-xl shrink-0 flex flex-col items-center">
                <svg
                  width="72"
                  height="72"
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
                <span className="text-[9px] font-mono font-bold text-[#6E6E73] mt-1">
                  APROXIME
                </span>
              </div>

              {/* Information */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] font-semibold tabular-nums">
                    {ticketState.ticketId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className={`text-[13px] font-medium flex items-center gap-1 cursor-pointer transition-opacity ${
                      copied ? 'text-[#10B981]' : isDark ? 'text-white' : 'text-[#111111]'
                    }`}
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>

                <div
                  className={`text-[13px] leading-relaxed ${
                    isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                  }`}
                >
                  <p>Lucas Mendes Silva</p>
                  <p className="font-mono tabular-nums">20231TADS042</p>
                  <p>Opção: <strong className={isDark ? 'text-white' : 'text-black'}>{ticketState.dietOption}</strong></p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onOpenFullVoucher}
                className={`h-11 flex-1 text-[13px] font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-white'
                    : 'bg-[#F5F5F7] hover:bg-[#E5E5EA] border-[#E5E5EA] text-[#111111]'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver Comprovante</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Emitir novamente"
                className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-white'
                    : 'bg-[#F5F5F7] hover:bg-[#E5E5EA] border-[#E5E5EA] text-[#111111]'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
