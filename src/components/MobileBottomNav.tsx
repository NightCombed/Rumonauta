import React from 'react'
import { Compass, Users, Route, GraduationCap } from 'lucide-react'
import type { MobileTab, ThemeMode } from '../types'

interface MobileBottomNavProps {
  currentTab: MobileTab
  onSelectTab: (tab: MobileTab) => void
  theme: ThemeMode
  pendingActivitiesCount?: number
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  theme,
  pendingActivitiesCount = 0,
}) => {
  const isDark = theme === 'dark'

  const tabs: { id: MobileTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    {
      id: 'home',
      label: 'Início',
      icon: Compass,
    },
    {
      id: 'crew',
      label: 'Turma',
      icon: Users,
      badge: pendingActivitiesCount > 0 ? pendingActivitiesCount : undefined,
    },
    {
      id: 'copilot',
      label: 'Copiloto',
      icon: Route,
    },
    {
      id: 'grades',
      label: 'Notas',
      icon: GraduationCap,
    },
  ]

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t transition-colors duration-200 ${
        isDark
          ? 'bg-black/85 border-[#27272A]'
          : 'bg-[#F5F5F7]/85 border-[#E5E5EA]'
      }`}
    >
      <div className="max-w-xl mx-auto h-16 px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors relative cursor-pointer ${
                isActive
                  ? 'text-[#22C55E]'
                  : isDark
                  ? 'text-[#71717A] hover:text-[#A1A1AA]'
                  : 'text-[#8E8E93] hover:text-[#555555]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-105 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-2.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight font-mono tabular-nums ${
                      isDark
                        ? 'bg-white text-black'
                        : 'bg-[#111111] text-white'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] mt-1 tracking-tight ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#22C55E]" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
