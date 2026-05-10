import { useApp } from '../context/AppContext'

const Loader = () => {
  const { darkMode } = useApp()

  return (
    <div className='flex flex-col justify-center items-center h-40 gap-4'>
      <div className='relative w-12 h-12'>
        <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin' />
        <div className='absolute inset-2 rounded-full border-2 border-transparent border-b-pink-400 animate-spin' style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
      <p className={`text-xs font-semibold uppercase tracking-widest animate-pulse ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
        Loading...
      </p>
    </div>
  )
}

export default Loader
