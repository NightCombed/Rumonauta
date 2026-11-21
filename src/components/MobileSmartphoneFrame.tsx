import React, { useState } from 'react'
import {
  Smartphone,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Wifi,
  Battery,
} from 'lucide-react'
import type { ThemeMode } from '../types'

interface MobileSmartphoneFrameProps {
  children: React.ReactNode
  theme: ThemeMode
  onToggleTheme: () => void
}

export const MobileSmartphoneFrame: React.FC<MobileSmartphoneFrameProps> = ({
  children,
  theme,
  onToggleTheme,
}) => {
  const [isFrameMode, setIsFrameMode] = useState(true)
  const isDark = theme === 'dark'

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-start py-6 px-3 sm:px-6 transition-colors duration-300 ${
        isDark ? 'bg-[#040711] text-slate-100' : 'bg-[#E2E8F0] text-[#0F172A]'
      }`}
    >
      {/* Outer Studio Control Toolbar */}
      <div className={`w-full max-w-2xl mb-4 flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl backdrop-blur-md border shadow-sm text-xs ${isDark ? 'bg-[#111827]/70 border-slate-800' : 'bg-white/70 border-slate-300/60'}`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#22C55E] text-black flex items-center justify-center font-bold">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-[13px] tracking-tight">
              Rumonauta Mobile
            </span>
            <span className={`ml-2 font-mono text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {isFrameMode ? '390 × 844 px (iPhone 14)' : 'Modo Tela Cheia Responsivo'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isDark
                ? 'bg-[#1E293B] hover:bg-[#334155] border-[#334155] text-amber-400'
                : 'bg-[#F8FAFC] hover:bg-white border-[#CBD5E1] text-[#0F172A]'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isDark ? 'Modo Escuro' : 'Modo Claro'}
            </span>
          </button>

          {/* Toggle Frame vs Full View */}
          <button
            type="button"
            onClick={() => setIsFrameMode(!isFrameMode)}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isDark
                ? 'bg-[#1E293B] hover:bg-[#334155] border-[#334155] text-slate-200'
                : 'bg-[#F8FAFC] hover:bg-white border-[#CBD5E1] text-[#0F172A]'
            }`}
          >
            {isFrameMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expandir</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Moldura 390x844</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Device Mockup or Responsive Container */}
      {isFrameMode ? (
        <div className="relative my-auto flex items-center justify-center p-2">
          {/* Smartphone Chassis Exterior Bezel (390 x 844 viewport + chassis) */}
          <div
            className={`relative rounded-[54px] p-3 shadow-2xl transition-all duration-300 border-[10px] ${
              isDark
                ? 'bg-[#0F172A] border-[#1E293B] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10'
                : 'bg-[#0F172A] border-[#334155] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)]'
            }`}
            style={{ width: '410px', height: '864px' }}
          >
            {/* Screen Glass Area (390 x 844 px) */}
            <div
              className={`w-[390px] h-[844px] rounded-[44px] overflow-hidden flex flex-col relative transition-colors duration-200 select-none ${
                isDark ? 'bg-[#090D16]' : 'bg-[#EEF2F6]'
              }`}
            >
              {/* iOS Top Status Bar & Dynamic Island */}
              <div
                className={`h-11 px-6 shrink-0 flex items-center justify-between text-xs font-bold z-30 transition-colors ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                {/* Clock */}
                <span className="font-mono text-[13px] tracking-tight font-extrabold">
                  20:13
                </span>

                {/* Dynamic Island pill */}
                <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 mx-auto -mt-1 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-slate-800"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1E293B] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#22C55E]"></div>
                  </div>
                </div>

                {/* Status Icons: 5G, Wi-Fi, Battery */}
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span>5G</span>
                  <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                  <div className="flex items-center">
                    <Battery className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                </div>
              </div>

              {/* Main App Viewport */}
              <div className="flex-1 overflow-hidden flex flex-col relative">
                {children}
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="h-5 shrink-0 flex items-center justify-center pointer-events-none z-30">
                <div
                  className={`w-36 h-1 rounded-full transition-opacity ${
                    isDark ? 'bg-white opacity-25' : 'bg-black opacity-30'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Width Responsive View */
        <div
          className={`w-full max-w-lg mx-auto rounded-3xl overflow-hidden border shadow-xl flex flex-col min-h-[844px] transition-colors duration-200 ${
            isDark
              ? 'bg-[#090D16] border-[#1E293B]'
              : 'bg-[#EEF2F6] border-[#CBD5E1]'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
