import { useEffect, useState, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const RADIUS = 80
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const FocusTimer = () => {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [saved, setSaved] = useState(false)
  const { addSession, darkMode } = useApp()
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const stopTimer = () => {
    setRunning(false)
    if (seconds > 0) {
      addSession({
        id: Date.now(),
        duration: seconds,
        date: new Date().toLocaleDateString(),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      setSeconds(0)
    }
  }

  const resetTimer = () => {
    setRunning(false)
    setSeconds(0)
    setSaved(false)
  }

  const formatTime = (s) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  // Animate ring every 60s cycle
  const progress = (seconds % 60) / 60
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress)

  return (
    <div
      className={`relative overflow-hidden p-8 rounded-3xl border transition-all ${
        darkMode
          ? 'bg-white/[0.04] border-white/[0.08]'
          : 'bg-white border-gray-100 shadow-sm'
      }`}
    >
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none rounded-3xl' />

      <div className='relative z-10'>
        {/* Header */}
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-xl'>
            ⏱️
          </div>
          <div>
            <h2 className='text-xl font-bold' style={{ fontFamily: 'Syne, sans-serif' }}>
              Focus Timer
            </h2>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {running ? '🔴 Session Active' : seconds > 0 ? '⏸ Paused' : 'Ready to start'}
            </p>
          </div>
        </div>

        {/* Circular timer */}
        <div className='flex justify-center mb-8'>
          <div className='relative'>
            <svg width='200' height='200' className='-rotate-90'>
              {/* Track */}
              <circle
                cx='100' cy='100' r={RADIUS}
                fill='none'
                stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}
                strokeWidth='8'
              />
              {/* Progress */}
              <circle
                cx='100' cy='100' r={RADIUS}
                fill='none'
                stroke='url(#timerGrad)'
                strokeWidth='8'
                strokeLinecap='round'
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                className='transition-all duration-1000 ease-linear'
              />
              <defs>
                <linearGradient id='timerGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
                  <stop offset='0%' stopColor='#22d3ee' />
                  <stop offset='100%' stopColor='#a855f7' />
                </linearGradient>
              </defs>
            </svg>

            {/* Center display */}
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={Math.floor(seconds / 60)}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  className='text-center'
                >
                  <div
                    className='text-3xl font-black font-mono gradient-text'
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    {formatTime(seconds)}
                  </div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                    {Math.floor(seconds / 60) > 0 ? `${Math.floor(seconds / 60)} min` : 'Focus time'}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className='flex gap-3 justify-center'>
          {!running ? (
            <button
              onClick={() => { setRunning(true); setSaved(false) }}
              className='btn-primary flex-1 max-w-[140px] relative px-6 py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg shadow-cyan-500/20 overflow-hidden z-10'
            >
              <span className='relative z-10 flex items-center justify-center gap-2'>
                ▶ {seconds > 0 ? 'Resume' : 'Start'}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setRunning(false)}
              className={`flex-1 max-w-[140px] px-6 py-3.5 rounded-2xl font-bold text-sm border transition-all ${
                darkMode
                  ? 'bg-white/[0.07] border-white/10 text-white hover:bg-white/15'
                  : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⏸ Pause
            </button>
          )}

          <button
            onClick={stopTimer}
            disabled={seconds === 0}
            className={`flex-1 max-w-[140px] px-6 py-3.5 rounded-2xl font-bold text-sm border transition-all ${
              seconds > 0
                ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400 hover:from-red-500/30 hover:to-pink-500/30'
                : darkMode
                ? 'bg-white/[0.03] border-white/[0.06] text-gray-600 cursor-not-allowed'
                : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            ■ Save
          </button>

          <button
            onClick={resetTimer}
            className={`px-4 py-3.5 rounded-2xl font-bold text-sm border transition-all ${
              darkMode
                ? 'bg-white/[0.04] border-white/[0.07] text-gray-500 hover:text-gray-300 hover:border-white/15'
                : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-gray-600 hover:border-gray-200'
            }`}
          >
            ↺
          </button>
        </div>

        {/* Saved toast */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='mt-5 text-center text-sm font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl py-2.5 px-4'
            >
              ✅ Session saved successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FocusTimer