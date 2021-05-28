import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./contacto.module.css"

const Contacto = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Contacto" />
      <h1>
        Entra em contacto.
      </h1>
      <form
        className={styles.container}
        method="post"
        netlify-honeypot="bot-field"
        data-netlify="true"
        name="contact"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <div className={styles.fieldContainer}>
          <label>
            <div className={styles.fieldLabel}>Nome</div>
            <input
              className={styles.fieldInput}
              required={true}
              type="text"
              name="name"
            />
          </label>
        </div>
        <div className={styles.fieldContainer}>
          <label>
            <div className={styles.fieldLabel}>Email</div>{" "}
            <input
              className={styles.fieldInput}
              required={true}
              type="email"
              name="email"
            />
          </label>
        </div>
        <div className={styles.fieldContainer}>
          <label>
            <div className={styles.fieldLabel}>Message</div>{" "}
            <textarea className={styles.fieldInput} rows="6" name="message"></textarea>
          </label>
        </div>
        <div>
          <button className={`button ${styles.submitButton}`} type="submit">
            Enviar
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default Contacto

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
