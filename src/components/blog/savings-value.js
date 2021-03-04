import React, { useState, useEffect, useContext } from "react"
import { myContext } from "../provider"
import Slider from "rc-slider"
import currencyFormatter from "currency-formatter"

function fc(value) {
  return currencyFormatter.format(value, { code: "EUR" })
}

function Editor({ context }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">
          {fc(context.savingsValue / 12)} por mês
        </div>
        <div className="salary-view-month">
          {fc(context.savingsValue)} por ano
        </div>
      </div>

      <div className="salary-slider">
        <Slider
          min={600}
          max={50000}
          step={600}
          value={context.savingsValue}
          onChange={value => context.changeSavingsValue(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default function Salary({
  editable = false,
  inlineeditor = false,
  floateditor = false,
  valuemonth,
}) {
  const { changeSavingsValue } = useContext(myContext)

  useEffect(() => {
    // Update the document title using the browser API
    valuemonth && changeSavingsValue(valuemonth * 12)
  }, [])

  const editClass = editable ? "edit-text" : ""
  return (
    <myContext.Consumer>
      {context => (
        <React.Fragment>
          {inlineeditor && <Editor context={context}></Editor>}

          {floateditor && context.editingSavingsValue && (
            <div>
              <div
                className="editor-overlay"
                onClick={() => {
                  context.changeEditingSavingsValue(false)
                }}
              ></div>
              <div className="editor-container">
                <div className="editor-content global-wrapper">
                  <div
                    className="editor-close"
                    onClick={() => context.changeEditingSavingsValue(false)}
                  >
                    Fechar
                  </div>
                  <Editor context={context}></Editor>
                </div>
              </div>
            </div>
          )}

          {valuemonth && (
            <span
              className={editClass}
              onClick={() => {
                editable && context.changeEditingSavingsValue(true)
              }}
            >
              {fc(context.savingsValue / 12)}
            </span>
          )}
        </React.Fragment>
      )}
    </myContext.Consumer>
  )
}
