import React, { useContext, useEffect } from "react"
import cInterest from "compound-interest-calc"
import * as styles from "./early-retirement-calculator.module.css"
import { formatEuros } from "../../utils"
import YearIncome from "./year-income"
import SavingsValue from "./savings-value"
import CurrentSavings from "./current-savings"
import { myContext } from "../provider"
import { changeSavingsValue, changeYearIncome } from "../../state/actions"

export default function EarlyRetirementCalculator() {
  const { state, dispatch } = useContext(myContext)

  useEffect(() => {
    dispatch(changeSavingsValue(12000))
    dispatch(changeYearIncome(24000))
  }, [])

  const tempSpending = state.yearIncome - state.savingsValue
  const spending = tempSpending <= 0 ? 0 : tempSpending
  const totalNeeded = spending * 25
  const investmentRate = parseInt((state.savingsValue * 100) / state.yearIncome)
  const localState = {
    spending,
    savings: 12000,
    totalNeeded,
    interest: 5,
  }

  const toCalc = {
    initial: state.currentSavings, // initial balance
    monthly: state.savingsValue / 12, // monthly addition
    interest: localState.interest, // +% interest
    compound: 12, // compounding factor (1, 12, 365...)
    years: 100, // years
  }
  let results = cInterest(
    toCalc.initial,
    toCalc.monthly,
    toCalc.years,
    toCalc.interest / 100,
    toCalc.compound
  ).total

  let financialIndependent = false
  if (state.currentSavings > totalNeeded || investmentRate >= 100) {
    financialIndependent = true
  } else {
    results.shift()
  }

  const finalIndex = results.findIndex(
    result => result > localState.totalNeeded
  )
  results = results.slice(0, finalIndex + 1)

  const tableData = results.map((result, index) => {
    const year = index + 1
    return {
      year: year,
      total: result,
      saved: state.currentSavings + state.savingsValue * year,
      independencePercentage: (100 * result) / localState.totalNeeded,
      interestForLiving: result * 0.04,
    }
  })

  return (
    <div>
      <table>
        <tr>
          <td>
            Salário Líquido Anual:
            <div className={styles.note}>Mensal (12 meses):</div>
          </td>
          <td>
            <YearIncome editable={true} showPerYear={true}></YearIncome>
            <div className={styles.note}>
              {formatEuros(state.yearIncome / 12)} / mês
            </div>
          </td>
        </tr>
        <tr>
          <td>
            Investimento Anual:
            <div className={styles.note}>Mensal (12 meses):</div>
          </td>
          <td>
            <SavingsValue editable={true} showPerYear={true}></SavingsValue>
            <div className={styles.note}>
              {formatEuros(state.savingsValue / 12)} / mês
            </div>
          </td>
        </tr>
        <tr>
          <td>
            Gastos Anuais:
            <div className={styles.note}>Mensal (12 meses):</div>
          </td>
          <td>
            {formatEuros(localState.spending)}
            <div className={styles.note}>
              {formatEuros(localState.spending / 12)} / mês
            </div>
          </td>
        </tr>

        <tr>
          <td>Percentagem investida:</td>
          <td>{investmentRate}% </td>
        </tr>
        <tr>
          <td>
            Necessário:
            <div className={styles.note}>Regra dos 4% (Gastos Anuais x 25)</div>
          </td>
          <td>
            <div>{formatEuros(localState.totalNeeded)}</div>
          </td>
        </tr>
        <tr>
          <td>Investimento atual:</td>
          <td>
            <CurrentSavings showSavings={true} editable={true}></CurrentSavings>
          </td>
        </tr>
        <tr>
          <td>Juros:</td>
          <td>{localState.interest}%</td>
        </tr>
        <tr>
          <td colSpan="2">&nbsp;</td>
        </tr>
        <tr>
          <td>Independência financeira:</td>
          <td>
            <span className={styles.strong}>
              {financialIndependent ? 0 : tableData.length} anos
            </span>
          </td>
        </tr>
        <tr>
          <td>Valor final:</td>
          <td>
            <span className={styles.strong}>
              {formatEuros(tableData[tableData.length - 1].total)}
            </span>
          </td>
        </tr>
      </table>

      {!financialIndependent && (
        <div>
          <div>
            Investindo{" "}
            <span className={styles.strong}>
              {formatEuros(state.savingsValue / 12)}
            </span>{" "}
            por mês:
          </div>
          {tableData.map(data => (
            <div className={styles.yearLine} key={data.year}>
              <div className={styles.year}>{data.year}º ano</div>
              <div>
                Temos{" "}
                <span className={styles.strong}>{formatEuros(data.total)}</span>
                , incluíndo juros.
              </div>
              <div>
                Isto gera{" "}
                <span className={styles.strong}>
                  {formatEuros(data.interestForLiving)}
                </span>{" "}
                anuais, que cobrem{" "}
                <span className={styles.strong}>
                  {parseInt(data.independencePercentage)}%
                </span>{" "}
                dos gastos.
              </div>
            </div>
          ))}
          <p>Por outras palavras, livre financeiramente.</p>
        </div>
      )}
      {financialIndependent && (
        <div>
          Os calculos mostram que és financeiramente independente. Parabéns!
        </div>
      )}
    </div>
  )
}
