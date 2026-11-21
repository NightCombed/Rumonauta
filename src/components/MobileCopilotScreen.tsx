import React, { useState, useRef, useEffect } from 'react'
import {
  Send,
  RotateCcw,
  ArrowLeft,
  Compass,
} from 'lucide-react'
import type { ChatMessage, ThemeMode } from '../types'
import { INITIAL_CHAT_MESSAGES } from '../mockData'

interface MobileCopilotScreenProps {
  theme: ThemeMode
  onBackToHome?: () => void
  initialQuestion?: string
}

export const MobileCopilotScreen: React.FC<MobileCopilotScreenProps> = ({
  theme,
  onBackToHome,
  initialQuestion,
}) => {
  const isDark = theme === 'dark'
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickSuggestions = [
    'O que devo estudar hoje?',
    'Como estão minhas faltas?',
    'Qual é o cardápio do RU hoje?',
    'Quanto preciso na P2 de Cálculo I?',
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
        'Atenção ao status de presença no SUAP:\n\n' +
        '• Cálculo I: 14 faltas de 18 permitidas (78.5% freq). Você possui margem de apenas 4 horas de falta até o encerramento do semestre.\n' +
        '• Física II: 8 faltas de 16 (80.0% freq).\n' +
        '• Banco de Dados: 4 faltas de 18 (89.0% freq).\n' +
        '• Programação Web: 2 faltas de 20 (95.0% freq).\n\n' +
        'Recomendação: Não falte na aula de Cálculo da próxima segunda-feira.'
      )
    }

    if (q.includes('estud') || q.includes('hoje') || q.includes('prioridad')) {
      return (
        'Plano de estudo recomendado para hoje:\n\n' +
        '1. Prioridade imediata: Concluir os últimos exercícios da Lista 04 de Física II. O prazo final é amanhã às 23:59.\n' +
        '2. Médio prazo: Revisar frações parciais para Cálculo I.\n' +
        '3. Projeto: Adiantar o CRUD em React de Programação Web com o Mateus.'
      )
    }

    if (q.includes('ru') || q.includes('almoç') || q.includes('cardapio') || q.includes('comida')) {
      return (
        'Cardápio do RU hoje (Almoço das 11:30 às 13:30):\n\n' +
        '• Prato Principal: Iscas de Frango Grelhado ao Molho de Ervas\n' +
        '• Vegetariano: Quibe Assado de Lentilha e Cogumelos Paris\n' +
        '• Acompanhamentos: Arroz integral/branco e Feijão Carioca\n' +
        '• Sobremesa: Laranja Pera e Suco Natural\n\n' +
        'Seu ticket digital pode ser emitido na tela Início.'
      )
    }

    if (q.includes('nota') || q.includes('p2') || q.includes('cálculo') || q.includes('media')) {
      return (
        'Projeção de notas para Cálculo I (SUAP):\n\n' +
        '• P1 (peso 0.4): Nota 6.5\n' +
        '• Listas (peso 0.2): Nota 7.5\n' +
        '• P2 (peso 0.4): Pendente\n\n' +
        'Para manter a média 6.0 de aprovação direta, você precisa de nota mínima 5.25 na P2.'
      )
    }

    return (
      `Entendi a sua dúvida sobre "${userQuestion}". Com base no registro acadêmico do seu diário de bordo e nas datas colaborativas da turma, sua rota está sob controle hoje. A principal entrega imediata permanece sendo a Lista de Física II.`
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
    }, 600)
  }

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion)
    }
  }, [initialQuestion])

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] max-w-xl mx-auto relative">
      {/* Header with open 3px bar and subtle Compass watermark */}
      <div
        className={`relative pl-4 py-2 border-l-[3px] transition-colors duration-200 overflow-hidden mb-3 ${
          isDark ? 'border-white text-white' : 'border-[#111111] text-[#111111]'
        }`}
      >
        {/* Giant Compass Watermark */}
        <div
          aria-hidden="true"
          className={`absolute -right-4 -bottom-4 pointer-events-none select-none transition-opacity ${isDark ? 'text-white opacity-[0.06]' : 'text-black opacity-[0.04]'}`}
        >
          <Compass className="w-[120px] h-[120px] stroke-[1.2]" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="p-1 rounded-lg hover:bg-black/5 transition cursor-pointer mr-1"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
            <div>
              <h2 className="text-[18px] font-semibold tracking-tight">
                Copiloto
              </h2>
              <p
                className={`text-[13px] font-medium ${
                  isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                }`}
              >
                Assistente de Rota Acadêmica
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMessages(INITIAL_CHAT_MESSAGES)}
            title="Reiniciar conversa"
            className="p-2 text-[#8E8E93] hover:text-[#22C55E] rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages (Apple Messages / Linear style with comfortable spacing) */}
      <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 leading-relaxed text-[15px] ${
                msg.sender === 'user'
                  ? isDark
                    ? 'bg-white text-black font-medium rounded-2xl rounded-br-xs shadow-xs'
                    : 'bg-[#111111] text-white font-medium rounded-2xl rounded-br-xs shadow-xs'
                  : isDark
                  ? 'bg-[#121214] border border-[#27272A] text-white rounded-2xl rounded-tl-xs shadow-xs'
                  : 'bg-white border border-[#E5E5EA] text-[#111111] rounded-2xl rounded-tl-xs shadow-xs'
              }`}
            >
              {msg.sender === 'copilot' && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isDark ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                    }`}
                  >
                    Copiloto
                  </span>
                </div>
              )}

              <div className="whitespace-pre-line text-[15px]">
                {msg.text}
              </div>

              <div
                className={`text-[11px] font-mono mt-2 tabular-nums ${
                  msg.sender === 'user'
                    ? isDark
                      ? 'text-neutral-500 text-right'
                      : 'text-neutral-400 text-right'
                    : isDark
                    ? 'text-[#8E8E93]'
                    : 'text-[#6E6E73]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div
              className={`px-4 py-3 rounded-2xl rounded-tl-xs border flex items-center gap-2 text-[13px] ${
                isDark
                  ? 'bg-[#121214] border-[#27272A] text-[#8E8E93]'
                  : 'bg-white border-[#E5E5EA] text-[#6E6E73]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 text-[13px] font-medium">Analisando rota...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips (Pill-shaped rounded-full buttons directly above input) */}
      <div className="pt-2 pb-1 shrink-0 flex gap-2 overflow-x-auto no-scrollbar">
        {quickSuggestions.map((sugg, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(sugg)}
            className={`text-[13px] font-medium px-3.5 py-1.5 rounded-full border whitespace-nowrap transition cursor-pointer shrink-0 shadow-xs ${
              isDark
                ? 'bg-[#121214] hover:bg-[#1E1E22] border-[#27272A] text-white'
                : 'bg-white hover:bg-[#F5F5F7] border-[#E5E5EA] text-[#111111]'
            }`}
          >
            {sugg}
          </button>
        ))}
      </div>

      {/* Input Field with Apple-style rounded layout */}
      <div className="pt-2 pb-1 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pergunte ao Copiloto..."
            className={`h-12 flex-1 rounded-full px-5 text-[15px] font-normal border focus:outline-none transition-colors shadow-xs ${
              isDark
                ? 'bg-[#121214] border-[#27272A] text-white placeholder-[#8E8E93] focus:border-white'
                : 'bg-white border-[#E5E5EA] text-[#111111] placeholder-[#8E8E93] focus:border-black'
            }`}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs disabled:opacity-40 ${
              inputValue.trim()
                ? 'bg-[#22C55E] text-black hover:bg-[#16A34A]'
                : isDark
                ? 'bg-white text-black'
                : 'bg-[#111111] text-white'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
