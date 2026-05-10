import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import FocusMode from './pages/FocusMode'
import Login from './pages/Login'
import { useApp } from './context/AppContext'

function App() {
  const { darkMode } = useApp()

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 relative ${
        darkMode ? 'dark bg-[#030712] text-white' : 'bg-[#f0f4ff] text-[#0f172a]'
      }`}
    >
      {/* Ambient background orbs */}
      <div className='fixed pointer-events-none inset-0 overflow-hidden z-0' aria-hidden='true'>
        <div className={`absolute w-[700px] h-[700px] rounded-full blur-[140px] top-[-200px] left-[-200px] animate-glow-pulse ${darkMode ? 'bg-cyan-500/10' : 'bg-cyan-400/20'}`} />
        <div className={`absolute w-[600px] h-[600px] rounded-full blur-[140px] bottom-[-200px] right-[-100px] animate-glow-pulse ${darkMode ? 'bg-purple-600/10' : 'bg-purple-400/20'}`} style={{ animationDelay: '1.5s' }} />
        <div className={`absolute w-[400px] h-[400px] rounded-full blur-[100px] top-[40%] left-[40%] animate-glow-pulse ${darkMode ? 'bg-pink-600/8' : 'bg-pink-300/15'}`} style={{ animationDelay: '3s' }} />
        <div className='absolute inset-0 dot-grid' />
      </div>

      <div className='relative z-10 flex flex-col min-h-screen w-full'>
        <Navbar />
        <main className='flex-grow w-full py-12 px-6 md:px-16 lg:px-24'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/focus' element={<FocusMode />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App