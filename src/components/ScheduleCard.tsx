import React from 'react'
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react'
import { TODAY_CLASSES } from '../mockData'

export const ScheduleCard: React.FC = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-none transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
            <Calendar className="w-5 h-5 text-[#0F172A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#0F172A] tracking-tight">
                Navegação do Dia
              </h2>
              <span className="text-[10px] font-semibold bg-[#F1F5F9] text-[#64748B] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                Sexta-feira
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Horários e salas sincronizados com o diário acadêmico
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-[#64748B]">
          3 aulas hoje
        </span>
      </div>

      {/* Timeline items */}
      <div className="space-y-3">
        {TODAY_CLASSES.map((item, idx) => {
          const isDone = item.status === 'done'
          const isCurrent = item.status === 'current'

          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border transition ${
                isCurrent
                  ? 'bg-white border-[#4F46E5] ring-1 ring-[#4F46E5]/20'
                  : isDone
                  ? 'bg-[#F8FAFC] border-[#E2E8F0] opacity-70'
                  : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#0F172A]">
                      {item.time}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-semibold text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE] px-1.5 py-0.2 rounded">
                        Em andamento
                      </span>
                    )}
                    {isDone && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                        Concluída
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-[#0F172A]">
                    {item.subject}{' '}
                    <span className="text-[11px] font-normal text-[#64748B]">
                      ({item.code})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                    <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>{item.room}</span>
                  </div>
                </div>

                <div className="text-right">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] animate-ping" />
                  ) : (
                    <Clock className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
