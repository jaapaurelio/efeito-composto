import * as React from "react"
import { graphql } from "gatsby"
import { useState } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const FORM_NAME = "Contact Form"

const createFormDataObj = data => {
  const formData = new FormData()
  Object.keys(data).forEach(k => {
    formData.append(k, data[k])
  })
  return formData
}

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    const data = {
      "form-name": FORM_NAME,
      FirstName: name,
      Email: email,
      Message: message,
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(createFormDataObj(data)).toString(),
    })
      .then(data => {
        console.log(data)
        navigate("/contact-success")
      })
      .catch(error => console.log(error))
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Contacto" />
      <h1>Algo que possa ajudar? Entra em contacto.</h1>
      <form
        name={FORM_NAME}
        data-netlify="true"
        onSubmit={handleSubmit}
        action="/contact-success"
        method="POST"
      >
        <p>
          <label>
            Nome:
            <input
              required="true"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              id="name"
            />
          </label>
        </p>
        <p>
          <label>
            Email:{" "}
            <input
              required="true"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
            />
          </label>
        </p>
        <p>
          <label>
            Message:{" "}
            <textarea
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              id="message"
              rows={4}
              defaultValue={""}
            ></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Enviar</button>
        </p>
      </form>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
