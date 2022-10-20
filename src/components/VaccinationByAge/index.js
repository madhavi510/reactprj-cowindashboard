import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {VaccinationByAgeDetails} = props

  return (
    <ResponsiveContainer width="100%" height={300}>
      <h1 className="chart-title">Vaccination by Age</h1>
      <PieChart>
        <Pie
          cx="70%"
          cy="40%"
          data={VaccinationByAgeDetails}
          startAngle={0}
          endAngle={360}
          innerRadius="0"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-40" fill="#5a8dee" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByAge
