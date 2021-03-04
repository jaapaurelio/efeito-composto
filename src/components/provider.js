import React, { useState } from "react"

export const myContext = React.createContext()

const Provider = props => {
  // blog post
  const defaultSalary = 14000
  const minRange = 0.3
  const maxRange = 3
  const carPercentage = 0.75
  const [salary, setSalary] = useState(defaultSalary)
  const [carValue, setCarValue] = useState(defaultSalary * carPercentage)
  const [carCredit, setCarCredit] = useState(true)
  const [carPriceRange, setCarPriceRange] = useState({
    min: defaultSalary * minRange,
    max: defaultSalary * maxRange,
  })
  const [editingSalary, setEditingSalary] = useState(false)
  const [editingCarValue, setEditingCarValue] = useState(false)

  // global
  const defaultSaveValue = 200 * 12
  const [savingsValue, setSavingsValue] = useState(defaultSaveValue)
  const [editingSavingsValue, setEditingSavingsValue] = useState(false)
  const [years, setYears] = useState(30)
  const [editingYears, setEditingYears] = useState(false)

  return (
    <myContext.Provider
      value={{
        salary,
        carValue,
        carCredit,
        carPriceRange,
        editingSalary,
        editingCarValue,
        changeCarCredit: newCarCredit => setCarCredit(newCarCredit),
        changeSalary: newSalary => {
          setSalary(newSalary)
          setCarPriceRange({
            min: newSalary * minRange,
            max: newSalary * maxRange,
          })
        },
        changeCarValue: newValue => setCarValue(newValue),
        changeEditingSalary: newValue => {
          setEditingSalary(newValue)
        },
        changeEditingCarValue: newValue => {
          setEditingCarValue(newValue)
        },
        // global
        savingsValue,
        editingSavingsValue,
        changeSavingsValue: setSavingsValue,
        changeEditingSavingsValue: setEditingSavingsValue,

        years,
        editingYears,
        changeYears: setYears,
        changeEditingYears: setEditingYears,
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
