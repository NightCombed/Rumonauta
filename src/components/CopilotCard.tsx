import React, { useState, useRef, useEffect } from 'react'
import {
  Compass,
  Route,
  Send,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react'
import type { ChatMessage } from '../types'
import { INITIAL_CHAT_MESSAGES } from '../mockData'

export const CopilotCard: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickSuggestions = [
    'O que devo estudar hoje?',
    'Como estão minhas faltas?',
    'Qual é o cardápio do RU hoje?',
    'Quanto preciso tirar na P2 de Cálculo I?',
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const generateCopilotResponse = (userQuestion: string): string => {
    const q = userQuestion.toLowerCase()

    if (q.includes('falta') || q.includes('presen') || q.includes('frequenc')) {
      return (
        '⚠️ **Status Crítico de Presença (SUAP):**\n\n' +
        '• **Cálculo I:** 14 faltas acumuladas de um teto de 18 (78.5% de frequência). Você só pode ter mais **4 horas de falta** até o final do semestre para não reprovar por infrequência.\n' +
        '• **Física II:** 8 faltas de 16 (80.0% freq.) — Estável, mas requer atenção.\n' +
        '• **Banco de Dados:** 4 faltas de 18 (89.0% freq.) — Situação tranquila.\n' +
        '• **Programação Web:** 2 faltas de 20 (95.0% freq.) — Excelente margem.\n\n' +
        '💡 *Recomendação do Copiloto:* Não falte na aula de Cálculo da próxima segunda-feira!'
      )
    }

    if (q.includes('estud') || q.includes('hoje') || q.includes('prioridad')) {
      return (
        '🧭 **Plano de Rota de Estudos para Hoje:**\n\n' +
        '1. **Prioridade Máxima (Urgente):** Resolver os últimos 4 exercícios da *Lista 04 de Física II* (Gravitação e Ondas). O prazo se encerra amanhã às 23:59.\n' +
        '2. **Prioridade Média:** Revisar Frações Parciais para Cálculo I (a lista colaborativa postada por você vence em 6 dias).\n' +
        '3. **Prioridade Regular:** Adiantar o CRUD em React de Programação Web com o Mateus Alencar.\n\n' +
        'Você quer que eu liste as questões com maior peso da lista de Física?'
      )
    }

    if (q.includes('ru') || q.includes('almoç') || q.includes('cardapio') || q.includes('comida')) {
      return (
        '🍽️ **Cardápio do RU (Hoje - Almoço 11:30 às 13:30):**\n\n' +
        '• **Prato Principal:** Iscas de Frango Grelhado ao Molho de Ervas\n' +
        '• **Opção Vegetariana:** Quibe Assado de Lentilha e Cogumelos Paris\n' +
        '• **Guarnições:** Arroz (integral/branco) e Feijão Carioca Selecionado\n' +
        '• **Sobremesa:** Laranja Pera fresca e Suco natural de Maracujá\n\n' +
        'Seu ticket digital pode ser gerado instantaneamente no card de Ação Rápida ao lado!'
      )
    }

    if (q.includes('nota') || q.includes('p2') || q.includes('cálculo') || q.includes('media')) {
      return (
        '📊 **Projeção de Notas SUAP — Cálculo I:**\n\n' +
        '• P1 (peso 0.4): Nota 6.5\n' +
        '• Listas (peso 0.2): Nota 7.5\n' +
        '• P2 (peso 0.4): Pendente\n\n' +
        'Para manter sua média acima de 6.0 (critério de aprovação direta do IF), você precisa tirar no mínimo **5.25 na P2**. Mantendo seu ritmo atual, sua projeção estimada é 7.1!'
      )
    }

    return (
      `Entendi a sua dúvida sobre "${userQuestion}". Com base no registro acadêmico do seu diário de bordo e nas datas colaborativas da turma, sua rota está sob controle hoje. A principal entrega imediata permanece sendo a Lista de Física II e o cuidado com a presença em Cálculo I.`
    )
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const replyText = generateCopilotResponse(text)
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'copilot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  const handleClearHistory = () => {
    setMessages(INITIAL_CHAT_MESSAGES)
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-none flex flex-col justify-between transition-all">
      {/* Copilot Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-md text-[#4F46E5]">
              <Compass className="w-4 h-4 text-[#4F46E5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-[#0F172A] tracking-tight">
                  Copiloto de Bordo
                </h2>
                <span className="text-[10px] font-semibold text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded border border-[#C7D2FE]">
                  IA Contextual
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Monitoramento contínuo do diário acadêmico e rotas
              </p>
            </div>
          </div>

          <button
            onClick={handleClearHistory}
            title="Reiniciar conversa do Copiloto"
            className="text-xs text-[#64748B] hover:text-[#0F172A] p-1.5 hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] rounded-md transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Proactive Route Alert Banner (Required by prompt) */}
        <div className="mb-4 p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <div className="flex items-start gap-2.5">
            <div className="p-1 bg-amber-50 border border-amber-200 text-amber-700 rounded shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold tracking-wide uppercase text-amber-800">
                  Aviso de rota proativo
                </span>
                <span className="text-[10px] text-[#64748B] font-mono">
                  Baseado em dados SUAP
                </span>
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed">
                Você tem <strong className="text-amber-800 font-semibold">14 faltas em Cálculo I</strong> (limite estrito: 18) e uma <strong className="text-[#0F172A] font-semibold">lista de Física vence amanhã</strong>. Recomendo priorizar a lista hoje à tarde.
              </p>

              {/* Action shortcuts */}
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSendMessage('Como estão minhas faltas?')}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] hover:text-[#4338CA] bg-white border border-[#E2E8F0] px-2 py-1 rounded transition cursor-pointer"
                >
                  <span>Analisar faltas de Cálculo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage('O que devo estudar hoje?')}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0F172A] hover:text-[#4F46E5] bg-white border border-[#E2E8F0] px-2 py-1 rounded transition cursor-pointer"
                >
                  <span>Plano de estudo para Física</span>
                  <BookOpen className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Chat Stream Area */}
        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 mb-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 text-xs ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'copilot' && (
                <div className="w-6 h-6 rounded-md bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Route className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]'
                }`}
              >
                <div className="whitespace-pre-line text-xs">
                  {msg.text}
                </div>
                <div
                  className={`text-[9px] font-mono mt-1 ${
                    msg.sender === 'user' ? 'text-slate-400 text-right' : 'text-[#64748B]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-md bg-[#0F172A] text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                  LS
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2.5 text-xs items-center">
              <div className="w-6 h-6 rounded-md bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center shrink-0">
                <Route className="w-3.5 h-3.5 text-[#22C55E]" />
              </div>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-[#64748B] ml-1">Copiloto calculando rota...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="pt-2 border-t border-[#E2E8F0] mb-3">
          <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
            Sugestões Rápidas:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(suggestion)}
                className="text-xs bg-[#F8FAFC] hover:bg-white text-[#0F172A] hover:text-[#4F46E5] border border-[#E2E8F0] hover:border-[#4F46E5] px-2.5 py-1 rounded-md transition text-left cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage()
        }}
        className="relative mt-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pergunte ao Copiloto (ex: Como calcular nota da P2?)"
          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-3 pr-10 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          title="Enviar mensagem"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-[#CBD5E1] text-white rounded-md transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  )
}
