import React from "react"
import { Link, graphql } from "gatsby"
import rehypeReact from "rehype-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Salary from "../../content/blog/1-comprar-carro/salary"
import Car from "../../content/blog/1-comprar-carro/car"
import SavingsValue from "../../src/components/blog/savings-value"
import YearIncome from "../../src/components/blog/year-income"
import CurrentSavings from "../../src/components/blog/current-savings"
import EarlyRetirementCalculator from "../../src/components/blog/early-retirement-calculator"
import CompoundInterest from "../../src/components/blog/compound-interest"
import BuyHouse from "../../src/components/blog/buy-house"
import CompoundChart from "../../src/components/blog/compound-chart"
import Years from "../../src/components/blog/years"
import EarlyRetirementYears from "../../src/components/blog/early-retirement-years"
import MailForm from "../components/MailForm"

import "rc-slider/assets/index.css"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      salary: Salary,
      car: Car,
      "savings-value": SavingsValue,
      "early-retirement-calculator": EarlyRetirementCalculator,
      years: Years,
      "compound-interest": CompoundInterest,
      "buy-house": BuyHouse,
      "compound-chart": CompoundChart,
      "current-savings": CurrentSavings,
      "early-retirement-years": EarlyRetirementYears,
    },
  }).Compiler

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <div>{renderAst(post.htmlAst)}</div>
        <hr></hr>
      </article>
      <SavingsValue floateditor="true"></SavingsValue>
      <Years floateditor="true"></Years>
      <YearIncome floateditor="true"></YearIncome>
      <CurrentSavings floateditor="true"></CurrentSavings>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <MailForm></MailForm>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY", locale: "pt")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
