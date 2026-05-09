import { motion } from 'framer-motion'

const FocusMode = () => {
  return (
    <div className='min-h-[90vh] flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-blue-950'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='bg-white/10 backdrop-blur-lg border border-white/20 text-white p-16 rounded-[40px] shadow-2xl text-center max-w-2xl'
      >
        <h1 className='text-6xl font-extrabold mb-6'>🎯 Focus Mode</h1>

        <p className='text-2xl text-gray-200 leading-relaxed'>
          Eliminate distractions, stay productive, and achieve your goals
          with complete concentration.
        </p>
      </motion.div>
    </div>
  )
}

export default FocusMode