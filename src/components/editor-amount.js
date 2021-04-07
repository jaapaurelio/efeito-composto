import Slider from "rc-slider"
import * as React from "react"
import { formatEuros } from "../utils"

export default function EditorAmount({ amount, onChangeAmount }) {
  return (
    <React.Fragment>
      <div className="salary-view">
        <div className="salary-view-main">
          {formatEuros(amount / 12)} por mês
        </div>
        <div className="salary-view-month">{formatEuros(amount)} por ano</div>
      </div>

      <div className="salary-slider">
        <Slider
          min={600}
          max={48000}
          step={600}
          value={amount}
          onChange={value => onChangeAmount(value)}
        />
      </div>
    </React.Fragment>
  )
}
