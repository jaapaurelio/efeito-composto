import React from "react"
import * as styles from "./early-retirement-years.module.css"
export default function EarlyRetirementYears() {
  const data = [
    { percentage: "5%", years: "66 anos" },
    { percentage: "10%", years: "51 anos" },
    { percentage: "15%", years: "43 anos" },
    { percentage: "20%", years: "37 anos" },
    { percentage: "25%", years: "32 anos" },
    { percentage: "30%", years: "28 anos" },
    { percentage: "35%", years: "25 anos" },
    { percentage: "40%", years: "22 anos" },
    { percentage: "45%", years: "19 anos" },
    { percentage: "50%", years: "17 anos" },
    { percentage: "55%", years: "14.5 anos" },
    { percentage: "60%", years: "12.5 anos" },
    { percentage: "65%", years: "10.5 anos" },
    { percentage: "70%", years: "8.5 anos" },
    { percentage: "75%", years: "7 anos" },
    { percentage: "80%", years: "5.5 anos" },
    { percentage: "85%", years: "4 anos" },
    { percentage: "90%", years: "Menos de 3 anos" },
    { percentage: "95%", years: "Menos de 2 anos" },
    { percentage: "100%", years: "Zero" },
  ]

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <tr>
          <th>Investimento</th>
          <th>Anos até reforma</th>
        </tr>
        {data.map(year => {
          return (
            <tr key={year.years}>
              <td>{year.percentage}</td>
              <td>{year.years}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
