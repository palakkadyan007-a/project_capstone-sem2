import FocusTimer from '../components/FocusTimer'
import StatsCard from '../components/StatsCard'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { sessions } = useApp()

  const totalTime = sessions.reduce((acc, item) => acc + item.duration, 0)

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-5xl font-extrabold mb-10 text-center'
      >
        📊 Productivity Dashboard
      </motion.h1>

      <div className='grid md:grid-cols-3 gap-8 mb-10'>
        <motion.div whileHover={{ scale: 1.05 }}>
          <StatsCard title='Total Sessions' value={sessions.length} />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <StatsCard title='Total Focus Time' value={`${totalTime}s`} />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <StatsCard
            title='Productivity Score'
            value={`${Math.min(totalTime / 10, 100)}%`}
          />
        </motion.div>
      </div>

      <div className='grid lg:grid-cols-2 gap-10 items-center'>
        <FocusTimer />

        <div className='bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl'>
          <h2 className='text-3xl font-bold mb-6'>
            🎯 Daily Goals
          </h2>

          <div className='space-y-4 text-lg'>
            <div className='flex justify-between'>
              <span>Study Time</span>
              <span>75%</span>
            </div>

            <div className='w-full bg-gray-300 rounded-full h-4'>
              <div className='bg-blue-500 h-4 rounded-full w-[75%]'></div>
            </div>

            <div className='flex justify-between'>
              <span>Focus Sessions</span>
              <span>60%</span>
            </div>

            <div className='w-full bg-gray-300 rounded-full h-4'>
              <div className='bg-purple-500 h-4 rounded-full w-[60%]'></div>
            </div>

            <div className='flex justify-between'>
              <span>Distraction Control</span>
              <span>85%</span>
            </div>

            <div className='w-full bg-gray-300 rounded-full h-4'>
              <div className='bg-green-500 h-4 rounded-full w-[85%]'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard