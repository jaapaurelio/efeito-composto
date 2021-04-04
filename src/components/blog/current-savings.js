import React, { useEffect, useContext } from "react"
import { myContext } from "../provider"
import { changeCurrentSavings } from "../../state/actions.ts"
import { formatEuros } from "../../utils"
import { EDITORS } from "../../state/reducer"
import { openEditor } from "../../state/actions"
import Slider from "rc-slider"

function Editor({ amount, onChangeAmount }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">{formatEuros(amount)}</div>
      </div>

      <div className="salary-slider">
        <Slider
          min={0}
          max={500000}
          step={1000}
          value={amount}
          onChange={value => onChangeAmount(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default function CurrentSavings({
  editable = false,
  inlineeditor = false,
  floateditor = false,
  savings,
  showSavings,
}) {
  const { state, dispatch } = useContext(myContext)

  useEffect(() => {
    savings && dispatch(changeCurrentSavings(savings))
  }, [])

  const editClass = editable ? "edit-text" : ""
  return (
    <React.Fragment>
      {inlineeditor && (
        <Editor
          amount={state.currentSavings}
          onChangeAmount={amount => dispatch(changeCurrentSavings(amount))}
        ></Editor>
      )}

      {floateditor && state.openEditor === EDITORS.CURRENT_SAVINGS && (
        <div>
          <div
            className="editor-overlay"
            onClick={() => {
              dispatch(openEditor(false))
            }}
          ></div>
          <div className="editor-container">
            <div className="editor-content global-wrapper">
              <div
                className="editor-close"
                onClick={() => dispatch(openEditor(false))}
              >
                Fechar
              </div>
              <Editor
                amount={state.currentSavings}
                onChangeAmount={amount =>
                  dispatch(changeCurrentSavings(amount))
                }
              ></Editor>
            </div>
          </div>
        </div>
      )}

      {showSavings && (
        <span
          className={editClass}
          onClick={() => {
            editable &&
              dispatch(
                openEditor({ open: true, editor: EDITORS.CURRENT_SAVINGS })
              )
          }}
        >
          {formatEuros(state.currentSavings)}
        </span>
      )}
    </React.Fragment>
  )
}
