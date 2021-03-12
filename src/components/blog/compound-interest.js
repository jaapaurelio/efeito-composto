import React, { useContext } from "react"
import { myContext } from "../provider"
import currencyFormatter from "currency-formatter"
import cInterest from "compound-interest"

function fc(value) {
  return currencyFormatter.format(value, { code: "EUR" })
}

function calculateSavings(options) {
  return options.initial + options.monthly * 12 * options.years
}

export default function CompoundInterest({
  initial = 0,
  interest = 7,
  difference = false,
}) {
  const { state } = useContext(myContext)
  return (
    <span>
      <div></div>
      {!difference &&
        interest !== "0" &&
        fc(
          cInterest({
            initial: initial, // initial balance
            monthly: state.savingsValue / 12, // monthly addition
            interest, // +% interest
            compound: 12, // compounding factor (1, 12, 365...)
            years: state.years, // years
          })
        )}

      {!difference &&
        interest === "0" &&
        fc(
          calculateSavings({
            initial: initial, // initial balance
            monthly: state.savingsValue / 12, // monthly addition
            interest, // +% interest
            years: state.years, // years
          })
        )}

      {difference &&
        fc(
          cInterest({
            initial: initial, // initial balance
            monthly: state.savingsValue / 12, // monthly addition
            interest, // +% interest
            compound: 12, // compounding factor (1, 12, 365...)
            years: state.years, // years
          }) -
            calculateSavings({
              initial: initial, // initial balance
              monthly: state.savingsValue / 12, // monthly addition
              interest, // +% interest
              years: state.years, // years
            })
        )}
    </span>
  )
}
