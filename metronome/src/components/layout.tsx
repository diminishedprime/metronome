/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { Link } from "gatsby"

import "./layout.css"

const Layout = ({ children }) => (
  <>
    <header>
      <div>
        <h1>
          <Link to="/" >
            Metronome
          </Link>
        </h1>
      </div>
    </header>
    <div>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  </>
)

export default Layout
