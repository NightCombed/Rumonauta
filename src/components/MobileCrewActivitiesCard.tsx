import React from 'react'
import {
  Plus,
  Check,
  Clock,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import type { Activity, ThemeMode } from '../types'

interface MobileCrewActivitiesCardProps {
  theme: ThemeMode
  activities: Activity[]
  onToggleActivity: (id: string) => void
  onOpenAddModal: () => void
  onViewAllCrew?: () => void
}

export const MobileCrewActivitiesCard: React.FC<MobileCrewActivitiesCardProps> = ({
  theme,
  activities,
  onToggleActivity,
  onOpenAddModal,
  onViewAllCrew,
}) => {
  const isDark = theme === 'dark'
  const previewActivities = activities.slice(0, 3)

  return (
    // Open section: left 3px bar only — mirrors Copiloto visual language
    <section
      className={`relative pl-4 py-2 border-l-[3px] transition-colors duration-200 overflow-hidden ${
        isDark ? 'border-white text-white' : 'border-[#111111] text-[#111111]'
      }`}
    >
      {/* Giant Calendar watermark (Apple Wallet style) */}
      <div
        aria-hidden="true"
        className={`absolute -right-4 -bottom-4 pointer-events-none select-none transition-opacity ${isDark ? 'text-white opacity-[0.06]' : 'text-black opacity-[0.04]'}`}
      >
        <Calendar className="w-[120px] h-[120px] stroke-[1.2]" />
      </div>

      <div className="relative z-10 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
            <h2 className="text-[18px] font-semibold tracking-tight">
              Mapa da Tripulação
            </h2>
            <span
              className={`text-[13px] font-medium ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              • {activities.filter(a => !a.completed).length} pendente{activities.filter(a => !a.completed).length !== 1 ? 's' : ''}
            </span>
          </div>

          {onViewAllCrew && (
            <button
              type="button"
              onClick={onViewAllCrew}
              className={`text-[13px] font-semibold flex items-center gap-1 hover:underline cursor-pointer ${
                isDark ? 'text-white' : 'text-[#111111]'
              }`}
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Apple Reminders-style activity list */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark
              ? 'bg-[#121214] border-[#27272A]'
              : 'bg-white border-[#E5E5EA]'
          }`}
        >
          <div className={`divide-y ${isDark ? 'divide-[#27272A]' : 'divide-[#E5E5EA]'}`}>
            {previewActivities.map((act) => (
              <div key={act.id} className="px-4 py-3.5 flex items-start gap-3.5">
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
                    className={`text-[15px] font-medium leading-snug ${
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

                {/* Due date aligned right */}
                <div
                  className={`shrink-0 flex items-center gap-1 text-[12px] font-mono tabular-nums font-medium ${
                    isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{act.dueDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add button as list footer row */}
          <div
            className={`border-t ${isDark ? 'border-[#27272A]' : 'border-[#E5E5EA]'}`}
          >
            <button
              type="button"
              onClick={onOpenAddModal}
              className={`w-full px-4 py-3.5 flex items-center gap-2 text-[14px] font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#8E8E93] hover:text-white hover:bg-white/4'
                  : 'text-[#6E6E73] hover:text-[#111111] hover:bg-[#F5F5F7]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-[#22C55E]' : 'bg-[#22C55E]'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-black stroke-[3]" />
              </div>
              <span>Nova Atividade</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
