import currencyFormatter from "currency-formatter"

function formatEuros(value) {
  return currencyFormatter.format(value, { code: "EUR" })
}

export { formatEuros }
