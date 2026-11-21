import React from 'react'
import {
  X,
  Clock,
  AlertTriangle,
  Flame,
  CheckCircle2,
  CalendarCheck2,
  Sparkles,
  Utensils,
  AlertCircle,
  Timer,
} from 'lucide-react'
import type { CountdownScenario, RuTicketScenario, ThemeMode } from '../types'

interface ScenarioSimulatorModalProps {
  isOpen: boolean
  onClose: () => void
  currentScenario: CountdownScenario
  onSelectScenario: (scenario: CountdownScenario) => void
  currentRuScenario?: RuTicketScenario
  onSelectRuScenario?: (scenario: RuTicketScenario) => void
  theme: ThemeMode
}

interface ScenarioOption {
  id: CountdownScenario
  title: string
  highlight: string
  subject: string
  subtitle: string
  colorBadge: string
  badgeLabel: string
  icon: React.ElementType
  colorHex: string
}

export const ScenarioSimulatorModal: React.FC<ScenarioSimulatorModalProps> = ({
  isOpen,
  onClose,
  currentScenario,
  onSelectScenario,
  currentRuScenario = 'scheduled',
  onSelectRuScenario,
  theme,
}) => {
  if (!isOpen) return null

  const isDark = theme === 'dark'

  const ruOptions: {
    id: RuTicketScenario
    label: string
    sublabel: string
    badge: string
    color: string
    icon: React.ElementType
  }[] = [
    {
      id: 'scheduled',
      label: 'RU: Agendado',
      sublabel: 'Geração automática ativa (11h00)',
      badge: 'Agendado • 11h00',
      color: '#22C55E',
      icon: Clock,
    },
    {
      id: 'generated',
      label: 'RU: Gerado',
      sublabel: 'Pronto para entrada • Ver QR Code',
      badge: 'Ticket Gerado ✓',
      color: '#16A34A',
      icon: CheckCircle2,
    },
    {
      id: 'failed',
      label: 'RU: Falha',
      sublabel: 'Falha na automação • Botão tentar de novo',
      badge: 'Falha ao gerar',
      color: '#DC2626',
      icon: AlertCircle,
    },
  ]

  const options: ScenarioOption[] = [
    {
      id: 'calm',
      title: 'Tranquilo (> 24h restantes)',
      highlight: '3d 14h',
      subject: 'Projeto Web',
      subtitle: 'Entrega da Sprint 02 • Prazo confortável',
      colorBadge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      badgeLabel: '> 24h',
      icon: Clock,
      colorHex: '#16A34A',
    },
    {
      id: 'warning',
      title: 'Perto do prazo (< 24h restantes)',
      highlight: '14h 20m',
      subject: 'Física II',
      subtitle: 'Lista 03 de Eletromagnetismo • Vence amanhã',
      colorBadge: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      badgeLabel: '< 24h',
      icon: AlertTriangle,
      colorHex: '#D97706',
    },
    {
      id: 'urgent',
      title: 'Urgente (< 2h restantes)',
      highlight: '45 min',
      subject: 'Física II',
      subtitle: 'Entregar Lista no SUAP • Encerra às 11:30',
      colorBadge: 'bg-red-500/10 text-red-500 border-red-500/20',
      badgeLabel: '< 2h',
      icon: Flame,
      colorHex: '#DC2626',
    },
    {
      id: 'done',
      title: 'Tudo em dia (0 tarefas)',
      highlight: 'Tudo em dia',
      subject: 'Nenhuma pendência',
      subtitle: 'Mar calmo por aqui • Todas as atividades entregues',
      colorBadge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      badgeLabel: '100% OK',
      icon: CheckCircle2,
      colorHex: '#16A34A',
    },
    {
      id: 'absences',
      title: 'Alerta de Faltas (Modo Exceção)',
      highlight: '14/18',
      subject: 'Cálculo I',
      subtitle: 'Limite crítico de presenças no fim do semestre',
      colorBadge: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      badgeLabel: 'Faltas',
      icon: AlertTriangle,
      colorHex: '#D97706',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div
        className={`rounded-2xl max-w-md w-full p-5 border shadow-2xl transition-colors ${
          isDark
            ? 'bg-[#121214] border-[#27272A] text-white'
            : 'bg-white border-[#E5E5EA] text-[#111111]'
        }`}
      >
        {/* Header */}
        <div className={`flex items-start justify-between pb-3.5 mb-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-[17px] font-bold tracking-tight">
                Simulador de Cenários
              </h3>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold border ${
                isDark ? 'bg-white/8 text-[#A1A1AA] border-white/10' : 'bg-black/5 text-[#6E6E73] border-black/10'
              }`}>
                Preview
              </span>
            </div>
            <p className={`text-[12px] leading-relaxed ${isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
              Selecione um cenário para ver como o card se comporta ao lado de <span className="font-semibold text-current">AGORA • Física II</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              isDark
                ? 'text-[#8E8E93] hover:text-white hover:bg-white/5'
                : 'text-[#6E6E73] hover:text-black hover:bg-black/5'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scenarios List */}
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {/* SEÇÃO 1: Ticket do RU */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Utensils className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-[#A1A1AA]' : 'text-[#6E6E73]'}`}>
                Ticket do RU (Automação Inteligente)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {ruOptions.map((ru) => {
                const isSelected = currentRuScenario === ru.id
                const RuIcon = ru.icon
                return (
                  <button
                    key={ru.id}
                    type="button"
                    onClick={() => onSelectRuScenario?.(ru.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[78px] ${
                      isSelected
                        ? isDark
                          ? 'bg-white/10 border-white text-white shadow-xs'
                          : 'bg-black text-white border-black shadow-sm'
                        : isDark
                        ? 'bg-[#18181B] border-[#27272A] text-white hover:border-[#3F3F46]'
                        : 'bg-[#F9F9FB] border-[#E5E5EA] text-[#111111] hover:border-[#C7C7CC]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <RuIcon
                        className="w-4 h-4"
                        style={{ color: isSelected ? (isDark ? '#FFFFFF' : '#FFFFFF') : ru.color }}
                      />
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      )}
                    </div>
                    <div className="mt-1.5">
                      <div className="text-[12px] font-bold leading-tight">
                        {ru.label}
                      </div>
                      <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-white/80' : isDark ? 'text-[#71717A]' : 'text-[#8E8E93]'}`}>
                        {ru.badge}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* SEÇÃO 2: Próxima Entrega */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Timer className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-[#A1A1AA]' : 'text-[#6E6E73]'}`}>
                Card Próxima Entrega (Contagem Regressiva)
              </span>
            </div>

            <div className="space-y-2">
              {options.map((opt) => {
                const isSelected = currentScenario === opt.id
                const Icon = opt.icon

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onSelectScenario(opt.id)
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                      isSelected
                        ? isDark
                          ? 'bg-white/10 border-white text-white shadow-xs scale-[1.01]'
                          : 'bg-black text-white border-black shadow-sm scale-[1.01]'
                        : isDark
                        ? 'bg-[#18181B] border-[#27272A] text-white hover:border-[#3F3F46]'
                        : 'bg-[#F9F9FB] border-[#E5E5EA] text-[#111111] hover:border-[#C7C7CC]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? isDark
                              ? 'bg-white/20 border-white/30 text-white'
                              : 'bg-white/20 border-white/30 text-white'
                            : isDark
                            ? 'bg-[#27272A] border-transparent text-[#A1A1AA]'
                            : 'bg-white border-[#E5E5EA] text-[#6E6E73]'
                        }`}
                      >
                        <Icon className="w-4 h-4" style={!isSelected ? { color: opt.colorHex } : undefined} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] font-bold tracking-tight">
                            {opt.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="text-[12px] font-mono font-bold tabular-nums"
                            style={{ color: isSelected ? '#FFFFFF' : opt.colorHex }}
                          >
                            {opt.highlight}
                          </span>
                          <span className={`text-[11px] truncate ${
                            isSelected
                              ? 'text-white/80'
                              : isDark
                              ? 'text-[#8E8E93]'
                              : 'text-[#6E6E73]'
                          }`}>
                            • {opt.subject}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-white/20 text-white border-white/30'
                            : opt.colorBadge
                        }`}
                      >
                        {opt.badgeLabel}
                      </span>

                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#22C55E] border-[#22C55E] text-black'
                            : isDark
                            ? 'border-[#3F3F46]'
                            : 'border-[#D1D1D6]'
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer info & close button */}
        <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex items-center gap-1.5 text-[11px] text-[#8E8E93]">
            <CalendarCheck2 className="w-3.5 h-3.5" />
            <span>Atualização instantânea na tela inicial</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`h-9 px-4 text-[12px] font-bold rounded-xl transition cursor-pointer ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-[#111111] text-white hover:bg-neutral-800'
            }`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
