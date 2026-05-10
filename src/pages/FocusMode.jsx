import { motion } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const tips = [
  'Close all unnecessary browser tabs.',
  'Put your phone face-down or in another room.',
  'Use headphones with ambient or lo-fi music.',
  'Set a clear goal before starting your session.',
  'Take a 5-minute break every 25 minutes (Pomodoro).',
]

const modes = [
  { id: 'deep', label: 'Deep Work', icon: '🧠', duration: '90 min', desc: 'For complex thinking and creative problems' },
  { id: 'pomodoro', label: 'Pomodoro', icon: '🍅', duration: '25 min', desc: 'Classic focused sprints with breaks' },
  { id: 'flow', label: 'Flow State', icon: '🌊', duration: 'Unlimited', desc: 'Let the work pull you in naturally' },
]

const ambients = ['🌧️ Rain', '🌊 Ocean', '🌲 Forest', '🔥 Fireplace', '⬛ Silence']

const FocusMode = () => {
  const { darkMode } = useApp()
  const [selectedMode, setSelectedMode] = useState('pomodoro')
  const [selectedAmbient, setSelectedAmbient] = useState(0)
  const [started, setStarted] = useState(false)

  return (
    <div className='w-full space-y-12'>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className='text-center'>
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Distraction-Free Zone</p>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-black mb-5' style={{ fontFamily: 'Syne, sans-serif' }}>
          🎯 Focus <span className='gradient-text'>Mode</span>
        </h1>
        <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Choose a mode, set your ambience, and go deep.
        </p>
      </motion.div>

      {/* Mode selector */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Choose Your Mode</p>
        <div className='grid md:grid-cols-3 gap-6'>
          {modes.map((mode) => (
            <button key={mode.id} onClick={() => setSelectedMode(mode.id)}
              className={`relative p-8 rounded-2xl border-2 text-left transition-all duration-300 ${
                selectedMode === mode.id
                  ? darkMode ? 'border-cyan-500/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' : 'border-cyan-400 bg-cyan-50 shadow-lg'
                  : darkMode ? 'border-white/[0.07] bg-white/[0.03] hover:border-white/20' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              {selectedMode === mode.id && <motion.div layoutId='mode-indicator' className='absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-cyan-400' />}
              <div className='text-4xl mb-4'>{mode.icon}</div>
              <div className='font-bold text-lg mb-1' style={{ fontFamily: 'Syne, sans-serif' }}>{mode.label}</div>
              <div className={`text-xs font-mono font-bold mb-3 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{mode.duration}</div>
              <div className={`text-sm leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{mode.desc}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Ambient selector */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className={`p-8 rounded-2xl border ${darkMode ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-gray-100'}`}
      >
        <p className={`text-xs font-bold uppercase tracking-widest mb-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Ambient Sound</p>
        <div className='flex flex-wrap gap-4'>
          {ambients.map((a, i) => (
            <button key={a} onClick={() => setSelectedAmbient(i)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                selectedAmbient === i
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-transparent shadow-lg'
                  : darkMode ? 'bg-white/[0.05] border-white/10 text-gray-400 hover:text-white hover:border-white/20' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-800'
              }`}
            >{a}</button>
          ))}
        </div>
      </motion.div>

      {/* Feature trio */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className='grid md:grid-cols-3 gap-6'
      >
        {[
          { icon: '🧠', title: 'Deep Work', desc: 'Concentration-enhancing environments' },
          { icon: '🔕', title: 'No Distractions', desc: 'Peaceful workspace for peak efficiency' },
          { icon: '🚀', title: 'Peak Performance', desc: 'Hit daily goals faster and smarter' },
        ].map((card, i) => (
          <div key={card.title}
            className={`p-8 rounded-2xl border text-center ${darkMode ? 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06]' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'} transition-all`}
          >
            <div className='text-4xl mb-4 animate-float' style={{ animationDelay: `${i * 0.4}s` }}>{card.icon}</div>
            <h3 className='font-bold text-lg mb-2' style={{ fontFamily: 'Syne, sans-serif' }}>{card.title}</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{card.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Tips */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
        className={`p-8 rounded-2xl border ${darkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-gray-50 border-gray-100'}`}
      >
        <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>💡 Focus Tips</p>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {tips.map((tip, i) => (
            <div key={i} className='flex items-start gap-3'>
              <span className='text-cyan-400 text-xs mt-0.5 font-mono font-bold'>0{i + 1}</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tip}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Launch button */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className='text-center pb-8'>
        <button onClick={() => setStarted(!started)}
          className='btn-primary relative inline-flex items-center gap-3 px-14 py-5 rounded-2xl text-white font-black text-xl shadow-2xl shadow-cyan-500/30 overflow-hidden z-10'
        >
          <span className='relative z-10'>{started ? '⏹ End Session' : '▶ Launch Focus Session'}</span>
        </button>
        {started && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className='mt-5 text-base text-cyan-400 font-semibold'>
            🔴 Session in progress — stay locked in!
          </motion.p>
        )}
      </motion.div>

    </div>
  )
}

export default FocusMode
