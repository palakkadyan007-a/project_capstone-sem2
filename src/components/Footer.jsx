import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Footer = () => {
  const { darkMode } = useApp()

  return (
    <footer
      className={`mt-auto border-t backdrop-blur-xl py-12 px-8 transition-all duration-500 ${
        darkMode
          ? 'border-white/[0.06] bg-black/40'
          : 'border-gray-100 bg-white/60'
      }`}
    >
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8'>

          {/* Brand */}
          <div>
            <h2
              className='text-2xl font-black mb-2 gradient-text'
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              FocusX
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Master your productivity, one session at a time.
            </p>
          </div>

          {/* Nav links */}
          <div className='flex gap-6'>
            {['/', '/dashboard', '/reports', '/focus'].map((path) => {
              const labels = { '/': 'Home', '/dashboard': 'Dashboard', '/reports': 'Reports', '/focus': 'Focus' }
              return (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium transition-colors ${
                    darkMode
                      ? 'text-gray-500 hover:text-white'
                      : 'text-gray-400 hover:text-gray-800'
                  }`}
                >
                  {labels[path]}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Divider */}
        <div className={`my-8 border-t ${darkMode ? 'border-white/[0.06]' : 'border-gray-100'}`} />

        {/* Bottom row */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-xs'>
          <p className={darkMode ? 'text-gray-600' : 'text-gray-300'}>
            Built with React · Tailwind CSS · Framer Motion · Recharts
          </p>
          <p className={`font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Capstone Project · Palak Kadyan · B.Tech AI & ML
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer