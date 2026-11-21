import React, { useState } from 'react'
import {
  Utensils,
  MapPin,
  TriangleAlert,
  Clock,
  Hourglass,
  CheckCircle2,
  Check,
  Plus,
  ChevronRight,
  ArrowRight,
  Loader2,
  ExternalLink,
  RotateCcw,
  Compass,
  Settings,
  AlertCircle,
} from 'lucide-react'
import type { Activity, ThemeMode, RuTicket, CountdownScenario, RuTicketScenario } from '../types'

interface MobileHomeBentoProps {
  theme: ThemeMode
  activities: Activity[]
  onToggleActivity: (id: string) => void
  onOpenAddModal: () => void
  onOpenFullVoucher: () => void
  onOpenCopilot: (prompt?: string) => void
  onViewAllCrew: () => void
  onViewGrades: () => void
  countdownScenario?: CountdownScenario
  ruScenario?: RuTicketScenario
  onSelectRuScenario?: (scenario: RuTicketScenario) => void
  onOpenSimulator?: () => void
}

export const MobileHomeBento: React.FC<MobileHomeBentoProps> = ({
  theme,
  activities,
  onToggleActivity,
  onOpenAddModal,
  onOpenFullVoucher,
  onOpenCopilot,
  onViewAllCrew,
  onViewGrades,
  countdownScenario = 'warning',
  ruScenario = 'scheduled',
  onSelectRuScenario,
  onOpenSimulator,
}) => {
  const isDark = theme === 'dark'

  const [selectedDiet, setSelectedDiet] = useState<'Padrão' | 'Vegetariano'>('Padrão')
  const [isLoadingRu, setIsLoadingRu] = useState(false)
  const [ticketState, setTicketState] = useState<RuTicket>({
    isGenerated: false,
    ticketId: null,
    generatedAt: null,
    validUntil: null,
    mealType: 'Almoço',
    mealTimeWindow: '11:30 - 13:30',
    studentName: 'Lucas Mendes Silva',
    registration: '20231TADS042',
    campus: 'IFSP Central',
    dietOption: 'Padrão',
    status: null,
  })

  // Efetiva o cenário caso venha de fora ou manual
  const effectiveRuScenario: RuTicketScenario =
    ticketState.isGenerated ? 'generated' : ruScenario

  const handleGenerateTicket = () => {
    setIsLoadingRu(true)
    setTimeout(() => {
      setIsLoadingRu(false)
      setTicketState({
        isGenerated: true,
        ticketId: 'RU-2026-8842',
        generatedAt: '10:42',
        validUntil: '13:30',
        mealType: 'Almoço',
        mealTimeWindow: '11:30 - 13:30',
        studentName: 'Lucas Mendes Silva',
        registration: '20231TADS042',
        campus: 'IFSP Central',
        dietOption: selectedDiet,
        status: 'ready',
      })
      if (onSelectRuScenario) {
        onSelectRuScenario('generated')
      }
    }, 700)
  }

  const handleResetTicket = () => {
    setTicketState({
      isGenerated: false,
      ticketId: null,
      generatedAt: null,
      validUntil: null,
      mealType: 'Almoço',
      mealTimeWindow: '11:30 - 13:30',
      studentName: 'Lucas Mendes Silva',
      registration: '20231TADS042',
      campus: 'IFSP Central',
      dietOption: 'Padrão',
      status: null,
    })
    if (onSelectRuScenario) {
      onSelectRuScenario('scheduled')
    }
  }

  return (
    <div className="space-y-3">
      {/* 1. Compact Header Strip */}
      <div className="flex items-center justify-between pt-0.5 pb-1">
        {/* Greeting — sem emoji, tipografia limpa */}
        <h1 className="text-[20px] font-bold tracking-tight">
          E aí, Lucas
        </h1>
        {/* Data limpa sem dot verde */}
        <div className="text-[12px] font-medium text-[#8E8E93]">
          Sex, 20 Nov • SUAP
        </div>
      </div>

      {/* 2. Linha 1 — Card Ticket do RU: sombra suave, sem borda visível no claro */}
      <section
        className={`relative rounded-[20px] p-3.5 transition-all overflow-hidden ${
          isDark
            ? 'bg-[#141416] border border-[#27272A] text-white'
            : 'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] text-[#111111]'
        }`}
      >
        {/* Giant Watermark Icon */}
        <div
          aria-hidden="true"
          className={`absolute -right-3 -bottom-3 pointer-events-none select-none ${isDark ? 'text-white opacity-[0.06]' : 'text-black opacity-[0.05]'}`}
        >
          <Utensils className="w-[100px] h-[100px] stroke-[1.2]" />
        </div>

        <div className="relative z-10">
          {effectiveRuScenario === 'scheduled' ? (
            /* Estado 1 — Agendado (Padrão antes do horário) */
            <div className="space-y-2.5">
              {/* Header do Card Agendado */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <div>
                    <span className="text-[14px] font-semibold tracking-tight block leading-tight">
                      Ticket do RU
                    </span>
                    <span className={`text-[11px] font-medium ${isDark ? 'text-[#71717A]' : 'text-[#8E8E93]'}`}>
                      Abre às 11h30
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    isDark ? 'bg-white/8 text-[#A1A1AA]' : 'bg-black/5 text-[#6E6E73]'
                  }`}>
                    <Clock className="w-3 h-3 text-[#22C55E]" />
                    <span>Agendado • 11h00</span>
                  </span>

                  <button
                    type="button"
                    onClick={onOpenSimulator}
                    title="Configurar horário de automação"
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-white/10 text-[#71717A] hover:text-white' : 'hover:bg-black/5 text-[#8E8E93] hover:text-black'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Linha Inferior: prato + aviso de automação + seletor + botão secundário "Gerar agora" */}
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <div className="space-y-1.5 min-w-0">
                  <div>
                    <span className="text-[13px] font-semibold leading-tight block">
                      {selectedDiet === 'Padrão'
                        ? 'Frango Grelhado'
                        : 'Quibe de Lentilha'}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] font-medium text-[#22C55E]">
                        Geração automática ativa (11h00)
                      </span>
                    </div>
                  </div>

                  {/* Segmented Diet Control */}
                  <div className={`inline-flex p-0.5 rounded-lg border text-[11px] font-medium ${isDark ? 'border-[#27272A] bg-[#1E1E22]' : 'border-[#E5E5EA] bg-[#F5F5F7]'}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedDiet('Padrão')}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        selectedDiet === 'Padrão'
                          ? 'bg-white text-black font-semibold shadow-xs'
                          : 'text-[#8E8E93]'
                      }`}
                    >
                      Padrão
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDiet('Vegetariano')}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        selectedDiet === 'Vegetariano'
                          ? 'bg-white text-black font-semibold shadow-xs'
                          : 'text-[#8E8E93]'
                      }`}
                    >
                      Veg
                    </button>
                  </div>
                </div>

                {/* Botão Secundário / Leve: "Gerar agora" */}
                <button
                  type="button"
                  onClick={handleGenerateTicket}
                  disabled={isLoadingRu}
                  className={`h-9 px-3.5 border text-[13px] font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0 disabled:opacity-50 active:scale-95 ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
                      : 'bg-[#F5F5F7] hover:bg-[#E5E5EA] border-[#E5E5EA] text-[#111111]'
                  }`}
                >
                  {isLoadingRu ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Gerando...</span>
                    </>
                  ) : (
                    <>
                      <Utensils className="w-3.5 h-3.5 opacity-80" />
                      <span>Gerar agora</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : effectiveRuScenario === 'generated' ? (
            /* Estado 2 — Gerado com Sucesso */
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <div>
                    <span className="text-[14px] font-semibold tracking-tight block leading-tight">
                      Ticket do RU
                    </span>
                    <span className={`text-[11px] font-medium ${isDark ? 'text-[#71717A]' : 'text-[#8E8E93]'}`}>
                      11h30 às 13h30 • {selectedDiet}
                    </span>
                  </div>
                </div>

                {/* Badge Sólido Verde */}
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#22C55E] text-black flex items-center gap-1 shadow-xs">
                  <span>Ticket Gerado ✓</span>
                </span>
              </div>

              {/* Linha Principal com Mini QR Code e Botão Vibrante "Ver QR Code" */}
              <div className="flex items-center justify-between gap-3 pt-0.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5EA] flex items-center justify-center shrink-0 shadow-xs">
                    <div className="w-6 h-6 border-2 border-black grid grid-cols-2 p-0.5 gap-0.5">
                      <div className="bg-black" />
                      <div className="bg-black" />
                      <div className="bg-black" />
                      <div />
                    </div>
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="font-mono text-[13px] font-bold tabular-nums">
                      {ticketState.ticketId || 'RU-2026-8842'}
                    </div>
                    <div className={`text-[11px] font-medium truncate ${isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
                      {selectedDiet === 'Padrão' ? 'Frango Grelhado' : 'Quibe de Lentilha'} • Válido hoje
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={onOpenFullVoucher}
                    className="h-9 px-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-black text-[13px] font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Ver QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetTicket}
                    title="Redefinir / Simular agendamento"
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center text-[#8E8E93] hover:text-white cursor-pointer transition-colors ${isDark ? 'border-[#27272A] hover:bg-white/5' : 'border-[#E5E5EA] hover:bg-black/5'}`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Estado 3 — Falha na Automação */
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[14px] font-semibold tracking-tight block leading-tight">
                      Ticket do RU
                    </span>
                    <span className={`text-[11px] font-medium ${isDark ? 'text-[#71717A]' : 'text-[#8E8E93]'}`}>
                      Abre às 11h30 • Almoço
                    </span>
                  </div>
                </div>

                {/* Badge Âmbar/Vermelho Falha */}
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Falha ao gerar</span>
                </span>
              </div>

              {/* Linha com Mensagem de Erro e Botão de Destaque "Tentar de novo" */}
              <div className="flex items-center justify-between gap-3 pt-0.5">
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[13px] font-semibold text-red-500/90 leading-tight">
                    SUAP indisponível às 11h00
                  </div>
                  <div className={`text-[11px] font-medium ${isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
                    Não foi possível emitir seu ticket automaticamente.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateTicket}
                  disabled={isLoadingRu}
                  className="h-9 px-3.5 bg-red-600 hover:bg-red-500 text-white text-[13px] font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0 active:scale-95 disabled:opacity-50"
                >
                  {isLoadingRu ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Tentando...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Tentar de novo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Linha 2 — Grid de 2 Colunas */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card Esquerdo: Aula Atual — alto contraste invertido */}
        <section
          className={`rounded-[20px] p-4 flex flex-col justify-between relative overflow-hidden min-h-[140px] shadow-sm transition-transform active:scale-[0.98] ${
            isDark
              ? 'bg-white text-[#09090B] border border-white/20'
              : 'bg-[#09090B] text-white border border-[#18181B]'
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute -right-2 -bottom-2 pointer-events-none select-none opacity-10"
          >
            <Clock className="w-20 h-20 stroke-[1.5]" />
          </div>

          <div className="relative z-10">
            {/* Badge AGORA com bolinha pulsante — única ocorrência funcional justificada */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span>AGORA • 09:30</span>
            </div>

            <h3 className="text-[20px] font-bold tracking-tight leading-tight mt-1.5">
              Física II
            </h3>
          </div>

          <div className="relative z-10 flex items-center gap-1 text-[12px] opacity-80 mt-2 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Sala 104 • Lab 04</span>
          </div>
        </section>

        {/* Card Direito: Card Dinâmico de Contagem Regressiva ("PRÓXIMA ENTREGA") */}
        {(() => {
          const getScenarioData = () => {
            switch (countdownScenario) {
              case 'calm':
                return {
                  label: 'PRÓXIMA ENTREGA',
                  icon: Clock,
                  iconColor: '#16A34A',
                  time: '3d 14h',
                  textColor: 'text-[#16A34A]',
                  subject: 'Projeto Web',
                  barColor: 'bg-[#16A34A]',
                  barWidth: '35%',
                  info: 'Entrega em 3 dias',
                  hoverBorder: isDark ? 'hover:border-emerald-500/40' : 'hover:border-emerald-400/50',
                  onClick: onViewAllCrew,
                }
              case 'urgent':
                return {
                  label: 'PRÓXIMA ENTREGA',
                  icon: Hourglass,
                  iconColor: '#DC2626',
                  time: '45 min',
                  textColor: 'text-[#DC2626]',
                  subject: 'Física II • Entregar Lista',
                  barColor: 'bg-[#DC2626]',
                  barWidth: '92%',
                  info: 'Encerra às 11:30',
                  hoverBorder: isDark ? 'hover:border-red-500/40' : 'hover:border-red-400/50',
                  onClick: onViewAllCrew,
                }
              case 'done':
                return {
                  label: 'PRÓXIMA ENTREGA',
                  icon: CheckCircle2,
                  iconColor: '#16A34A',
                  time: 'Tudo em dia',
                  textColor: 'text-[#16A34A]',
                  subject: 'Mar calmo por aqui',
                  barColor: 'bg-[#16A34A]',
                  barWidth: '100%',
                  info: 'Nenhuma pendência',
                  hoverBorder: isDark ? 'hover:border-emerald-500/40' : 'hover:border-emerald-400/50',
                  onClick: onViewAllCrew,
                }
              case 'absences':
                return {
                  label: 'FALTAS CRÍTICAS',
                  icon: TriangleAlert,
                  iconColor: '#D97706',
                  time: '14/18',
                  textColor: 'text-amber-500',
                  subject: 'Cálculo I',
                  barColor: 'bg-amber-500',
                  barWidth: `${(14 / 18) * 100}%`,
                  info: 'Limite: 4 faltas restantes',
                  hoverBorder: isDark ? 'hover:border-amber-500/40' : 'hover:border-amber-400/50',
                  onClick: onViewGrades,
                }
              case 'warning':
              default:
                return {
                  label: 'PRÓXIMA ENTREGA',
                  icon: Clock,
                  iconColor: '#D97706',
                  time: '14h 20m',
                  textColor: 'text-[#D97706]',
                  subject: 'Física II • Lista 03',
                  barColor: 'bg-[#D97706]',
                  barWidth: '72%',
                  info: 'Vence amanhã cedo',
                  hoverBorder: isDark ? 'hover:border-amber-500/40' : 'hover:border-amber-400/50',
                  onClick: onViewAllCrew,
                }
            }
          }

          const scData = getScenarioData()
          const ScenarioIcon = scData.icon

          return (
            <section
              onClick={scData.onClick}
              className={`rounded-[20px] p-4 flex flex-col justify-between border relative overflow-hidden min-h-[140px] cursor-pointer transition-all shadow-xs ${scData.hoverBorder} ${
                isDark
                  ? 'bg-[#141416] border-[#27272A] text-white'
                  : 'bg-white border-[#E5E5EA] text-[#111111]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                  {scData.label}
                </span>
                <ScenarioIcon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: scData.iconColor }}
                />
              </div>

              <div className="my-1">
                <div
                  className={`font-mono font-extrabold tabular-nums tracking-tight leading-none ${scData.textColor} ${
                    countdownScenario === 'done'
                      ? 'text-[22px] font-sans font-bold flex items-center gap-1.5'
                      : 'text-[30px]'
                  }`}
                >
                  {countdownScenario === 'done' && (
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
                  )}
                  <span>{scData.time}</span>
                </div>
                <div className="text-[13px] font-semibold truncate mt-1">
                  {scData.subject}
                </div>
              </div>

              <div>
                <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-[#27272A]' : 'bg-[#E5E5EA]'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${scData.barColor}`}
                    style={{ width: scData.barWidth }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 gap-1">
                  <span
                    className={`text-[10px] font-medium truncate ${
                      countdownScenario === 'urgent'
                        ? 'text-red-500 font-semibold'
                        : countdownScenario === 'warning' || countdownScenario === 'absences'
                        ? 'text-amber-500/90'
                        : 'text-[#8E8E93]'
                    }`}
                  >
                    {scData.info}
                  </span>

                  {onOpenSimulator && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenSimulator()
                      }}
                      title="Simulador de Cenários"
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded border transition-colors shrink-0 ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-[#8E8E93] hover:text-white hover:bg-white/10'
                          : 'bg-black/5 border-black/10 text-[#6E6E73] hover:text-black hover:bg-black/10'
                      }`}
                    >
                      Simular
                    </button>
                  )}
                </div>
              </div>
            </section>
          )
        })()}
      </div>

      {/* 4. Linha 3 — Card do Copiloto: sem bolinha, copy mais natural */}
      <section
        className={`rounded-[20px] border p-3.5 relative overflow-hidden transition-colors ${
          isDark
            ? 'bg-[#141416] border-[#27272A] text-white'
            : 'bg-white border-[#E5E5EA] text-[#111111]'
        }`}
      >
        <div
          aria-hidden="true"
          className={`absolute -right-3 -bottom-3 pointer-events-none select-none ${isDark ? 'text-white opacity-[0.06]' : 'text-black opacity-[0.04]'}`}
        >
          <Compass className="w-[100px] h-[100px] stroke-[1.2]" />
        </div>

        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center justify-between">
            {/* Título sem bolinha — Copiloto não é um status de conexão */}
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-semibold tracking-tight">
                Copiloto
              </span>
              <span className={`text-[11px] font-medium ${isDark ? 'text-[#71717A]' : 'text-[#8E8E93]'}`}>
                · rota de hoje
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenCopilot('O que devo priorizar hoje?')}
              className="text-[12px] font-semibold text-[#22C55E] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Perguntar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy direto, sem aspas, como um insight acionável real */}
          <p className={`text-[13px] font-medium leading-snug pr-4 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            Lista de Física II vence amanhã — foque nisso antes do almoço. Cálculo pode esperar até a tarde.
          </p>
        </div>
      </section>

      {/* 5. Linha 4 — Próximas Entregas: seção aberta, sem card/borda de container */}
      <section className="pt-1">
        {/* Header da seção — sem bolinha verde, como título de seção limpo */}
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-[13px] font-semibold tracking-tight ${isDark ? 'text-[#A1A1AA]' : 'text-[#6E6E73]'}`}>
            Próximas Entregas
            <span className={`ml-1.5 font-mono text-[11px] font-medium ${isDark ? 'text-[#52525B]' : 'text-[#AEAEB2]'}`}>
              {activities.length}
            </span>
          </h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAddModal}
              title="Nova Atividade"
              className="w-6 h-6 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-black flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            <button
              type="button"
              onClick={onViewAllCrew}
              className={`text-[12px] font-semibold text-[#8E8E93] flex items-center gap-0.5 cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-[#111111]'}`}
            >
              <span>Ver todas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Lista aberta: apenas divisórias finas entre itens */}
        <div className={`divide-y ${isDark ? 'divide-[#27272A]' : 'divide-[#F0F0F0]'}`}>
          {activities.slice(0, 2).map((act) => (
            <div
              key={act.id}
              className="py-2.5 flex items-start gap-2.5 first:pt-0.5 last:pb-0"
            >
              <button
                type="button"
                onClick={() => onToggleActivity(act.id)}
                aria-label={act.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                className="mt-0.5 shrink-0 cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    act.completed
                      ? isDark
                        ? 'bg-white border-white text-black'
                        : 'bg-[#111111] border-[#111111] text-white'
                      : isDark
                      ? 'border-[#3F3F46]'
                      : 'border-[#C7C7CC]'
                  }`}
                >
                  {act.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>

              <div className="flex-1 min-w-0 space-y-0.5">
                <p
                  className={`text-[13px] font-medium leading-snug break-words ${
                    act.completed
                      ? 'line-through text-[#8E8E93]'
                      : isDark
                      ? 'text-white'
                      : 'text-[#111111]'
                  }`}
                >
                  {act.title}
                </p>

                <div className="flex items-center gap-2 text-[11px]">
                  <span
                    className={`font-mono px-1.5 rounded font-semibold ${
                      isDark
                        ? 'bg-white/8 text-[#A1A1AA]'
                        : 'bg-[#F5F5F7] text-[#555555]'
                    }`}
                  >
                    {act.subject}
                  </span>
                  <span className={`flex items-center gap-1 font-mono ${isDark ? 'text-[#52525B]' : 'text-[#AEAEB2]'}`}>
                    <Clock className="w-3 h-3" />
                    <span>{act.dueDate}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
