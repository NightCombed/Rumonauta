import React, { useState } from 'react'
import {
  Users,
  Plus,
  CheckCircle2,
  Clock,
  Trash2,
} from 'lucide-react'
import type { Activity } from '../types'

interface CrewActivitiesCardProps {
  activities: Activity[]
  onToggleActivity: (id: string) => void
  onOpenAddModal: () => void
  onDeleteActivity: (id: string) => void
}

export const CrewActivitiesCard: React.FC<CrewActivitiesCardProps> = ({
  activities,
  onToggleActivity,
  onOpenAddModal,
  onDeleteActivity,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  const filteredActivities = activities.filter((act) => {
    if (filter === 'pending') return !act.completed
    if (filter === 'completed') return act.completed
    return true
  })

  const pendingCount = activities.filter((a) => !a.completed).length
  const completedCount = activities.filter((a) => a.completed).length

  const getCategoryBadgeClass = (category: Activity['category']) => {
    switch (category) {
      case 'Prova':
        return 'bg-rose-50 text-rose-700 border-rose-200'
      case 'Lista':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Trabalho':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200'
      case 'Projeto':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-none transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
            <Users className="w-5 h-5 text-[#0F172A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#0F172A] tracking-tight">
                Mapa da Tripulação
              </h2>
              <span className="text-[10px] font-semibold bg-[#F1F5F9] text-[#64748B] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                Colaborativo da Turma
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              {pendingCount} pendente{pendingCount !== 1 ? 's' : ''} • {completedCount} concluída{completedCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Action Button: + Adicionar Atividade da Turma */}
        <div className="flex items-center gap-2">
          {/* Filter tabs */}
          <div className="inline-flex p-0.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 rounded-md transition cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-[#0F172A] font-semibold shadow-none border border-[#E2E8F0]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Todas ({activities.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-2 py-1 rounded-md transition cursor-pointer ${
                filter === 'pending'
                  ? 'bg-white text-[#0F172A] font-semibold shadow-none border border-[#E2E8F0]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Pendentes ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2 py-1 rounded-md transition cursor-pointer ${
                filter === 'completed'
                  ? 'bg-white text-[#0F172A] font-semibold shadow-none border border-[#E2E8F0]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Concluídas ({completedCount})
            </button>
          </div>

          <button
            onClick={onOpenAddModal}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-medium py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Atividade</span>
          </button>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-2.5">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#64748B] bg-[#F8FAFC] border border-dashed border-[#E2E8F0] rounded-lg">
            Nenhuma atividade encontrada com o filtro selecionado.
          </div>
        ) : (
          filteredActivities.map((act) => {
            return (
              <div
                key={act.id}
                className={`group flex items-start justify-between gap-3 p-3 rounded-lg border transition ${
                  act.completed
                    ? 'bg-[#F8FAFC] border-[#E2E8F0] opacity-75'
                    : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                {/* Left: Checkbox + details */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => onToggleActivity(act.id)}
                    className="mt-0.5 text-left focus:outline-none shrink-0 cursor-pointer"
                    title={act.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                        act.completed
                          ? 'bg-[#4F46E5] border-[#4F46E5] text-white'
                          : 'bg-white border-[#CBD5E1] hover:border-[#4F46E5]'
                      }`}
                    >
                      {act.completed && (
                        <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                      )}
                    </div>
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border font-mono ${getCategoryBadgeClass(
                          act.category
                        )}`}
                      >
                        {act.category}
                      </span>
                      <span className="text-xs font-medium text-[#64748B]">
                        {act.subject}
                      </span>
                      {act.urgent && !act.completed && (
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded">
                          Urgente
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-xs font-semibold text-[#0F172A] leading-snug break-words ${
                        act.completed ? 'line-through text-[#94A3B8]' : ''
                      }`}
                    >
                      {act.title}
                    </p>

                    {/* Metadata: Classmate who added it + due date */}
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#64748B]">
                      <span className="flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#E2E8F0] text-[#0F172A] inline-flex items-center justify-center text-[9px] font-bold">
                          {act.authorName.charAt(0)}
                        </span>
                        <span>
                          {act.authorName}{' '}
                          <span className="text-[#94A3B8]">({act.authorRole})</span>
                        </span>
                      </span>

                      <span>•</span>

                      <span
                        className={`flex items-center gap-1 font-mono ${
                          act.dueDaysLabel === 'Amanhã' && !act.completed
                            ? 'text-amber-700 font-semibold'
                            : 'text-[#64748B]'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{act.dueDate}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Remove button */}
                <button
                  type="button"
                  onClick={() => onDeleteActivity(act.id)}
                  title="Remover atividade"
                  className="opacity-0 group-hover:opacity-100 p-1 text-[#94A3B8] hover:text-rose-600 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
