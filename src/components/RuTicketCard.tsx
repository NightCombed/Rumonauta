import React, { useState } from 'react'
import {
  Utensils,
  Loader2,
  Copy,
  ExternalLink,
  RotateCcw,
  Clock,
} from 'lucide-react'
import type { RuTicket } from '../types'
import { RU_MENU } from '../mockData'

interface RuTicketCardProps {
  onOpenFullTicket: () => void
}

export const RuTicketCard: React.FC<RuTicketCardProps> = ({ onOpenFullTicket }) => {
  const [ticketState, setTicketState] = useState<RuTicket>({
    isGenerated: false,
    ticketId: null,
    generatedAt: null,
    validUntil: null,
    mealType: 'Almoço',
    mealTimeWindow: '11:30 - 13:30',
    studentName: 'Lucas Mendes Silva',
    registration: '20231TADS042',
    campus: 'IFSP - Campus Central',
    dietOption: 'Padrão',
    status: null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [selectedDiet, setSelectedDiet] = useState<'Padrão' | 'Vegetariano'>('Padrão')

  const handleGenerateTicket = () => {
    setIsLoading(true)
    setLoadingStep('Conectando ao módulo de alimentação SUAP...')

    setTimeout(() => {
      setLoadingStep('Autenticando matrícula 20231TADS042 & cota diária...')
    }, 600)

    setTimeout(() => {
      setLoadingStep('Assinando chave de validação da catraca...')
    }, 1200)

    setTimeout(() => {
      setIsLoading(false)
      setTicketState({
        isGenerated: true,
        ticketId: 'RU-2026-8842',
        generatedAt: '10:42',
        validUntil: '13:30',
        mealType: 'Almoço',
        mealTimeWindow: '11:30 - 13:30',
        studentName: 'Lucas Mendes Silva',
        registration: '20231TADS042',
        campus: 'IFSP - Campus Central',
        dietOption: selectedDiet,
        status: 'ready',
      })
    }, 1800)
  }

  const handleCopyCode = () => {
    if (ticketState.ticketId) {
      navigator.clipboard?.writeText(ticketState.ticketId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setTicketState({
      isGenerated: false,
      ticketId: null,
      generatedAt: null,
      validUntil: null,
      mealType: 'Almoço',
      mealTimeWindow: '11:30 - 13:30',
      studentName: 'Lucas Mendes Silva',
      registration: '20231TADS042',
      campus: 'IFSP - Campus Central',
      dietOption: 'Padrão',
      status: null,
    })
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-none transition-all">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
            <Utensils className="w-5 h-5 text-[#0F172A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#0F172A] tracking-tight">
                Ação Rápida: Ticket de Alimentação (RU)
              </h2>
              <span className="text-[10px] font-medium bg-[#F1F5F9] text-[#64748B] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                Refeitório IF
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Almoço de hoje • Janela de serviço das 11:30 às 13:30
            </p>
          </div>
        </div>

        {/* Status Badge */}
        {ticketState.isGenerated && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>Ticket Gerado (11:30 - 13:30)</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {!ticketState.isGenerated ? (
        <div className="space-y-4">
          {/* Cardápio teaser */}
          <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between text-xs text-[#0F172A] font-medium mb-1.5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                Cardápio do Almoço de Hoje
              </span>
              <span className="text-[11px] text-[#64748B]">Cota Gratuita (PNAE)</span>
            </div>
            <div className="text-xs text-[#64748B] space-y-1">
              <p>
                <strong className="text-[#0F172A] font-semibold">Principal:</strong>{' '}
                {RU_MENU.mainDish}
              </p>
              <p>
                <strong className="text-[#0F172A] font-semibold">Vegetariano:</strong>{' '}
                {RU_MENU.vegetarianDish}
              </p>
            </div>
          </div>

          {/* Diet selection pills */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748B]">Opção do prato:</span>
              <div className="inline-flex p-0.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg">
                <button
                  type="button"
                  onClick={() => setSelectedDiet('Padrão')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                    selectedDiet === 'Padrão'
                      ? 'bg-white text-[#0F172A] shadow-none border border-[#E2E8F0]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Padrão (Frango)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDiet('Vegetariano')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                    selectedDiet === 'Vegetariano'
                      ? 'bg-white text-[#0F172A] shadow-none border border-[#E2E8F0]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Vegetariano (Lentilha)
                </button>
              </div>
            </div>
          </div>

          {/* Trigger Button or Loading Simulation */}
          {isLoading ? (
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex flex-col items-center justify-center text-center space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                <Loader2 className="w-4 h-4 animate-spin text-[#4F46E5]" />
                <span>Emitindo ticket digital no SUAP...</span>
              </div>
              <p className="text-xs text-[#64748B] animate-pulse">
                {loadingStep}
              </p>
              <div className="w-full max-w-xs h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div className="h-full bg-[#4F46E5] animate-[pulse_1s_ease-in-out_infinite] w-3/4"></div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGenerateTicket}
              className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Gerar Ticket do Almoço</span>
            </button>
          )}
        </div>
      ) : (
        /* Generated Ticket State */
        <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* SVG Minimal QR Code */}
            <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-lg shrink-0 flex flex-col items-center">
              <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#0F172A]"
              >
                <rect x="6" y="6" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
                <rect x="12" y="12" width="12" height="12" fill="currentColor" />

                <rect x="66" y="6" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
                <rect x="72" y="12" width="12" height="12" fill="currentColor" />

                <rect x="6" y="66" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
                <rect x="12" y="72" width="12" height="12" fill="currentColor" />

                <rect x="36" y="6" width="6" height="6" fill="currentColor" />
                <rect x="48" y="6" width="6" height="6" fill="currentColor" />
                <rect x="36" y="18" width="6" height="12" fill="currentColor" />
                <rect x="48" y="24" width="6" height="6" fill="currentColor" />
                <rect x="6" y="36" width="6" height="6" fill="currentColor" />
                <rect x="18" y="36" width="12" height="6" fill="currentColor" />
                <rect x="36" y="36" width="24" height="6" fill="currentColor" />
                <rect x="66" y="36" width="6" height="12" fill="currentColor" />
                <rect x="78" y="36" width="12" height="6" fill="currentColor" />

                <rect x="6" y="48" width="12" height="6" fill="currentColor" />
                <rect x="24" y="48" width="6" height="6" fill="currentColor" />
                <rect x="42" y="48" width="12" height="12" fill="currentColor" />
                <rect x="60" y="48" width="6" height="6" fill="currentColor" />
                <rect x="78" y="48" width="12" height="6" fill="currentColor" />

                <rect x="36" y="66" width="12" height="6" fill="currentColor" />
                <rect x="54" y="66" width="6" height="12" fill="currentColor" />
                <rect x="72" y="66" width="18" height="6" fill="currentColor" />
                <rect x="36" y="78" width="6" height="12" fill="currentColor" />
                <rect x="48" y="84" width="12" height="6" fill="currentColor" />
                <rect x="66" y="78" width="6" height="12" fill="currentColor" />
                <rect x="78" y="84" width="12" height="6" fill="currentColor" />
              </svg>
              <span className="text-[9px] font-mono font-semibold text-[#64748B] mt-1">
                ESCANEIE NO RU
              </span>
            </div>

            {/* Ticket Information */}
            <div className="flex-1 text-left space-y-2 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-[#0F172A] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded">
                    {ticketState.ticketId}
                  </span>
                  <span className="ml-2 text-[11px] text-[#64748B]">
                    Opção: <strong className="text-[#0F172A]">{ticketState.dietOption}</strong>
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="text-xs text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1 font-medium transition cursor-pointer"
                  title="Copiar código do ticket"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <div className="text-xs text-[#64748B] space-y-0.5">
                <p>
                  <strong className="text-[#0F172A]">Aluno:</strong> Lucas Silva (20231TADS042)
                </p>
                <p>
                  <strong className="text-[#0F172A]">Janela:</strong> Hoje, das 11:30 às 13:30 (Válido)
                </p>
                <p>
                  <strong className="text-[#0F172A]">Local:</strong> Refeitório IFSP Central - Catraca 02
                </p>
              </div>

              {/* Actions row */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={onOpenFullTicket}
                  className="flex-1 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] text-xs font-medium py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Ver Comprovante</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-white border border-transparent hover:border-[#E2E8F0] rounded-lg transition cursor-pointer"
                  title="Redefinir / Simular Novamente"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
