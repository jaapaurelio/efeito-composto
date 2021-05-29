import React, { useState } from "react"

import addToMailchimp from "gatsby-plugin-mailchimp"
import * as styles from "./mail-form.module.css"

export default function MailForm() {
  const [email, setEmail] = useState("")
  const [responseMessage, setResponseMessage] = useState("")

  async function handleSubmit() {
    const response = await addToMailchimp(email)

    if (response.result === "success") {
      setResponseMessage("Sucesso! Bem vindo/a.")
      setEmail("")
    } else {
      setResponseMessage(response.msg)
    }
  }

  return (
    <div className={styles.container}>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(email)
        }}
      >
        <h3>Newsletter</h3>
        <div>Recebe os novos artigos no teu email.</div>
        <input
          required={true}
          className={styles.emailInput}
          type="email"
          placeholder="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        ></input>
        <button className={`button`} type="submit">
          Subscrever
        </button>
        <div className={styles.message}>
          <div dangerouslySetInnerHTML={{ __html: responseMessage }}></div>
        </div>
      </form>
    </div>
  )
}
