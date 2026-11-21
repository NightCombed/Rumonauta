import React, { useState } from 'react'
import {
  Plus,
  Check,
  Clock,
  Trash2,
  Calendar,
} from 'lucide-react'
import type { Activity, ThemeMode } from '../types'

interface MobileCrewScreenProps {
  theme: ThemeMode
  activities: Activity[]
  onToggleActivity: (id: string) => void
  onOpenAddModal: () => void
  onDeleteActivity: (id: string) => void
}

export const MobileCrewScreen: React.FC<MobileCrewScreenProps> = ({
  theme,
  activities,
  onToggleActivity,
  onOpenAddModal,
  onDeleteActivity,
}) => {
  const isDark = theme === 'dark'
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  const filtered = activities.filter((act) => {
    if (filter === 'pending') return !act.completed
    if (filter === 'completed') return act.completed
    return true
  })

  const pendingCount = activities.filter((a) => !a.completed).length
  const completedCount = activities.filter((a) => a.completed).length

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Open Header Section with 3px bar and watermark */}
      <section
        className={`relative pl-4 py-2 border-l-[3px] transition-colors duration-200 overflow-hidden ${
          isDark ? 'border-white text-white' : 'border-[#111111] text-[#111111]'
        }`}
      >
        {/* Giant Calendar Watermark Icon (Apple Wallet style) */}
        <div
          aria-hidden="true"
          className={`absolute -right-4 -bottom-4 pointer-events-none select-none transition-opacity ${isDark ? 'text-white opacity-[0.06]' : 'text-black opacity-[0.04]'}`}
        >
          <Calendar className="w-[120px] h-[120px] stroke-[1.2]" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
            <div>
              <h2 className="text-[20px] font-bold tracking-tight">
                Mapa da Tripulação
              </h2>
              <p
                className={`text-[13px] font-medium ${
                  isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                }`}
              >
                {pendingCount} pendente{pendingCount !== 1 ? 's' : ''} • {completedCount} concluída{completedCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAddModal}
            className={`h-9 px-3.5 rounded-xl text-[13px] font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-100'
                : 'bg-[#111111] text-white hover:bg-neutral-800'
            }`}
          >
            <Plus className="w-4 h-4 text-[#22C55E]" />
            <span>Nova</span>
          </button>
        </div>
      </section>

      {/* Segmented Filter Control */}
      <div
        className={`p-1 rounded-xl flex items-center border ${
          isDark
            ? 'bg-[#121214] border-[#27272A]'
            : 'bg-[#F5F5F7] border-[#E5E5EA]'
        }`}
      >
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
            filter === 'all'
              ? isDark
                ? 'bg-white text-black shadow-xs'
                : 'bg-white text-black shadow-xs'
              : isDark
              ? 'text-[#8E8E93] hover:text-white'
              : 'text-[#6E6E73] hover:text-black'
          }`}
        >
          Todas ({activities.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('pending')}
          className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
            filter === 'pending'
              ? isDark
                ? 'bg-white text-black shadow-xs'
                : 'bg-white text-black shadow-xs'
              : isDark
              ? 'text-[#8E8E93] hover:text-white'
              : 'text-[#6E6E73] hover:text-black'
          }`}
        >
          Pendentes ({pendingCount})
        </button>
        <button
          type="button"
          onClick={() => setFilter('completed')}
          className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
            filter === 'completed'
              ? isDark
                ? 'bg-white text-black shadow-xs'
                : 'bg-white text-black shadow-xs'
              : isDark
              ? 'text-[#8E8E93] hover:text-white'
              : 'text-[#6E6E73] hover:text-black'
          }`}
        >
          Feitas ({completedCount})
        </button>
      </div>

      {/* Clean Apple Reminders-style list */}
      <section
        className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
          isDark
            ? 'bg-[#121214] border-[#27272A] text-white'
            : 'bg-white border-[#E5E5EA] text-[#111111]'
        }`}
      >
        <div className={`divide-y ${isDark ? 'divide-[#27272A]' : 'divide-[#E5E5EA]'}`}>
          {filtered.length === 0 ? (
            <div
              className={`p-8 text-center text-[13px] font-medium ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              Nenhuma atividade encontrada neste filtro.
            </div>
          ) : (
            filtered.map((act) => (
              <div
                key={act.id}
                className="px-4 py-3.5 flex items-start gap-3.5 transition-colors group"
              >
                {/* Large circular checkbox */}
                <button
                  type="button"
                  onClick={() => onToggleActivity(act.id)}
                  aria-label={act.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                  className="mt-0.5 shrink-0 cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      act.completed
                        ? isDark
                          ? 'bg-white border-white text-black'
                          : 'bg-[#111111] border-[#111111] text-white'
                        : isDark
                        ? 'border-[#3F3F46] hover:border-[#71717A]'
                        : 'border-[#C7C7CC] hover:border-[#8E8E93]'
                    }`}
                  >
                    {act.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[15px] font-medium leading-snug break-words ${
                      act.completed
                        ? 'line-through text-[#8E8E93]'
                        : isDark
                        ? 'text-white'
                        : 'text-[#111111]'
                    }`}
                  >
                    {act.title}
                  </p>

                  <div
                    className={`flex items-center gap-2 mt-1 text-[13px] font-medium flex-wrap ${
                      isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                    }`}
                  >
                    {/* Subject badge */}
                    <span
                      className={`text-[11px] font-semibold px-1.5 py-0.5 rounded font-mono ${
                        isDark
                          ? 'bg-white/8 text-[#A1A1AA]'
                          : 'bg-[#F5F5F7] text-[#555555]'
                      }`}
                    >
                      {act.subject}
                    </span>
                    <span>{act.authorName}</span>
                  </div>
                </div>

                {/* Right: Due date & delete button */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[12px] font-mono tabular-nums font-medium flex items-center gap-1 ${
                      isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{act.dueDate}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onDeleteActivity(act.id)}
                    className="text-[#8E8E93] hover:text-[#EF4444] p-1 rounded-lg transition-colors cursor-pointer"
                    title="Remover"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
