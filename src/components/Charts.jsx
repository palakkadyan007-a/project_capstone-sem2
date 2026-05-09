import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const Charts = ({ data }) => {
  return (
    <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg'>
      <h2 className='text-2xl font-bold mb-4'>Focus Analytics</h2>

      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='duration' fill='#2563eb' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Charts