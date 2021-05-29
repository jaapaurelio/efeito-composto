import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Policy = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Política de Privacidade" />
      <h1>Política de Privacidade</h1>
      <h2>Resumo</h2>
      <p>
        Usamos algumas funcionalidades de terceiros (google analytics e outros)
        para melhorar o nosso website, e estes serviços podem guardar
        informações sobre o utilizador.
      </p>

      <h2>O que são cookies?</h2>

      <p>
        Cookies são pequenos arquivos armazenados no computador do utilizador
        quando um site é visitado. Podem guardar dados específicos relativos a
        um utilizador e o site visitado, por uma duração de tempo específica e
        podem ser acedidos ​​pelo servidor do site ou pelo computador do
        visitante.
      </p>

      <h2>Google Analytics</h2>
      <p>
        O Google Analytics é usado para perceber o que fazem o utilizador no
        site. As informações recolhidas incluem:
      </p>
      <ul>
        <li>Número de utilizadores e visitas ao site e páginas.</li>
        <li>
          Dados gerais da navagação do utilizador: tempo no site, país, browser,
          etc.
        </li>
        <li>
          Dados de como o utilizador chegou ao site, de onde veio e que termos
          de pesquisa utilizou.
        </li>
      </ul>
      <p>
        Os dados pessoais incluem endereço IP, cookies, dados de utilização.
      </p>
      <p>Para saber mais, visita os termos e condições do Google Analytics.</p>

      <h2>Contatos e emails</h2>
      <p>
        Usamos serviços externos para gerir e enviar a nossa Newsletter para os
        subscritores. Esta Newsletter contém artigos do site mas também
        referências a outros produtos.
      </p>
      <p>
        A qualquer momento podes deixar de receber estes emails, utilizando o
        link &quot;unsubscribe&quot; enviado em todos os emails.
      </p>
      <p>O serviço usado é o MailChimp.</p>

      <h2>Alojamento do site</h2>
      <p>
        O site é alojado no Netlify e usa alguns serviços que podem guardar
        informações sobre o utilizador.
      </p>
      <p>
        Nomeadamente, os contatos feitos pelo formulário do site serão alojados
        nesta plataforma.
      </p>
      <p>Para saber mais, visita os termos e condições do Netlify.</p>
    </Layout>
  )
}

export default Policy

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
