import React, { useContext } from "react"
import { myContext } from "../provider"
import cInterest from "compound-interest"
import { formatEuros } from "../../utils"

function calculateSavings(options) {
  return options.initial + options.monthly * 12 * options.years
}

export default function CompoundInterest({
  initial = 0,
  interest = 7,
  difference = false,
  years,
}) {
  const { state } = useContext(myContext)
  years = years || state.years
  return (
    <span>
      {!difference &&
        interest !== "0" &&
        formatEuros(
          cInterest({
            initial: initial, // initial balance
            monthly: state.savingsValue / 12, // monthly addition
            interest, // +% interest
            compound: 12, // compounding factor (1, 12, 365...)
            years: years, // years
          })
        )}

      {!difference &&
        interest === "0" &&
        formatEuros(
          calculateSavings({
            initial: initial, // initial balance
            monthly: state.savingsValue / 12, // monthly addition
            interest, // +% interest
            years: years, // years
          })
        )}

      {difference &&
        formatEuros(
          cInterest({
            initial: initial, // initial balance
            monthly: state.savingsValue / 12, // monthly addition
            interest, // +% interest
            compound: 12, // compounding factor (1, 12, 365...)
            years: years, // years
          }) -
            calculateSavings({
              initial: initial, // initial balance
              monthly: state.savingsValue / 12, // monthly addition
              interest, // +% interest
              years: years, // years
            })
        )}
    </span>
  )
}
