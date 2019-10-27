import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"


import MobilePageLinks from "./MobilePageLinks"
import "./header.css"

const Header = ({ siteTitle, author }) => {

  return (
    <header className="head-main">
      <div className="head-elements">
        <h1 className="head-logo ml-4">
          <Link to="/" >
            {author}
          </Link>
        </h1>
      </div>
      <MobilePageLinks />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
