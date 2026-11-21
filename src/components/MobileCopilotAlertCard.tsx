import React from 'react'
import {
  Compass,
  ArrowRight,
} from 'lucide-react'
import type { ThemeMode } from '../types'

interface MobileCopilotAlertCardProps {
  theme: ThemeMode
  onOpenChat: () => void
  onQuickPrompt: (prompt: string) => void
}

export const MobileCopilotAlertCard: React.FC<MobileCopilotAlertCardProps> = ({
  theme,
  onOpenChat,
  onQuickPrompt,
}) => {
  const isDark = theme === 'dark'

  return (
    <section
      className={`relative pl-4 py-2 border-l-[3px] transition-colors duration-200 overflow-hidden ${
        isDark ? 'border-white text-white' : 'border-[#111111] text-[#111111]'
      }`}
    >
      {/* 1. Giant Watermark Icon in Background (Apple Wallet Style) */}
      <div
        aria-hidden="true"
        className={`absolute -right-4 -bottom-4 pointer-events-none select-none transition-opacity ${isDark ? 'text-white opacity-[0.06]' : 'text-black opacity-[0.04]'}`}
      >
        <Compass className="w-[120px] h-[120px] stroke-[1.2]" />
      </div>

      <div className="relative z-10 space-y-3">
        {/* Header with touch of Burnt Orange #EA580C on the dot indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Laranja Queimado #EA580C dot indicator */}
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
            <h2 className="text-[18px] font-semibold tracking-tight">
              Copiloto
            </h2>
            <span
              className={`text-[13px] font-medium ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              • Rota Ativa
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenChat}
            className={`text-[13px] font-semibold flex items-center gap-1 hover:underline cursor-pointer ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}
          >
            <span>Conversar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial Text (15px font, leading-relaxed, surgical red on 14/18) */}
        <p
          className={`text-[15px] font-normal leading-relaxed pr-6 ${
            isDark ? 'text-[#E4E4E7]' : 'text-[#27272A]'
          }`}
        >
          Cuidado com Cálculo I: você tem{' '}
          <span className="font-semibold text-[#EF4444] tabular-nums">
            14/18 faltas
          </span>
          . Priorize a lista de Física II que vence amanhã.
        </p>

        {/* Quick Conversational Suggestion Balloons/Bubbles (Apple / Assistant style) */}
        <div className="flex flex-wrap gap-2 pt-0.5">
          <button
            type="button"
            onClick={() => onQuickPrompt('O que devo estudar hoje?')}
            className={`text-[13px] font-medium px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#121214] hover:bg-[#1E1E22] border-[#27272A] text-white shadow-xs'
                : 'bg-white hover:bg-[#F5F5F7] border-[#E5E5EA] text-[#111111] shadow-xs'
            }`}
          >
            💬 O que devo estudar hoje?
          </button>
          <button
            type="button"
            onClick={() => onQuickPrompt('Como estão minhas faltas?')}
            className={`text-[13px] font-medium px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#121214] hover:bg-[#1E1E22] border-[#27272A] text-white shadow-xs'
                : 'bg-white hover:bg-[#F5F5F7] border-[#E5E5EA] text-[#111111] shadow-xs'
            }`}
          >
            📊 Como estão minhas faltas?
          </button>
        </div>
      </div>
    </section>
  )
}
