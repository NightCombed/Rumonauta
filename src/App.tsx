import { useState } from 'react'
import { MobileHeader } from './components/MobileHeader'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileHomeBento } from './components/MobileHomeBento'
import { MobileCrewScreen } from './components/MobileCrewScreen'
import { MobileCopilotScreen } from './components/MobileCopilotScreen'
import { MobileAcademicScreen } from './components/MobileAcademicScreen'
import { AddActivityModal } from './components/AddActivityModal'
import { RuModal } from './components/RuModal'
import { ScenarioSimulatorModal } from './components/ScenarioSimulatorModal'
import { INITIAL_ACTIVITIES, INITIAL_SUBJECTS } from './mockData'
import type { Activity, MobileTab, Subject, ThemeMode, CountdownScenario, RuTicketScenario } from './types'
import { Check } from 'lucide-react'

export function App() {
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [currentTab, setCurrentTab] = useState<MobileTab>('home')
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES)
  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS)
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false)
  const [isRuModalOpen, setIsRuModalOpen] = useState(false)
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false)
  const [countdownScenario, setCountdownScenario] = useState<CountdownScenario>('warning')
  const [ruScenario, setRuScenario] = useState<RuTicketScenario>('scheduled')
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState<string | undefined>()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const handleToggleActivity = (id: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const nextState = !act.completed
          showToast(
            nextState
              ? `Atividade concluída`
              : `Atividade reaberta na rota`
          )
          return { ...act, completed: nextState }
        }
        return act
      })
    )
  }

  const handleDeleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id))
    showToast('Atividade removida da turma')
  }

  const handleAddActivity = (newActivityData: Omit<Activity, 'id' | 'completed'>) => {
    const newAct: Activity = {
      ...newActivityData,
      id: `act-${Date.now()}`,
      completed: false,
    }
    setActivities((prev) => [newAct, ...prev])
    showToast('Atividade adicionada ao mapa')
  }

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-200 antialiased ${
        isDark ? 'bg-[#000000] text-white' : 'bg-[#F5F5F7] text-[#111111]'
      }`}
    >
      {/* 1. Header (Apple-style, tag IF removed) */}
      <MobileHeader
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* 2. Main Responsive Content (Occupies 100% of screen naturally) */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-4 pb-28">
        {currentTab === 'home' && (
          <MobileHomeBento
            theme={theme}
            activities={activities}
            onToggleActivity={handleToggleActivity}
            onOpenAddModal={() => setIsAddActivityOpen(true)}
            onOpenFullVoucher={() => setIsRuModalOpen(true)}
            onOpenCopilot={(prompt?: string) => {
              setCopilotInitialPrompt(prompt)
              setCurrentTab('copilot')
            }}
            onViewAllCrew={() => setCurrentTab('crew')}
            onViewGrades={() => setCurrentTab('grades')}
            countdownScenario={countdownScenario}
            ruScenario={ruScenario}
            onSelectRuScenario={setRuScenario}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
          />
        )}

        {currentTab === 'crew' && (
          <MobileCrewScreen
            theme={theme}
            activities={activities}
            onToggleActivity={handleToggleActivity}
            onOpenAddModal={() => setIsAddActivityOpen(true)}
            onDeleteActivity={handleDeleteActivity}
          />
        )}

        {currentTab === 'copilot' && (
          <MobileCopilotScreen
            theme={theme}
            onBackToHome={() => setCurrentTab('home')}
            initialQuestion={copilotInitialPrompt}
          />
        )}

        {currentTab === 'grades' && (
          <MobileAcademicScreen
            theme={theme}
            subjects={subjects}
          />
        )}
      </main>

      {/* 3. Native iOS Fixed Bottom Tab Bar (Height 60px) */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCopilotInitialPrompt(undefined)
          setCurrentTab(tab)
        }}
        theme={theme}
        pendingActivitiesCount={activities.filter((a) => !a.completed).length}
      />

      {/* Subtle Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#111111] dark:bg-white text-white dark:text-black text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal: Nova Atividade */}
      <AddActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        onAdd={handleAddActivity}
        theme={theme}
      />

      {/* Modal: Comprovante RU Completo */}
      <RuModal
        isOpen={isRuModalOpen}
        onClose={() => setIsRuModalOpen(false)}
        theme={theme}
      />

      {/* Modal: Simulador de Cenários (Preview) */}
      <ScenarioSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        currentScenario={countdownScenario}
        onSelectScenario={(scen) => {
          setCountdownScenario(scen)
          showToast(`Cenário ativado: ${
            scen === 'calm'
              ? 'Tranquilo (> 24h)'
              : scen === 'warning'
              ? 'Perto do prazo (< 24h)'
              : scen === 'urgent'
              ? 'Urgente (< 2h)'
              : scen === 'done'
              ? 'Tudo em dia'
              : 'Alerta de Faltas (Exceção)'
          }`)
        }}
        currentRuScenario={ruScenario}
        onSelectRuScenario={(ruScen) => {
          setRuScenario(ruScen)
          showToast(`RU alterado para: ${
            ruScen === 'scheduled'
              ? 'Agendado (11h00)'
              : ruScen === 'generated'
              ? 'Ticket Gerado ✓'
              : 'Falha na Automação'
          }`)
        }}
        theme={theme}
      />
    </div>
  )
}

export default App
