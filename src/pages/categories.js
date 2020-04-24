import React from "react"
import { Link, graphql } from "gatsby"

import { kebabCase } from "lodash"

import Layout from "../components/layout"
const CategoriesPage = ({ data }) => {
  const allCategories = data.allMarkdownRemark.group

  return (
    <Layout>
      <div>
        <h1>Categories</h1>
        <ul>
          {allCategories.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} {/* ({category.totalCount}) */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default CategoriesPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
