/* eslint-disable react/jsx-no-target-blank */
import React from "react"
import audibleImage from "../images/audible-logo.png"

import * as styles from "./ad-audible-main.module.css"

const AdAudibleMain = () => {
  return (
    <div className={styles.container}>
      <a
        className={styles.content}
        href="https://www.amazon.com/hz/audible/mlp?camp=1789&creative=9325&creativeASIN=B07PCV9DSZ&currency=EUR&ie=UTF8&language=pt_BR&linkCode=as2&linkId=87f73d8a8794a942beb84df07e254960&redirect=true&ref_=as_li_tl&tag=efeitocompo06-20"
        target="_blank"
      >
        <img className={styles.image} src={audibleImage} />
        <div className={styles.textContainer}>
          <div>A minha forma favorita de ouvir livros.</div>
          <div className={styles.note}>
            Experimenta 30 dias gratuitamente. <br />
            Cancela a qualquer momento.
          </div>
        </div>
      </a>
    </div>
  )
}

export default AdAudibleMain
