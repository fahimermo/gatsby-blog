const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const _ = require(`lodash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")
  const authorTemplate = path.resolve("src/templates/authors.js")
  const categoryTemplate = path.resolve("src/templates/categories.js")

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
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
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Extract tag data from query
  let tags = []
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.tag")) {
      tags = tags.concat(edge.node.frontmatter.tag)
    }
  })

  // Eliminate duplicate tags
  tags = _.uniq(tags)

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })

  // Extract author data from query
  let authors = []
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.author")) {
      authors.push(edge.node.frontmatter.author)
    }
  })

  // Eliminate duplicate authors
  authors = _.uniq(authors)

  // Make author pages
  authors.forEach(author => {
    createPage({
      path: `/authors/${_.kebabCase(author)}/`,
      component: authorTemplate,
      context: {
        author,
      },
    })
  })

  // Extract category data from query
  let categories = []
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.category")) {
      categories = categories.concat(edge.node.frontmatter.category)
    }
  })

  // Eliminate duplicate categories
  categories = _.uniq(categories)

  // Make category pages
  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryTemplate,
      context: {
        category,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
