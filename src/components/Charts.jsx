import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts'
import { useApp } from '../context/AppContext'

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`px-4 py-3 rounded-2xl border shadow-2xl text-sm ${
          darkMode
            ? 'bg-gray-900/95 border-white/10 text-white'
            : 'bg-white border-gray-100 text-gray-800'
        }`}
      >
        <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
        <p className='font-bold text-cyan-400'>
          {payload[0].value}
          <span className='text-xs font-normal ml-1 text-gray-400'>seconds</span>
        </p>
      </div>
    )
  }
  return null
}

const Charts = ({ data }) => {
  const { darkMode } = useApp()

  const chartData = data.map((s, i) => ({
    name: s.date,
    duration: s.duration,
    index: i,
  }))

  if (!data.length) {
    return (
      <div
        className={`p-12 rounded-3xl border text-center ${
          darkMode
            ? 'bg-white/[0.03] border-white/[0.08]'
            : 'bg-white border-gray-100 shadow-sm'
        }`}
      >
        <div className='text-4xl mb-3'>📊</div>
        <p className={`font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          No data yet — complete a session to see your chart!
        </p>
      </div>
    )
  }

  return (
    <div
      className={`p-8 rounded-3xl border transition-all ${
        darkMode
          ? 'bg-white/[0.03] border-white/[0.08]'
          : 'bg-white border-gray-100 shadow-sm'
      }`}
    >
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-xl font-bold' style={{ fontFamily: 'Syne, sans-serif' }}>
            Focus Analytics
          </h2>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Duration per session (seconds)
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500' />
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Focus time
          </span>
        </div>
      </div>

      <ResponsiveContainer width='100%' height={280}>
        <BarChart data={chartData} barSize={28}>
          <defs>
            <linearGradient id='barGrad' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#22d3ee' stopOpacity={0.9} />
              <stop offset='100%' stopColor='#a855f7' stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            strokeDasharray='3 3'
            stroke={darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
          />
          <XAxis
            dataKey='name'
            tick={{ fill: darkMode ? '#4b5563' : '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            tick={{ fill: darkMode ? '#4b5563' : '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
          />
          <Tooltip
            content={<CustomTooltip darkMode={darkMode} />}
            cursor={{ fill: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', radius: 8 }}
          />
          <Bar dataKey='duration' fill='url(#barGrad)' radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Charts