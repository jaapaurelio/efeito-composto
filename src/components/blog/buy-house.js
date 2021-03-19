import React, { useContext } from "react"
import { myContext } from "../provider"
import currencyFormatter from "currency-formatter"
import cInterest from "compound-interest"
import * as styles from "./buy-house.module.css"

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  CartesianAxis,
} from "recharts"

function fc(value) {
  return currencyFormatter.format(value, { code: "EUR" })
}
function fcNoZero(value) {
  if (value == 0) {
    return "0"
  }
  return parseInt(value / 1000) + "k"
}

function formatLabel(label) {
  switch (label) {
    case "worst":
      return "Pior (-6.6%)"
    case "best":
      return "Melhor (+30%)"
    case "average":
      return "Média (+7%)"
    case "saved":
      return "Poupado"
    default:
      return label
  }
}

function tooltipFormater(value, name, props) {
  return [fcNoZero(value), formatLabel(name)]
}

function formatTooltipLabel(value) {
  return value === 1 ? `${value} ano` : `${value} anos`
}

export default function CompoundInterest({}) {
  const { state } = useContext(myContext)
  const initial = 0
  const bestInterest = 30
  const worstInterest = -6.6
  const averageInterest = 7

  const opts = {
    initial: initial, // initial balance
    monthly: state.savingsValue / 12, // monthly addition
    interest: bestInterest, // +% interest
    compound: 12, // compounding factor (1, 12, 365...)
    years: state.years, // years
  }

  const bestValues = cInterest.verbose(opts)
  const worstValues = cInterest.verbose({ ...opts, interest: worstInterest })
  const averageValues = cInterest.verbose({
    ...opts,
    interest: averageInterest,
  })

  const data = bestValues.map((value, i) => {
    return {
      name: `${i}`,
      saved: state.savingsValue * i,
      worst: worstValues[i],
      best: value,
      average: averageValues[i],
    }
  })
  const legend = function (props) {
    const { payload } = props

    return (
      <div className={styles.legendContainer}>
        {payload.map((entry, index) => (
          <span
            className={styles.legendItem}
            style={{ color: entry.color }}
            key={`item-${index}`}
          >
            {formatLabel(entry.value)}
          </span>
        ))}
      </div>
    )
  }
  return (
    <div>
      <div>
        <ResponsiveContainer height={300}>
          <LineChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={{ stroke: "#EAF0F4" }}
              tick={{ fontSize: "11px" }}
            />
            <YAxis
              axisLine={false}
              width={30}
              tickFormatter={fcNoZero}
              tick={{ fontSize: "11px" }}
            />
            <Legend content={legend} />
            <Line
              dot={false}
              type="monotone"
              dataKey="saved"
              stroke="#333333"
            />
            <Line
              dot={false}
              type="monotone"
              dataKey="worst"
              stroke="#d2691e"
            />
            <Line dot={false} type="monotone" dataKey="best" stroke="#8884d8" />
            <Line
              dot={false}
              type="monotone"
              dataKey="average"
              stroke="#49ad6e"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Anos</th>
              <th>Poupado</th>
              <th className={styles.worst}>Pior</th>
              <th className={styles.best}>Melhor</th>
              <th className={styles.average}>Média</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((yearData, i) => {
              return (
                <tr className={styles.tableContent}>
                  <td>{i + 1}</td>
                  <td>{fcNoZero(yearData.saved)}</td>
                  <td className={styles.worst}>{fcNoZero(yearData.worst)}</td>
                  <td className={styles.best}>{fcNoZero(yearData.best)}</td>
                  <td className={styles.average}>
                    {fcNoZero(yearData.average)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}