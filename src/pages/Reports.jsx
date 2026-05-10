import { useEffect, useState } from 'react'
import Charts from '../components/Charts'
import Loader from '../components/Loader'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

const summaryStats = (sessions) => {
  const total = sessions.reduce((a, s) => a + s.duration, 0)
  const best = sessions.length ? Math.max(...sessions.map((s) => s.duration)) : 0
  const avg = sessions.length ? Math.round(total / sessions.length) : 0
  return [
    { label: 'Total Sessions', value: sessions.length, icon: '📅' },
    { label: 'Total Time (s)', value: total, icon: '⏱️' },
    { label: 'Best Session', value: `${best}s`, icon: '🏆' },
    { label: 'Avg Duration', value: `${avg}s`, icon: '📊' },
  ]
}

const Reports = () => {
  const { sessions, darkMode } = useApp()
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://api.quotable.io/random?tags=success|productivity|motivational')
      .then((res) => res.json())
      .then((data) => { setQuote(data.content); setAuthor(data.author); setLoading(false) })
      .catch(() => { setError('Could not load quote'); setLoading(false) })
  }, [])

  const stats = summaryStats(sessions)

  return (
    <div className='w-full space-y-16'>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className='text-center'>
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Your Data</p>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-black' style={{ fontFamily: 'Syne, sans-serif' }}>
          Reports & <span className='gradient-text'>Analytics</span>
        </h1>
      </motion.div>

      {/* Summary stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {stats.map((s, i) => (
          <motion.div key={s.label} custom={i} variants={fadeUp} initial='hidden' animate='visible'
            className={`p-8 rounded-2xl border text-center transition-all card-lift ${
              darkMode ? 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
            }`}
          >
            <div className='text-3xl mb-3'>{s.icon}</div>
            <div className='text-4xl font-black gradient-text mb-2' style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
            <div className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.div custom={0} variants={fadeUp} initial='hidden' animate='visible'>
        {loading && <Loader />}
        {error && (
          <div className={`p-6 rounded-2xl border text-center text-sm ${darkMode ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-100 text-red-500'}`}>{error}</div>
        )}
        {!loading && !error && (
          <div className='relative overflow-hidden p-12 rounded-3xl border'
            style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(168,85,247,0.12), rgba(236,72,153,0.08))', borderColor: 'rgba(168,85,247,0.25)' }}
          >
            <div className='absolute top-4 left-8 text-9xl font-black text-purple-500/10 select-none' style={{ fontFamily: 'Georgia, serif', lineHeight: 1 }}>"</div>
            <div className='flex items-start gap-5 relative z-10'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center text-xl flex-shrink-0 mt-1'>💡</div>
              <div>
                <p className={`text-xl md:text-2xl italic leading-relaxed mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>"{quote}"</p>
                <p className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>— {author}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Session History</p>
        <Charts data={sessions} />
      </motion.div>

      {/* Table */}
      {sessions.length > 0 && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className={`p-10 rounded-3xl border ${darkMode ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-gray-100 shadow-sm'}`}
        >
          <h2 className='text-2xl font-bold mb-8' style={{ fontFamily: 'Syne, sans-serif' }}>🗂 All Sessions</h2>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className={`text-left border-b ${darkMode ? 'border-white/[0.08] text-gray-500' : 'border-gray-100 text-gray-400'}`}>
                  <th className='pb-4 font-bold uppercase tracking-wider text-xs'>#</th>
                  <th className='pb-4 font-bold uppercase tracking-wider text-xs'>Date</th>
                  <th className='pb-4 font-bold uppercase tracking-wider text-xs'>Duration</th>
                  <th className='pb-4 font-bold uppercase tracking-wider text-xs'>Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, i) => (
                  <tr key={s.id} className={`border-b transition-colors ${darkMode ? 'border-white/[0.04] hover:bg-white/[0.04]' : 'border-gray-50 hover:bg-gray-50'}`}>
                    <td className={`py-4 font-mono text-xs ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>{String(i + 1).padStart(2, '0')}</td>
                    <td className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{s.date}</td>
                    <td className='py-4 font-mono font-bold text-cyan-400'>{s.duration}s</td>
                    <td className='py-4'>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.duration > 60 ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                        <span className='w-1.5 h-1.5 rounded-full bg-current' />
                        {s.duration > 60 ? 'Deep Work' : 'Quick'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {sessions.length === 0 && (
        <div className={`text-center py-24 rounded-3xl border border-dashed ${darkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-300'}`}>
          <div className='text-6xl mb-4'>📋</div>
          <p className='font-semibold text-xl'>No sessions yet</p>
          <p className='text-sm mt-2'>Complete a focus session to see your analytics here.</p>
        </div>
      )}
    </div>
  )
}

export default Reports
