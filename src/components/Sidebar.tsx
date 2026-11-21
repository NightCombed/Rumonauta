import React from 'react'
import {
  Compass,
  Users,
  Route,
  GraduationCap,
  Utensils,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

interface SidebarProps {
  currentTab: string
  onSelectTab: (tab: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Painel de Bordo',
      icon: Compass,
      badge: null,
    },
    {
      id: 'crew',
      label: 'Mapa da Tripulação',
      icon: Users,
      badge: '5 ativ.',
    },
    {
      id: 'copilot',
      label: 'Copiloto IA',
      icon: Route,
      badge: 'Proativo',
    },
    {
      id: 'academic',
      label: 'Notas & Frequência',
      icon: GraduationCap,
      badge: null,
    },
    {
      id: 'ru',
      label: 'Ticket do RU',
      icon: Utensils,
      badge: 'Hoje',
    },
    {
      id: 'schedule',
      label: 'Grade Horária',
      icon: Calendar,
      badge: null,
    },
  ]

  return (
    <aside
      className={`bg-white border-r border-[#E2E8F0] flex flex-col transition-all duration-300 z-20 shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top section: collapse button */}
      <div className="p-3 border-b border-[#E2E8F0] flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] px-2">
            Navegação Principal
          </span>
        )}
        <button
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
          className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] rounded-md transition mx-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav List */}
      <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                isActive
                  ? 'bg-[#4F46E5] text-white shadow-none font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-white' : 'text-[#64748B]'
                }`}
              />
              {!isCollapsed && (
                <span className="truncate flex-1">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer Info Box */}
      {!isCollapsed ? (
        <div className="p-3 m-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-[#0F172A] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              SUAP IFSP Conectado
            </span>
            <a
              href="#suap"
              onClick={(e) => e.preventDefault()}
              className="text-[#64748B] hover:text-[#4F46E5] transition"
              title="Abrir SUAP oficial"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[10px] text-[#64748B] leading-relaxed">
            Sincronização em tempo real de faltas, diário eletrônico e tickets do refeitório.
          </p>
          <div className="mt-2 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
            <span>v2.4.0-if</span>
            <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Online
            </span>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-[#E2E8F0] flex justify-center">
          <div
            title="SUAP Conectado (Online)"
            className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"
          ></div>
        </div>
      )}
    </aside>
  )
}
