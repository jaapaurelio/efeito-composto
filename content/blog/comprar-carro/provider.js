import React, { useState } from "react"

export const myContext = React.createContext()

const Provider = props => {
  const [salary, setSalary] = useState(14000)
  const [carValue, setCarValue] = useState(14000 * 0.75)
  const [carCredit, setCarCredit] = useState(true)

  return (
    <myContext.Provider
      value={{
        salary,
        carValue,
        carCredit,
        changeCarCredit: newCarCredit => setCarCredit(newCarCredit),
        changeSalary: newSalary => {
          setSalary(newSalary)
          setCarValue(newSalary * 0.75)
        },
        changeCarValue: newValue => setCarValue(newValue),
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
