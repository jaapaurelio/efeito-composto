export const ACTIONS = {
  OPEN_SAVINGS_VALUE_EDITOR: "OPEN_SAVINGS_VALUE_EDITOR",
  CHANGE_SAVINGS_VALUE: "CHANGE_SAVINGS_VALUE",
  OPEN_YEARS_EDITOR: "OPEN_YEARS_EDITOR",
  CHANGE_YEARS: "CHANGE_YEARS",
  CHANGE_YEAR_INCOME: "CHANGE_YEAR_INCOME",
  OPEN_YEAR_INCOME_EDITOR: "OPEN_YEAR_INCOME_EDITOR",
  CHANGE_CURRENT_SAVINGS: "CHANGE_CURRENT_SAVINGS",
  OPEN_EDITOR: "OPEN_EDITOR",
}

export const openSavingsValueEditor = (open: boolean) => [
  ACTIONS.OPEN_SAVINGS_VALUE_EDITOR,
  open,
]

export const changeSavingsValue = (value: number) => [
  ACTIONS.CHANGE_SAVINGS_VALUE,
  value,
]

export const openYearsEditor = (open: boolean) => [
  ACTIONS.OPEN_YEARS_EDITOR,
  open,
]

export const openYearIncomeEditor = (open: boolean) => [
  ACTIONS.OPEN_YEAR_INCOME_EDITOR,
  open,
]

export const openEditor = ({ open, editor }) => [
  ACTIONS.OPEN_EDITOR,
  { open, editor },
]

export const changeYearIncome = (value: number) => [
  ACTIONS.CHANGE_YEAR_INCOME,
  value,
]

export const changeCurrentSavings = (value: number) => [
  ACTIONS.CHANGE_CURRENT_SAVINGS,
  value,
]

export const changeYears = (years: number) => [ACTIONS.CHANGE_YEARS, years]
