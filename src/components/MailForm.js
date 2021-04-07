import React, { useState } from "react"

import addToMailchimp from "gatsby-plugin-mailchimp"
import * as style from "./MailForm.module.css"

export default function MailForm() {
  const [email, setEmail] = useState("")
  const [responseMessage, setResponseMessage] = useState("")

  async function handleSubmit(e) {
    const response = await addToMailchimp(email)
    if (response.result === "success") {
      setResponseMessage("Subscrição feita com sucesso.")
      setEmail("")
    } else {
      setResponseMessage(response.msg)
    }
  }

  return (
    <form
      className={style.container}
      onSubmit={e => {
        e.preventDefault()
        handleSubmit(email)
      }}
    >
      <h3>Newsletter</h3>
      <div>Recebe os novos artigos no teu email.</div>
      <input
        required={true}
        className={style.emailInput}
        type="email"
        placeholder="email"
        value={email}
        onChange={e => {
          setEmail(e.target.value)
        }}
      ></input>
      <button className={style.submitBtn} type="submit">
        Subscrever
      </button>
      <div dangerouslySetInnerHTML={{ __html: responseMessage }}></div>
    </form>
  )
}
