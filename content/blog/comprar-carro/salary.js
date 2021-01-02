import React from "react"
import { myContext } from "./provider"
import Slider from "rc-slider"
import currencyFormatter from "currency-formatter"

function fc(value) {
  return currencyFormatter.format(value, { code: "EUR" })
}

export default function Salary({
  selector,
  percentage,
  permonth,
  edit = false,
}) {
  const editClass = edit ? "edit-text" : ""

  return (
    <myContext.Consumer>
      {context => (
        <React.Fragment>
          {selector && (
            <React.Fragment>
              <div className="salary-view">
                <div className="salary-view-main">
                  {fc(context.salary)} / ano
                </div>
                <div className="salary-view-month">
                  {fc(context.salary / 12)} / 12 meses -{" "}
                  {fc(context.salary / 14)} / 14 meses
                </div>
              </div>

              <div className="salary-slider">
                <Slider
                  min={6000}
                  max={50000}
                  step={200}
                  value={context.salary}
                  onChange={value => context.changeSalary(value)}
                />
              </div>
            </React.Fragment>
          )}

          {!selector && !percentage && !permonth && (
            <span className={editClass}>{fc(context.salary)}</span>
          )}

          {!selector && percentage && (
            <span>{fc(context.salary * percentage)}</span>
          )}
          {!selector && permonth && (
            <span className={editClass}>{fc(context.salary / permonth)}</span>
          )}
        </React.Fragment>
      )}
    </myContext.Consumer>
  )
}
