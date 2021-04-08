import React, { useEffect, useContext } from "react"
import { myContext } from "../provider"
import { changeYearIncome, openYearIncomeEditor } from "../../state/actions.ts"
import EditorAmount from "../editor-amount"
import { formatEuros } from "../../utils"

export default function YearIncome({
  editable = false,
  inlineeditor = false,
  floateditor = false,
  valuemonth,
  showPerYear,
}) {
  const { state, dispatch } = useContext(myContext)

  useEffect(() => {
    valuemonth && dispatch(changeYearIncome(valuemonth * 12))
  }, [])

  const editClass = editable ? "edit-text" : ""
  return (
    <React.Fragment>
      {inlineeditor && (
        <EditorAmount
          amount={state.yearIncome}
          onChangeAmount={amount => dispatch(changeYearIncome(amount))}
        ></EditorAmount>
      )}

      {floateditor && state.editingYearIncome && (
        <div>
          <div
            className="editor-overlay"
            onClick={() => {
              dispatch(openYearIncomeEditor(false))
            }}
          ></div>
          <div className="editor-container">
            <div className="editor-content global-wrapper">
              <div
                className="editor-close"
                onClick={() => dispatch(openYearIncomeEditor(false))}
              >
                Fechar
              </div>
              <EditorAmount
                amount={state.yearIncome}
                onChangeAmount={amount => dispatch(changeYearIncome(amount))}
              ></EditorAmount>
            </div>
          </div>
        </div>
      )}

      {showPerYear && (
        <span
          className={editClass}
          onClick={() => {
            editable && dispatch(openYearIncomeEditor(true))
          }}
        >
          {formatEuros(state.yearIncome)}
        </span>
      )}
    </React.Fragment>
  )
}
