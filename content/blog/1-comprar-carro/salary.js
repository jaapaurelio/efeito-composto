import * as React from "react"
import { myContext } from "../../../src/components/provider"
import Slider from "rc-slider"
import { formatEuros } from "../../../src/utils"

function Editor({ context }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">
          {formatEuros(context.salary)} / ano
        </div>
        <div className="salary-view-month">
          {formatEuros(context.salary / 12)} / 12 meses -{" "}
          {formatEuros(context.salary / 14)} / 14 meses
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
              {formatEuros(context.salary)}
            </span>
          )}

          {percentage && (
            <span>{formatEuros(context.salary * percentage)}</span>
          )}

          {permonth && (
            <span
              className={editClass}
              onClick={() => {
                edit && context.changeEditingSalary(true)
              }}
            >
              {formatEuros(context.salary / permonth)}
            </span>
          )}
        </React.Fragment>
      )}
    </myContext.Consumer>
  )
}
