import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import "../css/css.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TechTag from "../components/tags/TechTag"
import Sidebar from "../components/sidebar/Sidebar"

const Tag = ({ pageContext, data }) => {
    const posts = data.allMarkdownRemark.edges
    const labels = data.site.siteMetadata.labels
    console.log(pageContext.tag)
    const { tag } = pageContext
    const { totalCount } = data.allMarkdownRemark
    /*
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`
    */
    const tagCount = `${totalCount}`
    const tagHeader = `${tag}`

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
            <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `web development`, `node.js`, `graphql`]} />
                <section className="contain-in clearfix">
                    <div className="list-wrap">
                        <div className="heading"><strong>{tagHeader}</strong>에 대한 <strong>{tagCount}</strong>개의 글을 찾았습니다.</div>
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

Tag.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
}

export const pageQuery = graphql`
  query($tag: String) {
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
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
         node {
            excerpt(pruneLength: 200)
            html
            id
            frontmatter {
                title
                date(formatString: "MMMM, YYYY")
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

export default Tag