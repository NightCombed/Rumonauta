import React from 'react'
import { Clock, MapPin } from 'lucide-react'
import { TODAY_CLASSES } from '../mockData'
import type { ThemeMode } from '../types'

interface MobileScheduleCardProps {
  theme: ThemeMode
}

export const MobileScheduleCard: React.FC<MobileScheduleCardProps> = ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <section
      className={`relative pl-4 py-2 border-l-[3px] transition-colors duration-200 overflow-hidden ${
        isDark ? 'border-white text-white' : 'border-[#111111] text-[#111111]'
      }`}
    >
      {/* Giant Clock Watermark Icon */}
      <div
        aria-hidden="true"
        className={`absolute -right-4 -bottom-4 pointer-events-none select-none transition-opacity ${isDark ? 'text-white opacity-[0.06]' : 'text-black opacity-[0.04]'}`}
      >
        <Clock className="w-[120px] h-[120px] stroke-[1.2]" />
      </div>

      <div className="relative z-10 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
            <h2 className="text-[18px] font-semibold tracking-tight">
              Aulas de Hoje
            </h2>
            <span
              className={`text-[13px] font-medium ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              • Sexta-feira
            </span>
          </div>

          <span
            className={`text-[13px] font-mono tabular-nums ${
              isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
            }`}
          >
            20 Nov
          </span>
        </div>

        {/* Grouped Inset List */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark
              ? 'bg-[#121214] border-[#27272A]'
              : 'bg-white border-[#E5E5EA]'
          }`}
        >
          <div className={`divide-y ${isDark ? 'divide-[#27272A]' : 'divide-[#E5E5EA]'}`}>
            {TODAY_CLASSES.map((item, idx) => {
              const isDone = item.status === 'done'
              const isCurrent = item.status === 'current'

              return (
                <div
                  key={idx}
                  className="px-4 py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[13px] font-semibold tabular-nums">
                        {item.time}
                      </span>
                      {isCurrent && (
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                            isDark
                              ? 'bg-white text-black border-white'
                              : 'bg-[#111111] text-white border-[#111111]'
                          }`}
                        >
                          Agora
                        </span>
                      )}
                      {isDone && (
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            isDark ? 'text-[#8E8E93] bg-white/5' : 'text-[#6E6E73] bg-[#F5F5F7]'
                          }`}
                        >
                          Concluída
                        </span>
                      )}
                    </div>

                    <div className="text-[15px] font-medium truncate">
                      {item.subject}{' '}
                      <span
                        className={`text-[13px] font-mono ${
                          isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                        }`}
                      >
                        ({item.code})
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 text-[13px] ${
                        isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.room}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block animate-pulse" />
                    ) : (
                      <Clock
                        className={`w-4 h-4 ${
                          isDark ? 'text-[#8E8E93]' : 'text-[#8E8E93]'
                        }`}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
