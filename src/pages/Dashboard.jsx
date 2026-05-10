import FocusTimer from '../components/FocusTimer'
import StatsCard from '../components/StatsCard'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

const progressItems = [
  { label: 'Study Goal', pct: 80, color: 'from-cyan-400 to-cyan-500', glow: 'shadow-cyan-500/40' },
  { label: 'Focus Sessions', pct: 65, color: 'from-purple-400 to-purple-600', glow: 'shadow-purple-500/40' },
  { label: 'Distraction Control', pct: 90, color: 'from-green-400 to-emerald-500', glow: 'shadow-green-500/40' },
]

const insightCards = [
  { emoji: '🔥', title: 'Peak Focus', desc: 'Best productivity between 9–11 AM', color: 'from-orange-500/20 to-red-500/5', border: 'border-orange-500/20' },
  { emoji: '⚡', title: 'Energy Level', desc: 'High intensity detected in morning sessions', color: 'from-yellow-500/20 to-yellow-600/5', border: 'border-yellow-500/20' },
  { emoji: '📚', title: 'Study Insights', desc: 'Long-term consistency improving each week', color: 'from-blue-500/20 to-indigo-500/5', border: 'border-blue-500/20' },
]

const Dashboard = () => {
  const { sessions, darkMode } = useApp()

  const totalTime = sessions.reduce((acc, item) => acc + item.duration, 0)
  const efficiency = Math.min(((totalTime / 10) * 100) / 100, 100).toFixed(1)

  const statsData = [
    { title: 'Focus Sessions', value: sessions.length, icon: '🎯', trend: '+12%' },
    { title: 'Total Focus Time', value: `${totalTime}s`, icon: '⏱️', trend: '+8%' },
    { title: 'Efficiency Score', value: `${efficiency}%`, icon: '📊', trend: '+5%' },
  ]

  return (
    <div className='w-full space-y-20'>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className='text-center'>
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Your Workspace</p>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-black' style={{ fontFamily: 'Syne, sans-serif' }}>
          Productivity <span className='gradient-text'>Dashboard</span>
        </h1>
      </motion.div>

      {/* Stats */}
      <div className='grid md:grid-cols-3 gap-8'>
        {statsData.map((s, i) => (
          <motion.div key={s.title} custom={i} variants={fadeUp} initial='hidden' animate='visible'>
            <StatsCard title={s.title} value={s.value} icon={s.icon} trend={s.trend} />
          </motion.div>
        ))}
      </div>

      {/* Timer + Progress */}
      <div className='grid lg:grid-cols-2 gap-10'>
        <motion.div custom={0} variants={fadeUp} initial='hidden' animate='visible'>
          <FocusTimer />
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial='hidden' animate='visible'
          className={`p-10 rounded-3xl border ${darkMode ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-gray-100 shadow-sm'}`}
        >
          <div className='flex items-center gap-3 mb-10'>
            <div className='w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-xl'>📊</div>
            <div>
              <h2 className='text-xl font-bold' style={{ fontFamily: 'Syne, sans-serif' }}>Daily Progress</h2>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Updated in real-time</p>
            </div>
          </div>
          <div className='space-y-10'>
            {progressItems.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                <div className='flex justify-between mb-3 text-sm font-semibold'>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.label}</span>
                  <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.pct}%</span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${darkMode ? 'bg-white/[0.06]' : 'bg-gray-100'}`}>
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} shadow-lg ${item.glow}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Insights */}
      <div>
        <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Productivity Insights</p>
        <div className='grid md:grid-cols-3 gap-8'>
          {insightCards.map((card, i) => (
            <motion.div
              key={card.title} custom={i} variants={fadeUp} initial='hidden' whileInView='visible' viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`p-10 rounded-3xl border bg-gradient-to-b transition-all duration-300 card-lift ${card.color} ${card.border}`}
            >
              <div className='text-4xl mb-5 animate-float' style={{ animationDelay: `${i * 0.6}s` }}>{card.emoji}</div>
              <h3 className='text-xl font-bold mb-3' style={{ fontFamily: 'Syne, sans-serif' }}>{card.title}</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent sessions */}
      {sessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className={`p-10 rounded-3xl border ${darkMode ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-gray-100 shadow-sm'}`}
        >
          <h2 className='text-xl font-bold mb-6' style={{ fontFamily: 'Syne, sans-serif' }}>📋 Recent Sessions</h2>
          <div className='space-y-3'>
            {sessions.slice(-5).reverse().map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-colors ${darkMode ? 'bg-white/[0.04] hover:bg-white/[0.07]' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 rounded-full bg-cyan-400' />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Session on {s.date}</span>
                </div>
                <span className='text-sm font-bold font-mono text-cyan-400'>{s.duration}s</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Dashboard