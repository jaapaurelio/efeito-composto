import React, { useEffect, useContext } from "react"
import { myContext } from "../provider"
import {
  changeSavingsValue,
  openSavingsValueEditor,
} from "../../state/actions.ts"
import EditorAmount from "../editor-amount"
import { formatEuros } from "../../utils"

export default function Salary({
  editable = false,
  inlineeditor = false,
  floateditor = false,
  valuemonth,
  showPerYear,
}) {
  const { state, dispatch } = useContext(myContext)

  useEffect(() => {
    valuemonth && dispatch(changeSavingsValue(valuemonth * 12))
  }, [])

  const editClass = editable ? "edit-text" : ""
  return (
    <React.Fragment>
      {inlineeditor && (
        <EditorAmount
          amount={state.savingsValue}
          onChangeAmount={amount => dispatch(changeSavingsValue(amount))}
        ></EditorAmount>
      )}

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
              <EditorAmount
                amount={state.savingsValue}
                onChangeAmount={amount => dispatch(changeSavingsValue(amount))}
              ></EditorAmount>
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
          {formatEuros(state.savingsValue / 12)}
        </span>
      )}

      {showPerYear && (
        <span
          className={editClass}
          onClick={() => {
            editable && dispatch(openSavingsValueEditor(true))
          }}
        >
          {formatEuros(state.savingsValue)}
        </span>
      )}
    </React.Fragment>
  )
}
