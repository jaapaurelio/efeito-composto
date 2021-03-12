import { ACTIONS } from "./actions.tsx"

export const initialState = {
  savingsValue: 200 * 12,
  editingSavingsValue: false,
  years: 30,
  editingYears: false,
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
        years: payload,
      }
    default:
      return state
  }
}

export default reducer
