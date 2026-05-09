import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { darkMode, setDarkMode } = useApp()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10 px-10 py-5 flex justify-between items-center shadow-2xl'
    >
      <h1 className='text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
        FocusX
      </h1>

      <div className='flex gap-8 items-center text-lg font-semibold'>
        <Link className='hover:text-cyan-400 transition' to='/'>
          Home
        </Link>

        <Link className='hover:text-cyan-400 transition' to='/dashboard'>
          Dashboard
        </Link>

        <Link className='hover:text-cyan-400 transition' to='/reports'>
          Reports
        </Link>

        <Link className='hover:text-cyan-400 transition' to='/focus'>
          Focus Mode
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className='bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 rounded-full hover:scale-105 transition'
        >
          {darkMode ? '☀' : '🌙'}
        </button>
      </div>
    </motion.nav>
  )
}

export default Navbar