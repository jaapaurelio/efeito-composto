import React, { useContext } from "react"
import { myContext } from "../provider"
import cInterest from "compound-interest"
import * as styles from "./compound-chart.module.css"
import millify from "millify"

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts"

function formatLabel(label) {
  switch (label) {
    case "worst":
      return "Pior"
    case "best":
      return "Melhor"
    case "average":
      return "Média"
    case "saved":
      return "Investido"
    default:
      return label
  }
}

export default function CompoundChart({
  initial = 0,
  best_interest,
  worst_interest,
  years,
}) {
  const { state } = useContext(myContext)
  let worstInterest = Number(worst_interest)
  let bestInterest = Number(best_interest)
  years = (years && Number(years)) || state.years
  const opts = {
    initial: initial, // initial balance
    monthly: state.savingsValue / 12, // monthly addition
    interest: bestInterest, // +% interest
    compound: 12, // compounding factor (1, 12, 365...)
    years: years, // years
  }

  const bestValues = cInterest.verbose(opts)
  const worstValues = cInterest.verbose({ ...opts, interest: worstInterest })

  const data = bestValues.map((value, i) => {
    return {
      name: `${i}`,
      saved: state.savingsValue * i,
      worst: worstValues[i],
      best: value,
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
              tickFormatter={millify}
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
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
