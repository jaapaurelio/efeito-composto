import { ACTIONS } from "./actions.ts"

export const EDITORS = {
  CURRENT_SAVINGS: "currentSavings",
}

export const initialState = {
  savingsValue: 200 * 12,
  editingSavingsValue: false,
  years: 30,
  editingYears: false,
  yearIncome: 24000,
  editingYearIncome: false,
  currentSavings: 0,
  openEditor: undefined,
}

const reducer = (state, [type, payload]) => {
  switch (type) {
    case ACTIONS.OPEN_SAVINGS_VALUE_EDITOR:
      return {
        ...state,
        editingSavingsValue: payload,
      }
    case ACTIONS.CHANGE_SAVINGS_VALUE:
      return {
        ...state,
        savingsValue: payload,
      }
    case ACTIONS.OPEN_YEARS_EDITOR:
      return {
        ...state,
        editingYears: payload,
      }
    case ACTIONS.CHANGE_YEARS:
      return {
        ...state,
        years: Number(payload),
      }
    case ACTIONS.OPEN_YEAR_INCOME_EDITOR:
      return {
        ...state,
        editingYearIncome: payload,
      }
    case ACTIONS.CHANGE_YEAR_INCOME:
      return {
        ...state,
        yearIncome: Number(payload),
      }
    case ACTIONS.CHANGE_CURRENT_SAVINGS:
      return {
        ...state,
        currentSavings: Number(payload),
      }
    case ACTIONS.OPEN_EDITOR:
      return {
        ...state,
        openEditor: payload.editor,
      }
    default:
      return state
  }
}

export default reducer
