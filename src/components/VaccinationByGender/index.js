import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {VaccinationByGenderDetails} = props

  return (
    <ResponsiveContainer className="chart-container" width="100%" height={300}>
      <h1 className="chart-title">Vaccination by gender</h1>
      <PieChart>
        <Pie
          cx="70%"
          cy="40%"
          data={VaccinationByGenderDetails}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
          <Cell name="Male" fill="#f54394" />
        </Pie>
        <Legend
          iconType="semi-circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByGender
