import React, { useState } from 'react'
import {
  GraduationCap,
  AlertCircle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import type { Subject } from '../types'

interface AcademicSummaryCardProps {
  subjects: Subject[]
  onSelectSubject?: (subject: Subject) => void
}

export const AcademicSummaryCard: React.FC<AcademicSummaryCardProps> = ({
  subjects,
  onSelectSubject,
}) => {
  const [selectedSubjectModal, setSelectedSubjectModal] = useState<Subject | null>(null)

  const handleOpenDetail = (sub: Subject) => {
    setSelectedSubjectModal(sub)
    if (onSelectSubject) onSelectSubject(sub)
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-none transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
            <GraduationCap className="w-5 h-5 text-[#0F172A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#0F172A] tracking-tight">
                Resumo Acadêmico
              </h2>
              <span className="text-[10px] font-semibold bg-[#F1F5F9] text-[#64748B] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                Diário Oficial SUAP
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Semestre 2026.2 • Médias, presenças e teto de faltas
            </p>
          </div>
        </div>

        {/* Global Average Pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <TrendingUp className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span className="text-xs text-[#64748B]">IRA / Coeficiente:</span>
          <span className="text-xs font-bold font-mono text-[#0F172A]">7.98</span>
        </div>
      </div>

      {/* Table-like clean cards grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              <th className="pb-2.5 font-semibold">Componente Curricular</th>
              <th className="pb-2.5 font-semibold text-center w-24">Média Atual</th>
              <th className="pb-2.5 font-semibold text-center w-36">Frequência</th>
              <th className="pb-2.5 font-semibold text-right w-36">Faltas / Limite</th>
              <th className="pb-2.5 text-right w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs">
            {subjects.map((sub) => {
              const isWarning = sub.status === 'warning'

              return (
                <tr
                  key={sub.id}
                  onClick={() => handleOpenDetail(sub)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  {/* Subject Name & Teacher */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] px-1.5 py-0.5 rounded">
                        {sub.code}
                      </span>
                      <div>
                        <div className="font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
                          {sub.name}
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          {sub.professor}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Current Average */}
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`inline-block font-mono font-bold text-xs px-2 py-0.5 rounded ${
                        sub.average >= 7.0
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : sub.average >= 6.0
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {sub.average.toFixed(1)}
                    </span>
                  </td>

                  {/* Attendance Percentage & Progress Bar */}
                  <td className="py-3 px-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="text-[#64748B]">Presença:</span>
                        <span
                          className={`font-semibold ${
                            sub.attendancePct < 75
                              ? 'text-rose-600'
                              : isWarning
                              ? 'text-amber-700'
                              : 'text-[#0F172A]'
                          }`}
                        >
                          {sub.attendancePct.toFixed(1)}%
                        </span>
                      </div>
                      {/* Minimalist fine progress bar */}
                      <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isWarning ? 'bg-amber-500' : 'bg-[#4F46E5]'
                          }`}
                          style={{ width: `${Math.min(sub.attendancePct, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Absences / Limit Count */}
                  <td className="py-3 pl-2 text-right">
                    <div className="inline-flex flex-col items-end">
                      <div className="font-mono text-xs font-semibold text-[#0F172A] flex items-center gap-1">
                        {isWarning && (
                          <span
                            title="Atenção: próximo ao limite de reprovação por falta!"
                            className="inline-flex items-center text-amber-600"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <span className={isWarning ? 'text-amber-700 font-bold' : ''}>
                          {sub.absences}
                        </span>
                        <span className="text-[#94A3B8]">/ {sub.maxAbsences} max</span>
                      </div>
                      <span className="text-[10px] text-[#64748B]">
                        {sub.maxAbsences - sub.absences}h de margem
                      </span>
                    </div>
                  </td>

                  {/* Chevron arrow */}
                  <td className="py-3 pl-2 text-right">
                    <ChevronRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#4F46E5] transition" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Modal if a subject is clicked */}
      {selectedSubjectModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl max-w-md w-full p-5 shadow-none animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-[#E2E8F0] mb-4">
              <div>
                <span className="text-[10px] font-mono font-semibold bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] px-1.5 py-0.5 rounded">
                  {selectedSubjectModal.code}
                </span>
                <h3 className="text-base font-bold text-[#0F172A] mt-1">
                  {selectedSubjectModal.name}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {selectedSubjectModal.professor}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubjectModal(null)}
                className="text-[#94A3B8] hover:text-[#0F172A] p-1 text-sm rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Grades list breakdown */}
            <div className="space-y-3 mb-5">
              <div className="text-xs font-semibold text-[#0F172A]">
                Avaliações Registradas no SUAP:
              </div>
              <div className="space-y-2">
                {selectedSubjectModal.grades.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-medium text-[#0F172A]">{g.name}</div>
                      <div className="text-[10px] text-[#64748B]">
                        Peso: {g.weight * 100}% da média final
                      </div>
                    </div>
                    <div>
                      {g.grade !== null ? (
                        <span className="font-mono font-bold text-xs px-2 py-0.5 bg-white border border-[#E2E8F0] text-[#0F172A] rounded">
                          {g.grade.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#94A3B8] italic">
                          Aguardando aplicação
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Attendance warning breakdown if applicable */}
              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Carga Horária Total:</span>
                  <span className="font-mono text-[#0F172A]">{selectedSubjectModal.workloadHours} horas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Faltas Registradas:</span>
                  <span className="font-mono font-semibold text-[#0F172A]">
                    {selectedSubjectModal.absences} horas (limite: {selectedSubjectModal.maxAbsences}h)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Próxima Aula:</span>
                  <span className="text-[#0F172A] font-medium">{selectedSubjectModal.nextClass}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedSubjectModal(null)}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-medium py-2 rounded-lg transition cursor-pointer"
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
