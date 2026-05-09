import { useEffect, useState } from 'react'
import Charts from '../components/Charts'
import Loader from '../components/Loader'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'

const Reports = () => {
  const { sessions } = useApp()

  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load quote')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='text-5xl font-extrabold text-center mb-10'
      >
        📈 Reports & Analytics
      </motion.h1>

      {loading && <Loader />}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-3xl mb-10 shadow-2xl'
        >
          <h2 className='font-bold text-3xl mb-4'>
            💡 Motivational Quote
          </h2>

          <p className='text-xl italic'>{quote}</p>
        </motion.div>
      )}

      <Charts data={sessions} />
    </div>
  )
}

export default Reports