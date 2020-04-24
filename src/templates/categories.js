import React from "react"

// Components
import { Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

import { kebabCase } from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } categorized with "${category}"`

  return (
    <Layout>
      <SEO title={category} />
      <h1 className="mb-5">{categoryHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt || "",
                  }}
                />
              </section>
              <div className="category">
                categories: &nbsp;
                {node.frontmatter.category.length ? (
                  <ul className="categorylist">
                    {node.frontmatter.category.map(categoryItem => (
                      <li key={categoryItem + `category`}>
                        <Link to={`/categories/${kebabCase(categoryItem)}/`}>
                          {categoryItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="category__default">Clinical Cases</div>
                )}
              </div>
              <div className="mb-3"></div>
            </article>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
          }
        }
      }
    }
  }
`
