import { motion } from 'framer-motion'

const Login = () => {
  return (
    <div className='min-h-[90vh] flex justify-center items-center py-20'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className='w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 p-14 rounded-[40px] shadow-2xl'
      >
        <h1 className='text-6xl font-black text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
          Welcome Back
        </h1>

        <div className='space-y-8'>
          <div>
            <label className='block mb-3 text-lg'>Email Address</label>

            <input
              type='email'
              placeholder='Enter your email'
              className='w-full p-5 rounded-2xl bg-black/30 border border-white/20 outline-none text-white text-lg'
            />
          </div>

          <div>
            <label className='block mb-3 text-lg'>Password</label>

            <input
              type='password'
              placeholder='Enter your password'
              className='w-full p-5 rounded-2xl bg-black/30 border border-white/20 outline-none text-white text-lg'
            />
          </div>

          <button className='w-full bg-gradient-to-r from-cyan-500 to-purple-500 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition duration-300 shadow-xl mt-6'>
            Login
          </button>
        </div>

        <div className='mt-10 text-center text-gray-400 space-y-3'>
          <p>Track. Focus. Achieve.</p>

          <p className='text-sm'>
            Productivity starts with consistency 🚀
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login