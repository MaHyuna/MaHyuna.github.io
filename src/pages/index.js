import React from "react"
import { Link, graphql } from "gatsby"
import "../css/css.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import TechTag from "../components/tags/TechTag"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const labels = data.site.siteMetadata.labels
  const currentPage = 1
  const nextPage = (currentPage + 1).toString()

  const getTechTags = (tags) => {
    const techTags = []
    tags.forEach((tag, i) => {
      labels.forEach((label) => {
        if (tag === label.tag) {
          techTags.push(<TechTag key={i} tag={label.tag} tech={label.tech} name={label.name} size={label.size} color={label.color} />)
        }
      })
    })
    return techTags
  }


  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `web development`, `blog`, `graphql`]} />
      <section className="contain-in clearfix">
        <div className="list-wrap">
          <ul className="list">
            {posts.map((post) => {
              const tags = post.node.frontmatter.tags
              return (
                <li key={post.node.id}>
                  <Link className="link" to={post.node.fields.slug}>
                    <p className="date">
                      {post.node.frontmatter.date}
                    </p>
                    <h2 className="title">{post.node.frontmatter.title}</h2>
                    <p className="text">{post.node.excerpt}</p>
                  </Link>

                    
                  <div className="tags">
                    {getTechTags(tags)}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <Sidebar />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
         query IndexQuery {
           site {
             siteMetadata {
               title 
               author
               labels {
                 tag
                 tech 
                 name 
                 size 
                 color
               } 
             }
           }
           allMarkdownRemark(
             limit: 5
             sort: { fields: [frontmatter___date], order: DESC }
             filter: { frontmatter: { published: { eq: true } } }
           ) {
             totalCount
             edges {
               node {
                 excerpt(pruneLength: 200)
                 html
                 id
                 frontmatter {
                   title
                   date(formatString: "MMMM DD, YYYY")
                   tags
                 }
                 fields {
                   slug
                 }
               }
             }
           }
         }
       `

export default IndexPage

