import React, { useEffect, useContext } from "react"
import { myContext } from "../provider"
import Slider from "rc-slider"
import { changeYears, openYearsEditor } from "../../state/actions"

function Editor({ state, dispatch }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">{state.years} anos</div>
        <div className="salary-view-month">{state.years * 12} meses</div>
      </div>

      <div className="salary-slider">
        <Slider
          min={1}
          max={60}
          step={1}
          value={state.years}
          onChange={value => dispatch(changeYears(value))}
        />
      </div>
    </React.Fragment>
  )
}

export default function Salary({
  editable = false,
  inlineeditor = false,
  floateditor = false,
  years,
}) {
  const { state, dispatch } = useContext(myContext)

  useEffect(() => {
    // Update the document title using the browser API
    years && dispatch(changeYears(years))
  }, [])

  const editClass = editable ? "edit-text" : ""

  return (
    <React.Fragment>
      {inlineeditor && <Editor state={state} dispatch={dispatch}></Editor>}
      {floateditor && state.editingYears && (
        <div>
          <div
            className="editor-overlay"
            onClick={() => {
              dispatch(openYearsEditor(false))
            }}
          ></div>
          <div className="editor-container">
            <div className="editor-content global-wrapper">
              <div
                className="editor-close"
                onClick={() => dispatch(openYearsEditor(false))}
              >
                Fechar
              </div>
              <Editor state={state} dispatch={dispatch}></Editor>
            </div>
          </div>
        </div>
      )}

      {years && (
        <span
          className={editClass}
          onClick={() => {
            editable && dispatch(openYearsEditor(true))
          }}
        >
          {state.years}
        </span>
      )}
    </React.Fragment>
  )
}
