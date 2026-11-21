import React, { useState } from 'react'
import type { Activity, ThemeMode } from '../types'
import { Plus, X } from 'lucide-react'

interface AddActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (newActivity: Omit<Activity, 'id' | 'completed'>) => void
  theme?: ThemeMode
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  theme = 'light',
}) => {
  const isDark = theme === 'dark'
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('Física II')
  const [category, setCategory] = useState<Activity['category']>('Lista')
  const [dueDate, setDueDate] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)

  if (!isOpen) return null

  const getSubjectCode = (subj: string) => {
    switch (subj) {
      case 'Cálculo I':
        return 'CALC-101'
      case 'Programação Web':
        return 'WEB-202'
      case 'Física II':
        return 'FIS-102'
      case 'Banco de Dados':
        return 'BD-301'
      default:
        return 'CUR-001'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !dueDate.trim()) return

    onAdd({
      title: title.trim(),
      subject,
      subjectCode: getSubjectCode(subject),
      dueDate: dueDate.trim(),
      dueDaysLabel: 'Em breve',
      category,
      authorName: 'Lucas Silva',
      authorRole: 'Você',
      urgent: isUrgent,
    })

    setTitle('')
    setDueDate('')
    setIsUrgent(false)
    onClose()
  }

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
          <div>
            <h3 className="text-[18px] font-bold tracking-tight">
              Nova Atividade
            </h3>
            <p
              className={`text-[13px] ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              Cadastrar no Mapa da Tripulação
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8E8E93] hover:text-white rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label
              className={`block text-[13px] font-medium mb-1 ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              Título da Tarefa
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Lista 04 — Gravitação"
              className={`h-11 w-full rounded-xl px-3.5 text-[15px] font-normal border focus:outline-none transition-colors ${
                isDark
                  ? 'bg-[#18181B] border-[#27272A] text-white placeholder-[#8E8E93] focus:border-white'
                  : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#111111] placeholder-[#8E8E93] focus:border-black'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                className={`block text-[13px] font-medium mb-1 ${
                  isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                }`}
              >
                Matéria
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`h-11 w-full rounded-xl px-2.5 text-[13px] font-medium border focus:outline-none ${
                  isDark
                    ? 'bg-[#18181B] border-[#27272A] text-white'
                    : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#111111]'
                }`}
              >
                <option value="Física II">Física II</option>
                <option value="Cálculo I">Cálculo I</option>
                <option value="Programação Web">Web</option>
                <option value="Banco de Dados">Banco de Dados</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-[13px] font-medium mb-1 ${
                  isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                }`}
              >
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Activity['category'])}
                className={`h-11 w-full rounded-xl px-2.5 text-[13px] font-medium border focus:outline-none ${
                  isDark
                    ? 'bg-[#18181B] border-[#27272A] text-white'
                    : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#111111]'
                }`}
              >
                <option value="Lista">Lista</option>
                <option value="Prova">Prova</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Projeto">Projeto</option>
              </select>
            </div>
          </div>

          <div>
            <label
              className={`block text-[13px] font-medium mb-1 ${
                isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
              }`}
            >
              Data de Entrega
            </label>
            <input
              type="text"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Ex: Amanhã, 23:59"
              className={`h-11 w-full rounded-xl px-3.5 text-[15px] font-normal border focus:outline-none transition-colors ${
                isDark
                  ? 'bg-[#18181B] border-[#27272A] text-white placeholder-[#8E8E93] focus:border-white'
                  : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#111111] placeholder-[#8E8E93] focus:border-black'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="mUrgentCheck"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="mUrgentCheck" className="text-[13px] font-medium cursor-pointer">
              Marcar como urgente
            </label>
          </div>

          <div className={`flex items-center justify-end gap-2 pt-3 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <button
              type="button"
              onClick={onClose}
              className={`h-11 px-4 text-[13px] font-semibold rounded-xl transition cursor-pointer ${
                isDark ? 'text-[#8E8E93] hover:text-white' : 'text-[#6E6E73] hover:text-black'
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`h-11 px-5 rounded-xl text-[13px] font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-white text-black hover:bg-neutral-100'
                  : 'bg-[#111111] text-white hover:bg-neutral-800'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
