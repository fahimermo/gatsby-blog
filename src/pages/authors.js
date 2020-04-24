import React from "react"
import { Link, graphql } from "gatsby"

import { kebabCase } from "lodash"

import Layout from "../components/layout"
const AuthorPage = ({ data }) => {
  const allAuthors = data.allMarkdownRemark.group

  return (
    <Layout>
      <div>
        <h1>Authors</h1>
        <ul>
          {allAuthors.map(author => (
            <li key={author.fieldValue}>
              <Link to={`/authors/${kebabCase(author.fieldValue)}/`}>
                {author.fieldValue} {/* ({author.totalCount}) */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default AuthorPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___author) {
        fieldValue
        totalCount
      }
    }
  }
`
