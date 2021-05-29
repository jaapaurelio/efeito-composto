import * as React from "react"
import * as styles from "./page-footer.module.css"
import { Link } from "gatsby"

const links = [
  { url: "/contato", label: "Contato" },
  { url: "/politica-privacidade", label: "Política de Privacidade" },
  { url: "/avisolegal", label: "Aviso Legal" },
]

const externals = [
  { url: "/rss.xml", label: "RSS", target: "_blank", type: "external" },
]
const PageFooter = () => {
  return (
    <div className={styles.container}>
      <div> Efeito Composto © {new Date().getFullYear()}</div>
      <div className={styles.links}>
        {links.map(link => {
          return (
            <Link
              className={styles.link}
              key={link.url}
              to={link.url}
              target={link.target}
            >
              {link.label}
            </Link>
          )
        })}

        {externals.map(link => {
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
