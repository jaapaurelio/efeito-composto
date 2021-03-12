import React, { useState, useReducer } from "react"
import reducer, { initialState } from "../state/reducer"
import logger from "use-reducer-logger"

export const myContext = React.createContext()

const Provider = props => {
  const [state, dispatch] = useReducer(logger(reducer), initialState)

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

  return (
    <myContext.Provider
      value={{
        dispatch,
        state,
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
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
