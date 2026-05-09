import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import FocusMode from './pages/FocusMode'

function App() {
  return (
    <div className='min-h-screen text-white'>
      <Navbar />

      <div className='px-6 md:px-16 py-10'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/focus' element={<FocusMode />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App