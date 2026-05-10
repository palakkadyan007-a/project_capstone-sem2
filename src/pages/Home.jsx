import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

const features = [
  { icon: '⏳', title: 'Focus Sessions', desc: 'Track productive study and work sessions with smart focus timers and advanced analytics.', color: 'from-cyan-500/20 to-cyan-600/5', border: 'border-cyan-500/20', tag: 'Timer' },
  { icon: '📈', title: 'Smart Analytics', desc: 'Visualize your productivity growth using modern charts, statistics, and interactive reports.', color: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/20', tag: 'Insights' },
  { icon: '🎯', title: 'Focus Mode', desc: 'Eliminate distractions and create a deep work environment with immersive focus mode.', color: 'from-pink-500/20 to-pink-600/5', border: 'border-pink-500/20', tag: 'Deep Work' },
]

const stats = [
  { value: '10K+', label: 'Sessions Tracked' },
  { value: '98%', label: 'Focus Accuracy' },
  { value: '3.5x', label: 'Productivity Boost' },
  { value: '500+', label: 'Active Users' },
]

const Home = () => {
  const { darkMode } = useApp()

  return (
    <div className='w-full space-y-24'>

      {/* HERO */}
      <section className='w-full min-h-[80vh] flex flex-col justify-center items-center text-center pt-10 pb-10'>
        <motion.div custom={0} variants={fadeUp} initial='hidden' animate='visible'
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-10 border ${
            darkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
          }`}
        >
          <span className='w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse' />
          Now Tracking — v2.0 Live
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial='hidden' animate='visible'
          className='text-6xl md:text-8xl lg:text-9xl font-black leading-[1.05] tracking-tight mb-8'
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Master Your
          <br />
          <span className='gradient-text animate-shimmer'>Productivity</span>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial='hidden' animate='visible'
          className={`text-lg md:text-xl max-w-3xl leading-relaxed mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          An advanced productivity analytics platform designed to help students and professionals
          track focus sessions, eliminate distractions, and visualize performance with beautiful interactive reports.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} initial='hidden' animate='visible'
          className='flex flex-wrap gap-4 justify-center'
        >
          <Link to='/dashboard' className='btn-primary relative px-10 py-4 rounded-2xl text-white font-bold text-base shadow-xl shadow-cyan-500/20 z-10 overflow-hidden'>
            <span className='relative z-10'>🚀 Start Tracking</span>
          </Link>
          <Link to='/focus'
            className={`px-10 py-4 rounded-2xl font-bold text-base border-2 transition-all duration-300 ${
              darkMode ? 'border-white/15 text-white hover:bg-white/8 hover:border-white/30' : 'border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            🎯 Enter Focus Mode
          </Link>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className={`w-full py-10 px-10 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-8 border ${
          darkMode ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-white border-gray-100 shadow-sm'
        }`}
      >
        {stats.map((s, i) => (
          <motion.div key={s.label} custom={i} variants={fadeUp} initial='hidden' animate='visible' className='text-center'>
            <div className='text-4xl md:text-5xl font-black gradient-text mb-2' style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
            <div className={`text-xs font-medium uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* FEATURES */}
      <section className='w-full'>
        <motion.div custom={0} variants={fadeUp} initial='hidden' whileInView='visible' viewport={{ once: true }} className='text-center mb-16'>
          <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>What FocusX Offers</p>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-black' style={{ fontFamily: 'Syne, sans-serif' }}>
            Everything you need to <span className='gradient-text'>stay sharp</span>
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {features.map((f, i) => (
            <motion.div
              key={f.title} custom={i} variants={fadeUp} initial='hidden' whileInView='visible' viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative p-10 rounded-3xl border bg-gradient-to-b transition-all duration-300 card-lift ${f.color} ${f.border}`}
            >
              <span className={`absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                darkMode ? 'border-white/10 text-gray-500 bg-white/5' : 'border-gray-100 text-gray-400 bg-gray-50'
              }`}>{f.tag}</span>
              <div className='text-5xl mb-6 animate-float' style={{ animationDelay: `${i * 0.5}s` }}>{f.icon}</div>
              <h3 className='text-2xl font-bold mb-4' style={{ fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
              <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className='w-full relative overflow-hidden rounded-3xl p-16 text-center'
        style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15), rgba(236,72,153,0.1))', border: '1px solid rgba(168,85,247,0.25)' }}
      >
        <h2 className='text-4xl md:text-6xl font-black mb-6' style={{ fontFamily: 'Syne, sans-serif' }}>
          Ready to <span className='gradient-text'>focus deeper?</span>
        </h2>
        <p className={`mb-10 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Start your first session in seconds. No setup required.</p>
        <Link to='/focus' className='btn-primary relative inline-flex items-center gap-2 px-12 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl z-10 overflow-hidden'>
          <span className='relative z-10'>🎯 Enter Focus Mode</span>
        </Link>
      </motion.section>

    </div>
  )
}

export default Home