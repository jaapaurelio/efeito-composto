import React, { useState, useEffect } from "react"

import * as styles from "./cookie-banner.module.css"

const CookieBanner = () => {
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("agree")) {
      setAgreed(true)
    }
  }, [])

  const handleClick = () => {
    localStorage.setItem("agree", "true")
    setAgreed(true)
  }

  return (
    <React.Fragment>
      {!agreed && (
        <div className={styles.container}>
          <div className={styles.content}>
            <div>
              Este site utiliza cookies e recolhe informações sobre a tua
              navegação.{" "}
              <a href="/politica-privacidade">Saber mais.</a>
            </div>
            <button onClick={handleClick} className="button">
              Concordo
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default CookieBanner
