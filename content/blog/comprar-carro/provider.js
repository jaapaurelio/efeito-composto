import React, { useState } from "react"

export const myContext = React.createContext()

const Provider = props => {
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

  return (
    <myContext.Provider
      value={{
        salary,
        carValue,
        carCredit,
        carPriceRange,
        changeCarCredit: newCarCredit => setCarCredit(newCarCredit),
        changeSalary: newSalary => {
          setSalary(newSalary)
          setCarPriceRange({
            min: newSalary * minRange,
            max: newSalary * maxRange,
          })
        },
        changeCarValue: newValue => setCarValue(newValue),
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
