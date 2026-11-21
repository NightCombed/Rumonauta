import React, { useState } from 'react'
import { AlertCircle, GraduationCap, X } from 'lucide-react'
import type { Subject, ThemeMode } from '../types'

interface MobileAcademicScreenProps {
  theme: ThemeMode
  subjects: Subject[]
}

export const MobileAcademicScreen: React.FC<MobileAcademicScreenProps> = ({
  theme,
  subjects,
}) => {
  const isDark = theme === 'dark'
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Open Header Section with 3px bar and GraduationCap watermark */}
      <section
        className={`relative pl-4 py-2 border-l-[3px] transition-colors duration-200 overflow-hidden ${
          isDark ? 'border-white text-white' : 'border-[#111111] text-[#111111]'
        }`}
      >
        {/* Giant GraduationCap Watermark Icon (Apple Wallet style) */}
        <div
          aria-hidden="true"
          className={`absolute -right-4 -bottom-4 pointer-events-none select-none transition-opacity ${isDark ? 'text-white opacity-[0.06]' : 'text-black opacity-[0.04]'}`}
        >
          <GraduationCap className="w-[120px] h-[120px] stroke-[1.2]" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
            <div>
              <h2 className="text-[20px] font-bold tracking-tight">
                Boletim SUAP
              </h2>
              <p
                className={`text-[13px] font-medium ${
                  isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                }`}
              >
                Semestre 2026.2 • {subjects.length} disciplinas
              </p>
            </div>
          </div>

          <div className="text-right">
            <span
              className={`text-[11px] font-medium uppercase tracking-wider block ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              IRA Geral
            </span>
            <span className="text-[22px] font-mono font-bold tabular-nums tracking-tight">
              7.98
            </span>
          </div>
        </div>
      </section>

      {/* 2-Column Minimalist Grid of Academic Subjects */}
      <div className="grid grid-cols-2 gap-3">
        {subjects.map((sub) => {
          const absenceRatio = sub.absences / sub.maxAbsences
          const isNearLimit = absenceRatio >= 0.75 || sub.status === 'warning'

          return (
            <div
              key={sub.id}
              onClick={() => setSelectedSubject(sub)}
              className={`rounded-2xl border p-4 flex flex-col justify-between transition-all cursor-pointer active:scale-[0.98] ${
                isDark
                  ? 'bg-[#121214] border-[#27272A] hover:border-[#3F3F46] text-white'
                  : 'bg-white border-[#E5E5EA] hover:border-[#C7C7CC] text-[#111111]'
              }`}
            >
              {/* Card Top: Code badge and status */}
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                      isDark
                        ? 'bg-white/8 text-[#A1A1AA]'
                        : 'bg-[#F5F5F7] text-[#555555]'
                    }`}
                  >
                    {sub.code}
                  </span>

                  {isNearLimit && (
                    <span
                      title="Limite de faltas próximo"
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#22C55E]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  )}
                </div>

                {/* Subject Name */}
                <h3 className="text-[14px] font-semibold leading-tight line-clamp-2 mt-2.5 mb-1 tracking-tight">
                  {sub.name}
                </h3>
                <p
                  className={`text-[12px] truncate ${
                    isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                  }`}
                >
                  {sub.professor}
                </p>
              </div>

              {/* Card Bottom: Big 24px Bold Grade & Thin Absence Bar */}
              <div className="mt-4 pt-3 border-t border-black/5 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span
                    className={`text-[11px] font-medium uppercase tracking-wider ${
                      isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                    }`}
                  >
                    Média
                  </span>
                  <span className="text-[24px] font-mono font-bold tabular-nums tracking-tight">
                    {sub.average.toFixed(1)}
                  </span>
                </div>

                {/* Thin Absences Progress Bar (turns #22C55E when near limit) */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-mono tabular-nums">
                    <span className={isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}>
                      Faltas
                    </span>
                    <span
                      className={`font-semibold ${
                        isNearLimit
                          ? 'text-[#22C55E]'
                          : isDark
                          ? 'text-[#8E8E93]'
                          : 'text-[#6E6E73]'
                      }`}
                    >
                      {sub.absences}/{sub.maxAbsences}
                    </span>
                  </div>

                  <div
                    className={`h-1.5 w-full rounded-full overflow-hidden ${
                      isDark ? 'bg-[#27272A]' : 'bg-[#E5E5EA]'
                    }`}
                  >
                    <div
                      className={`h-full rounded-full transition-all ${
                        isNearLimit
                          ? 'bg-[#22C55E]'
                          : isDark
                          ? 'bg-white'
                          : 'bg-[#111111]'
                      }`}
                      style={{
                        width: `${Math.min((sub.absences / sub.maxAbsences) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`rounded-2xl max-w-sm w-full p-5 border shadow-2xl animate-in zoom-in-95 ${
              isDark
                ? 'bg-[#121214] border-[#27272A] text-white'
                : 'bg-white border-[#E5E5EA] text-[#111111]'
            }`}
          >
            <div className="flex items-start justify-between pb-3 border-b border-black/10 mb-3.5">
              <div>
                <span className="text-[11px] font-mono font-semibold text-[#8E8E93]">
                  {selectedSubject.code}
                </span>
                <h3 className="text-[18px] font-bold mt-0.5">{selectedSubject.name}</h3>
                <p className="text-[13px] text-[#8E8E93]">{selectedSubject.professor}</p>
              </div>
              <button
                onClick={() => setSelectedSubject(null)}
                className="p-1 text-[#8E8E93] hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Composição de Notas
              </div>
              {selectedSubject.grades.map((g, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between text-[13px] ${
                    isDark
                      ? 'bg-black/30 border-[#27272A]'
                      : 'bg-[#F5F5F7] border-[#E5E5EA]'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{g.name}</div>
                    <div className="text-[11px] text-[#8E8E93]">Peso: {g.weight * 100}%</div>
                  </div>
                  <div>
                    {g.grade !== null ? (
                      <span className="font-mono font-bold tabular-nums text-[15px]">
                        {g.grade.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-[#8E8E93] italic">Pendente</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedSubject(null)}
              className={`h-11 w-full rounded-xl text-[13px] font-semibold transition cursor-pointer ${
                isDark
                  ? 'bg-white text-black hover:bg-neutral-100'
                  : 'bg-[#111111] text-white hover:bg-neutral-800'
              }`}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
