import React from "react"
import * as FontAwesome from "react-icons/fa"
import * as Devicons from "react-icons/di"

import { Link } from "gatsby";

const TechTag = (props) => {
    const { tag, tech, name, size, color } = props
    const str = name;
    const icon = /^Fa/.test(str) ? React.createElement(FontAwesome[name]) : React.createElement(Devicons[name]);

    return (
        <Link to={`/tags/${tag}/`}>
            <span className="tag">
                {tech}
                <i className="ic" style={{ fontSize: size, color: color }}>{icon}</i>
            </span>    
        </Link>
    )
}

export default TechTag