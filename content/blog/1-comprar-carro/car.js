import React from "react"
import { myContext } from "./provider"
import Slider from "rc-slider"
import currencyFormatter from "currency-formatter"
import { totalInterest, paymentCalc } from "loan-calc"
import compoundInterest from "compound-interest"

function fc(value) {
  return currencyFormatter.format(value, { code: "EUR" })
}

function carValueWithCredit(context) {
  const opts = {
    amount: context.carValue,
    rate: 8,
    termMonths: 5 * 12,
  }

  return totalInterest(opts) + opts.amount
}

function calculateDifference(context) {
  return carValueWithCredit(context) - context.salary * 0.3
}

function interestOnDifference(context) {
  return compoundInterest({
    initial: calculateDifference(context), // initial balance
    monthly: 0, // monthly addition
    interest: 7, // +% interest
    compound: 12, // compounding factor (1, 12, 365...)
    years: 5, // years
  })
}

function Editor({ context }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">{fc(context.carValue)}</div>
      </div>

      <div className="salary-slider">
        <Slider
          min={context.carPriceRange.min}
          max={context.carPriceRange.max}
          step={200}
          value={context.carValue}
          onChange={value => context.changeCarValue(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default function Car({
  selector,
  payment,
  value,
  total,
  difference,
  differenceinterest,
  edit = false,
  editor = false,
}) {
  const editClass = edit ? "edit-text" : ""

  return (
    <myContext.Consumer>
      {context => (
        <React.Fragment>
          {selector && <Editor context={context}></Editor>}

          {editor && context.editingCarValue && (
            <div>
              <div
                className="editor-overlay"
                onClick={() => {
                  context.changeEditingCarValue(false)
                }}
              ></div>
              <div className="editor-container">
                <div className="editor-content global-wrapper">
                  <div
                    className="editor-close"
                    onClick={() => context.changeEditingCarValue(false)}
                  >
                    Fechar
                  </div>
                  <Editor context={context}></Editor>
                </div>
              </div>
            </div>
          )}

          {!selector && (
            <React.Fragment>
              {value && (
                <span
                  className={editClass}
                  onClick={() => {
                    edit && context.changeEditingCarValue(true)
                  }}
                >
                  {fc(context.carValue)}
                </span>
              )}

              {payment &&
                fc(
                  paymentCalc({
                    amount: context.carValue,
                    rate: 8,
                    termMonths: 5 * 12,
                  })
                )}

              {difference && fc(calculateDifference(context))}

              {total && fc(carValueWithCredit(context))}

              {differenceinterest && fc(interestOnDifference(context))}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </myContext.Consumer>
  )
}