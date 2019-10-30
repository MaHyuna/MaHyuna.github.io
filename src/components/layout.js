/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Header from "./header/header"
import "../css/common.css"

const Layout = ({ children }) => {

  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            tagline
            author
            contacts {
              tistory
              github
            }
          }
        }
      }
    `}
      render={data => (
        <>
          <Header
            siteTitle={data.site.siteMetadata.title}
            tagline={data.site.siteMetadata.tagline}
            author={data.site.siteMetadata.author}
            contacts={data.site.siteMetadata.contacts} />
            <div id="container">
              {children}
            </div>
            <footer className="text-center">
              푸터영역
            </footer>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
