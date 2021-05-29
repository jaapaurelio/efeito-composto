import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Disclaimer = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Aviso Legal" />
      <h1>Aviso Legal</h1>
      <p>
        Os materiais contidos neste site são fornecidos apenas para fins de
        informação geral e não pretendem ser ou constituir aconselhamento, não
        devendo ser tomadas como tal. O blog e o seu proprietário não aceitam
        qualquer responsabilidade por qualquer perda que possa surgir do acesso
        a este website nem a confiança nas informações encontradas no mesmo.
      </p>
      <p>
        O blog, e o seu proprietário, excluem qualquer responsabilidade por
        perdas ou danos diretos ou indiretos decorrentes do uso desta
        informação. Por favor, usa o bom senso ao aceder a qualquer site. O
        conteúdo deste blog é baseado na opinião, investigação e conhecimento do
        proprietário. Deves fazer a tua própria investigação e confirmar a
        informação com outras fontes e sempre rever as informações com cuidado.
      </p>
      <p>
        As informações fornecidas e opiniões expressas não são garantia de
        qualquer estratégia, recomendação ou ação, não se destinam a substituir
        o conselho profissional oferecido por pessoa certificada ou credenciada.
      </p>
      <p>
        Para consultar a lista de pessoas e entidades devidamente habilitadas
        para o efeito, por favor, consultar o site da{" "}
        <a href="https://www.cmvm.pt">CMVM</a> ou outros sites qualificados.
      </p>
    </Layout>
  )
}

export default Disclaimer

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
