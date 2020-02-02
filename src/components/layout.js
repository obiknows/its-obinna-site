import React from "react"
import { Link } from "gatsby"

import itsObinna from "../images/its-obinna-logo.png"
import "../utils/css/screen.css"

const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header className="site-head">
        <div className="site-head-container">
          <a
            className="nav-burger"
            href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          {/* OLD SITE LEFT NAV */}
          {/* <nav id="swup" class="site-head-left">
            <ul className="nav" role="menu">
              <li className="nav-home nav-current" role="menuitem">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="nav-about" role="menuitem">
                <Link to={`/about`}>About</Link>
              </li>
              <li className="nav-elements" role="menuitem">
                <Link to={`/elements`}>Elements</Link>
              </li>
              <li className="nav-tags" role="menuitem">
                <Link to={`/tags`}>Tags</Link>
              </li>
            </ul>
          </nav> */}
          <div className="site-head-center">
            <div style={{display: `flex`, flexDirection: `column`, alignItems: `center`}}>
              {/* <img src={itsObinna} style={{width: 20}}/> */}
              <Link className="site-head-logo" to={`/`}>
                {title}
              </Link>
              {/* <div style={{backgroundColor: `gold`, color: `black`, padding: 5}}>
                <b>BLOG</b>
              </div> */}
            </div>
            <nav id="swup" class="site-head-middle">
              <ul className="nav" role="menu">
                <li className="" role="menuitem">
                  <Link to={`/work`}>Work</Link>
                </li>
                <li className="nav-tags" role="menuitem">
                  <Link to={`/services`}>Services</Link>
                </li>
                <li className="nav-tags" role="menuitem">
                  <Link to={`/store`}>Store</Link>
                </li>
                <li className="nav-tags" role="menuitem">
                  <Link to={`/blog`}>Blog</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link> &mdash;
        Built by{" "}
        <a
          href="https://instagram.com/itsobinna"
          target="_blank"
          rel="noopener noreferrer"
        >
          Obinna
        </a>
      </footer>
    </div>
  )
}

export default Layout
