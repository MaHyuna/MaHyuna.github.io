import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaCheckCircle } from "react-icons/fa"
import "./index.css"

import Sidebar from "../components/sidebar/Sidebar"
import TechTag from "../components/tags/TechTag"

const AboutPage = (props) => {
    return (
        <Layout>
            <SEO title="About" />
            <div className="post-page-main">
                <div className="sidebar px-4 py-2">
                    <Sidebar />
                </div>

                <div className="post-main">
                    <SEO title="About" />
                    <div className="mt-3">
                        <h2 className="heading">About</h2>
                        <p>안녕하세요</p>
                        <br />
                        <h4>작은 타이틀</h4>
                        <div>
                            about 페이지 입니다
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}



export default AboutPage

