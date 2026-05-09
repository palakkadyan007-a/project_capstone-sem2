import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className='min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden'>
      <div className='absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] top-[-100px] left-[-100px]'></div>

      <div className='absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] bottom-[-100px] right-[-100px]'></div>

      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='text-7xl md:text-8xl font-black leading-tight mb-8'
      >
        Master Your
        <span className='block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
          Productivity
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='text-xl text-gray-300 max-w-3xl leading-relaxed mb-12'
      >
        An advanced productivity analytics platform to monitor focus,
        eliminate distractions, track sessions, and improve your daily
        workflow with immersive visual reports.
      </motion.p>

      <div className='grid md:grid-cols-3 gap-8 mt-10 w-full max-w-6xl'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='backdrop-blur-xl bg-white/10 border border-white/10 p-8 rounded-3xl shadow-2xl'
        >
          <h2 className='text-3xl mb-4'>⏳</h2>
          <h3 className='text-2xl font-bold mb-3'>Focus Sessions</h3>
          <p className='text-gray-300'>
            Track productive hours with smart timers.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className='backdrop-blur-xl bg-white/10 border border-white/10 p-8 rounded-3xl shadow-2xl'
        >
          <h2 className='text-3xl mb-4'>📈</h2>
          <h3 className='text-2xl font-bold mb-3'>Analytics</h3>
          <p className='text-gray-300'>
            Visualize performance using interactive charts.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className='backdrop-blur-xl bg-white/10 border border-white/10 p-8 rounded-3xl shadow-2xl'
        >
          <h2 className='text-3xl mb-4'>🎯</h2>
          <h3 className='text-2xl font-bold mb-3'>Focus Mode</h3>
          <p className='text-gray-300'>
            Eliminate distractions with immersive UI.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Home