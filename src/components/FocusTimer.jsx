import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'

const FocusTimer = () => {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const { addSession } = useApp()

  useEffect(() => {
    let interval

    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [running])

  const stopTimer = () => {
    setRunning(false)

    addSession({
      id: Date.now(),
      duration: seconds,
      date: new Date().toLocaleDateString(),
    })

    setSeconds(0)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 rounded-3xl shadow-2xl text-center'
    >
      <h2 className='text-4xl font-extrabold mb-6'>⏳ Focus Timer</h2>

      <div className='text-7xl font-bold mb-8'>{seconds}s</div>

      <div className='flex justify-center gap-6'>
        <button
          className='bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-full text-lg font-bold shadow-lg'
          onClick={() => setRunning(true)}
        >
          ▶ Start
        </button>

        <button
          className='bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-full text-lg font-bold shadow-lg'
          onClick={stopTimer}
        >
          ■ Stop
        </button>
      </div>
    </motion.div>
  )
}

export default FocusTimer