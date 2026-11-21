export type ThemeMode = 'light' | 'dark'

export type MobileTab = 'home' | 'crew' | 'copilot' | 'grades'

export interface Subject {
  id: string
  code: string
  name: string
  professor: string
  average: number
  targetAverage: number
  absences: number
  maxAbsences: number
  attendancePct: number
  workloadHours: number
  grades: {
    name: string
    weight: number
    grade: number | null
  }[]
  nextClass: string
  status: 'warning' | 'normal' | 'good'
}

export interface Activity {
  id: string
  title: string
  subject: string
  subjectCode: string
  dueDate: string
  dueDaysLabel: string
  category: 'Lista' | 'Prova' | 'Trabalho' | 'Seminário' | 'Projeto'
  authorName: string
  authorRole: string
  completed: boolean
  urgent?: boolean
}

export interface ChatMessage {
  id: string
  sender: 'copilot' | 'user'
  text: string
  timestamp: string
  actions?: {
    label: string
    prompt: string
  }[]
}

export interface RuTicket {
  isGenerated: boolean
  ticketId: string | null
  generatedAt: string | null
  validUntil: string | null
  mealType: 'Almoço' | 'Jantar'
  mealTimeWindow: string
  studentName: string
  registration: string
  campus: string
  dietOption: 'Padrão' | 'Vegetariano'
  status: 'ready' | 'used' | 'expired' | null
}

export type CountdownScenario =
  | 'calm'
  | 'warning'
  | 'urgent'
  | 'done'
  | 'absences'

export type RuTicketScenario =
  | 'scheduled'
  | 'generated'
  | 'failed'


