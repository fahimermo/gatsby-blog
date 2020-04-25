import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import { kebabCase } from "lodash"

import Sidebar from "./../components/sidebar"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
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
                  {/* {node.frontmatter.category.map(categoryItem => ( */}
                  <li key={node.frontmatter.category[0] + `category`}>
                    <Link
                      to={`/categories/${kebabCase(
                        node.frontmatter.category[0]
                      )}/`}
                    >
                      {node.frontmatter.category[0]}
                    </Link>
                  </li>
                  {/* ))} */}
                </ul>
              ) : (
                <div className="category__default">Clinical Cases</div>
              )}
            </div>
            <div className="tag">
              tags: &nbsp;
              {node.frontmatter.tag.length ? (
                <ul className="taglist">
                  {node.frontmatter.tag.map(tagItem => (
                    <li key={tagItem + `tag`}>
                      <Link to={`/tags/${kebabCase(tagItem)}/`}>{tagItem}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="tag__default">dentalimplants</div>
              )}
            </div>

            <div className="author">
              authors: &nbsp;
              {node.frontmatter.author ? (
                <ul className="authorlist">
                  {/* {node.frontmatter.author.map(authorItem => ( */}
                  <li key={node.frontmatter.author + `author`}>
                    <Link
                      to={`/authors/${kebabCase(node.frontmatter.author)}/`}
                    >
                      {node.frontmatter.author}
                    </Link>
                  </li>
                  {/* ))} */}
                </ul>
              ) : (
                <div className="author__default">osseonews</div>
              )}
            </div>
          </article>
        )
      })}

      <Sidebar />
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
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tag
            author
            category
          }
        }
      }
    }
  }
`
