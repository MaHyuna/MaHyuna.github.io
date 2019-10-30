import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import logo from "../../images/maro.svg"

const Header = ({  }) => {

  return (
    <header id="header">
      <section className="header-in">
        <h1 className="logo">
          <Link to="/" >
            {/* {author} */}
            
            <img src={ logo } alt="logo" />
          </Link>
        </h1>

        <div className="menu-list">
          <ul>
            <li><Link to="/">Dev Diary</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="archive">Archive</Link></li>
          </ul>
        </div>
      </section>
      {/* <MobilePageLinks /> */}
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
