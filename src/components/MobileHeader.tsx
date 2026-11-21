import React from 'react'
import { SailboatLogo } from './SailboatLogo'
import { Sun, Moon } from 'lucide-react'
import type { ThemeMode } from '../types'

interface MobileHeaderProps {
  theme: ThemeMode
  onToggleTheme: () => void
  onOpenSimulator?: () => void
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenSimulator,
}) => {
  const isDark = theme === 'dark'

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 backdrop-blur-xl border-b ${
        isDark
          ? 'bg-black/80 border-[#27272A] text-white'
          : 'bg-[#F5F5F7]/80 border-[#E5E5EA] text-[#111111]'
      }`}
    >
      <div className="max-w-xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Sailboat Icon + Brand */}
        <div className="flex items-center gap-2.5">
          <div className="shrink-0 flex items-center justify-center">
            <SailboatLogo size={32} darkMode={isDark} />
          </div>
          <span className="font-bold text-[17px] tracking-tight leading-none select-none">
            Rumonauta
          </span>
        </div>

        {/* Right: Theme Toggle + User Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
            title={isDark ? 'Modo Claro' : 'Modo Escuro'}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#121214] hover:bg-[#1E1E22] border-[#27272A] text-white'
                : 'bg-white hover:bg-[#E5E5EA] border-[#E5E5EA] text-[#111111]'
            }`}
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 stroke-[2.2]" />
            ) : (
              <Moon className="w-3.5 h-3.5 stroke-[2.2]" />
            )}
          </button>

          {/* Monochromatic Student Avatar / Simulator Trigger */}
          <button
            type="button"
            onClick={onOpenSimulator}
            aria-label="Abrir Simulador de Cenários"
            title="Simulador de Cenários (Preview)"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold tracking-tight select-none transition-transform active:scale-95 cursor-pointer relative ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-[#111111] text-white hover:bg-neutral-800'
            }`}
          >
            LM
            {/* Indicator badge for scenarios */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22C55E] ring-2 ring-white dark:ring-black animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  )
}
