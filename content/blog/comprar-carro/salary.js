import React from "react"
import { myContext } from "./provider"
import Slider from "rc-slider"
import currencyFormatter from "currency-formatter"

function fc(value) {
  return currencyFormatter.format(value, { code: "EUR" })
}

function Editor({ context }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">{fc(context.salary)} / ano</div>
        <div className="salary-view-month">
          {fc(context.salary / 12)} / 12 meses - {fc(context.salary / 14)} / 14
          meses
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
  )
}

export default function Salary({
  selector,
  percentage,
  permonth,
  year,
  edit = false,
  editor = false,
}) {
  const editClass = edit ? "edit-text" : ""

  return (
    <myContext.Consumer>
      {context => (
        <React.Fragment>
          {selector && <Editor context={context}></Editor>}

          {editor && context.editingSalary && (
            <div>
              <div
                className="editor-overlay"
                onClick={() => {
                  context.changeEditingSalary(false)
                }}
              ></div>
              <div className="editor-container">
                <div className="editor-content global-wrapper">
                  <div
                    className="editor-close"
                    onClick={() => context.changeEditingSalary(false)}
                  >
                    Fechar
                  </div>
                  <Editor context={context}></Editor>
                </div>
              </div>
            </div>
          )}

          {year && (
            <span
              className={editClass}
              onClick={() => {
                edit && context.changeEditingSalary(true)
              }}
            >
              {fc(context.salary)}
            </span>
          )}

          {percentage && <span>{fc(context.salary * percentage)}</span>}

          {permonth && (
            <span
              className={editClass}
              onClick={() => {
                edit && context.changeEditingSalary(true)
              }}
            >
              {fc(context.salary / permonth)}
            </span>
          )}
        </React.Fragment>
      )}
    </myContext.Consumer>
  )
}
