import React, { useEffect, useContext } from "react"
import { myContext } from "../provider"
import Slider from "rc-slider"

function Editor({ context }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">{context.years} anos</div>
        <div className="salary-view-month">{context.years * 12} meses</div>
      </div>

      <div className="salary-slider">
        <Slider
          min={1}
          max={60}
          step={1}
          value={context.years}
          onChange={value => context.changeYears(value)}
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
  const { changeYears } = useContext(myContext)

  useEffect(() => {
    // Update the document title using the browser API
    years && changeYears(years)
  }, [])

  const editClass = editable ? "edit-text" : ""

  return (
    <myContext.Consumer>
      {context => (
        <React.Fragment>
          {inlineeditor && <Editor context={context}></Editor>}
          {floateditor && context.editingYears && (
            <div>
              <div
                className="editor-overlay"
                onClick={() => {
                  context.changeEditingYears(false)
                }}
              ></div>
              <div className="editor-container">
                <div className="editor-content global-wrapper">
                  <div
                    className="editor-close"
                    onClick={() => context.changeEditingYears(false)}
                  >
                    Fechar
                  </div>
                  <Editor context={context}></Editor>
                </div>
              </div>
            </div>
          )}

          {years && (
            <span
              className={editClass}
              onClick={() => {
                editable && context.changeEditingYears(true)
              }}
            >
              {context.years}
            </span>
          )}
        </React.Fragment>
      )}
    </myContext.Consumer>
  )
}
