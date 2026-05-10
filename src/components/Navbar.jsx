import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const Navbar = () => {
  const { darkMode, setDarkMode } = useApp()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/reports', label: 'Reports' },
    { to: '/focus', label: 'Focus' },
    { to: '/login', label: 'Login' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
        darkMode
          ? 'bg-black/60 border-white/[0.06] backdrop-blur-2xl'
          : 'bg-white/70 border-black/[0.06] backdrop-blur-2xl shadow-sm'
      }`}
    >
      {/* Full-width inner row */}
      <div className='w-full px-6 md:px-16 lg:px-24 py-4 flex justify-between items-center'>

        {/* Logo */}
        <Link to='/' className='flex items-center gap-3 group'>
          <div className='relative'>
            <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:shadow-cyan-500/40 transition-shadow duration-300'>
              FX
            </div>
            <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity' />
          </div>
          <span className='text-2xl font-black tracking-tight' style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Focus</span>
            <span className='gradient-text'>X</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className='hidden md:flex gap-4 items-center'>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive(link.to)
                  ? darkMode ? 'text-cyan-400' : 'text-cyan-600'
                  : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {isActive(link.to) && (
                <motion.div
                  layoutId='nav-pill'
                  className={`absolute inset-0 rounded-xl ${darkMode ? 'bg-white/[0.07]' : 'bg-black/[0.06]'}`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className='relative z-10'>{link.label}</span>
            </Link>
          ))}

          {/* Dark/Light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-4 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              darkMode
                ? 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                : 'bg-gray-900/10 hover:bg-gray-900/15 text-gray-800 border border-black/10'
            }`}
          >
            <AnimatePresence mode='wait'>
              {darkMode ? (
                <motion.span key='sun' initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                  ☀️
                </motion.span>
              ) : (
                <motion.span key='moon' initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
                  🌙
                </motion.span>
              )}
            </AnimatePresence>
            <span>{darkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className='md:hidden flex flex-col gap-1.5 p-2' onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-gray-900'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-gray-900'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-gray-900'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`w-full px-6 pb-4 flex flex-col gap-2 md:hidden border-t ${
              darkMode ? 'border-white/10 bg-black/90 backdrop-blur-2xl' : 'border-black/10 bg-white/95 backdrop-blur-2xl'
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                  isActive(link.to)
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400'
                    : darkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className='mt-2 px-4 py-3 rounded-xl font-bold text-left bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400'
            >
              {darkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
