import React from "react"
import { Link, graphql } from "gatsby"
import "../css/css.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import TechTag from "../components/tags/TechTag"

const PostList = (props) => {
    const posts = props.data.allMarkdownRemark.edges
    const labels = props.data.site.siteMetadata.labels
    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
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
                {!isFirst && (
                    <Link to={prevPage} rel="prev" style={{ textDecoration: `none` }}>
                        <span className="text-dark">← Previous Page</span>
                    </Link>
                )}
                {!isLast && (
                    <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
                        <span className="text-dark ml-5">Next Page →</span>
                    </Link>
                )}
              </div>
              <Sidebar />
            </section>
        </Layout>
    )
}

export const listQuery = graphql`
         query paginateQuery($skip: Int!, $limit: Int!) {
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
             limit: $limit
             skip: $skip
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

export default PostList
