'use client'

import { useEffect, useRef } from 'react'

// Lightweight CSS-based animated background with floating geometric shapes
export default function DataFlowBackground() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 80%)',
        WebkitMaskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 80%)',
      }}
    >
      {/* Animated gradient orbs - pure CSS, very smooth */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-[40%] w-80 h-80 bg-navy-400/5 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-teal-300/3 rounded-full blur-3xl animate-float-fast" />
      </div>

      {/* Geometric grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e3a5f 1px, transparent 1px),
            linear-gradient(to bottom, #1e3a5f 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating data blocks - CSS only - positioned on left side only */}
      <div className="absolute inset-0">
        {/* Block 1 */}
        <div className="absolute top-[15%] left-[8%] w-5 h-5 bg-teal-400/40 rounded-sm animate-float-block-1" />
        {/* Block 2 */}
        <div className="absolute top-[25%] left-[22%] w-7 h-7 bg-teal-300/45 rounded-sm animate-float-block-2" />
        {/* Block 3 */}
        <div className="absolute top-[45%] left-[5%] w-4 h-4 bg-teal-500/35 rounded-sm animate-float-block-3" />
        {/* Block 4 */}
        <div className="absolute top-[60%] left-[18%] w-6 h-6 bg-teal-400/42 rounded-sm animate-float-block-4" />
        {/* Block 5 */}
        <div className="absolute bottom-[30%] left-[10%] w-5 h-5 bg-teal-300/35 rounded-sm animate-float-block-5" />
        {/* Block 6 */}
        <div className="absolute top-[20%] left-[30%] w-4 h-4 bg-teal-400/40 rounded-sm animate-float-block-6" />
        {/* Block 7 */}
        <div className="absolute bottom-[25%] left-[25%] w-6 h-6 bg-teal-300/38 rounded-sm animate-float-block-1" />
        {/* Block 8 */}
        <div className="absolute top-[70%] left-[20%] w-5 h-5 bg-teal-400/35 rounded-sm animate-float-block-3" />
        {/* Block 9 - extra */}
        <div className="absolute top-[35%] left-[12%] w-4 h-4 bg-teal-500/40 rounded-sm animate-float-block-4" />
        {/* Block 10 - extra */}
        <div className="absolute bottom-[45%] left-[32%] w-5 h-5 bg-teal-300/38 rounded-sm animate-float-block-2" />
      </div>

      {/* Connection lines - SVG for smooth rendering - positioned on left side only */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a9b9b" stopOpacity="0" />
            <stop offset="50%" stopColor="#4a9b9b" stopOpacity="1" />
            <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Diagonal connection lines - positioned on left side only */}
        <line x1="5%" y1="20%" x2="20%" y2="45%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-line-draw" />
        <line x1="12%" y1="15%" x2="28%" y2="35%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-line-draw-delayed" />
        <line x1="8%" y1="60%" x2="22%" y2="75%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-line-draw" />
        <line x1="15%" y1="70%" x2="32%" y2="85%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-line-draw-delayed" />
      </svg>

      {/* Subtle particle dots - positioned on left side only */}
      <div className="absolute inset-0">
        <div className="absolute top-[30%] left-[15%] w-1.5 h-1.5 bg-teal-400/20 rounded-full animate-pulse-slow" />
        <div className="absolute top-[50%] left-[28%] w-1 h-1 bg-navy-500/15 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[40%] left-[10%] w-1.5 h-1.5 bg-teal-500/18 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[65%] left-[22%] w-1 h-1 bg-navy-400/12 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[35%] left-[35%] w-1 h-1 bg-teal-400/15 rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  )
}
