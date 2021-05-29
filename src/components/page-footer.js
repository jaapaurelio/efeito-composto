import * as React from "react"
import * as styles from "./page-footer.module.css"

const links = [
  { url: "/contato", label: "Contato" },
  { url: "/rss.xml", label: "RSS", target: "_blank" },
  { url: "/politica-privacidade", label: "Política de Privacidade" },
  { url: "/avisolegal", label: "Aviso Legal" },
]
const PageFooter = () => {
  return (
    <div className={styles.container}>
      <div> Efeito Composto © {new Date().getFullYear()}</div>
      <div className={styles.links}>
        {links.map(link => {
          return (
            <a
              className={styles.link}
              key={link.url}
              href={link.url}
              target={link.target}
            >
              {link.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default PageFooter
