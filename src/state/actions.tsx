export const ACTIONS = {
  OPEN_SAVINGS_VALUE_EDITOR: "OPEN_SAVINGS_VALUE_EDITOR",
  CHANGE_SAVINGS_VALUE: "CHANGE_SAVINGS_VALUE",
  OPEN_YEARS_EDITOR: "OPEN_YEARS_EDITOR",
  CHANGE_YEARS: "CHANGE_YEARS",
}

export const openSavingsValueEditor = (open: boolean) => [
  ACTIONS.OPEN_SAVINGS_VALUE_EDITOR,
  open,
]

export const changeSavingsValue = (value: number) => [ACTIONS.CHANGE_SAVINGS_VALUE, value]

export const openYearsEditor = (open: boolean) => [
  ACTIONS.OPEN_YEARS_EDITOR,
  open,
]

export const changeYears = (years: number) => [
  ACTIONS.CHANGE_YEARS,
  years,
]

