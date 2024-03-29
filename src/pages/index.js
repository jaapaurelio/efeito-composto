import * as React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Headline from "../components/headline"
import Layout from "../components/layout"
import MailForm from "../components/mail-form"
import Seo from "../components/seo"
import AdAudible from "../components/ad-audible-main"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Todos os artigos" />
        <p>Volta mais tarde.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Todos os artigos" />
      <Helmet>
        <script src="//code.tidio.co/qndd62fwbeoiqrs1uaexee4nhb2pqeze.js" async></script>
      </Helmet>
      <Headline></Headline>
      <h2>Artigos</h2>

      <ol style={{ listStyle: `none` }}>
        {posts.map((post, index) => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <React.Fragment key={post.fields.slug}>
              {index != 0 && (index === 3 || index % 10 === 0) && (
                <li>
                  <AdAudible></AdAudible>
                </li>
              )}
              <li>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>
                      {post.frontmatter.date} por{" "}
                      {post.frontmatter?.author?.name}
                    </small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            </React.Fragment>
          )
        })}
      </ol>
      <MailForm></MailForm>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM, YYYY", locale: "pt")
          title
          description
          author {
            id
            name
          }
        }
      }
    }
  }
`
