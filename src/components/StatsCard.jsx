const StatsCard = ({ title, value }) => {
  return (
    <div className='bg-white/80 dark:bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20'>
      <h2 className='text-2xl font-bold mb-4'>{title}</h2>

      <p className='text-5xl font-extrabold text-blue-600 dark:text-blue-400'>
        {value}
      </p>
    </div>
  )
}

export default StatsCard