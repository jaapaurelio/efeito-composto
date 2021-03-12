import React, { useEffect, useContext } from "react"
import { myContext } from "../provider"
import Slider from "rc-slider"
import currencyFormatter from "currency-formatter"
import {
  changeSavingsValue,
  openSavingsValueEditor,
} from "../../state/actions.tsx"

function fc(value) {
  return currencyFormatter.format(value, { code: "EUR" })
}

function Editor({ state, dispatch }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">
          {fc(state.savingsValue / 12)} por mês
        </div>
        <div className="salary-view-month">
          {fc(state.savingsValue)} por ano
        </div>
      </div>

      <div className="salary-slider">
        <Slider
          min={600}
          max={50000}
          step={600}
          value={state.savingsValue}
          onChange={value => dispatch(changeSavingsValue(value))}
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
  const { state, dispatch } = useContext(myContext)

  useEffect(() => {
    // Update the document title using the browser API
    valuemonth && dispatch(changeSavingsValue(valuemonth * 12))
  }, [])

  const editClass = editable ? "edit-text" : ""
  return (
    <React.Fragment>
      {inlineeditor && <Editor state={state} dispatch={dispatch}></Editor>}

      {floateditor && state.editingSavingsValue && (
        <div>
          <div
            className="editor-overlay"
            onClick={() => {
              dispatch(openSavingsValueEditor(false))
            }}
          ></div>
          <div className="editor-container">
            <div className="editor-content global-wrapper">
              <div
                className="editor-close"
                onClick={() => dispatch(openSavingsValueEditor(false))}
              >
                Fechar
              </div>
              <Editor state={state} dispatch={dispatch}></Editor>
            </div>
          </div>
        </div>
      )}

      {valuemonth && (
        <span
          className={editClass}
          onClick={() => {
            editable && dispatch(openSavingsValueEditor(true))
          }}
        >
          {fc(state.savingsValue / 12)}
        </span>
      )}
    </React.Fragment>
  )
}
