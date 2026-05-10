import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'

const StatsCard = ({ title, value, icon, trend }) => {
  const { darkMode } = useApp()

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden p-7 rounded-3xl border group cursor-default transition-all duration-300 ${
        darkMode
          ? 'bg-white/[0.04] border-white/[0.08] hover:border-white/20 hover:shadow-2xl'
          : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200'
      }`}
    >
      {/* Background glow */}
      <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl' />

      <div className='flex items-start justify-between mb-5'>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
          darkMode ? 'bg-white/[0.07]' : 'bg-gray-50'
        }`}>
          {icon || '📊'}
        </div>
        {trend && (
          <span className='text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/15 text-green-400'>
            {trend}
          </span>
        )}
      </div>

      <div
        className='text-4xl font-black gradient-text mb-2'
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {value}
      </div>

      <div className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        {title}
      </div>
    </motion.div>
  )
}

export default StatsCard