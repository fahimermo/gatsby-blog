import React, { useState } from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

import { slide as Menu } from "react-burger-menu"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
} from "reactstrap"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    header = (
      <div id="header">
        <Menu>
          <a id="cases" className="menu-item" href="/cases">
            Cases
          </a>
          <a id="post-a-case" className="menu-item" href="/post-a-case">
            Post a Case
          </a>
          <a id="subscribe" className="menu-item" href="/subscribe">
            Subscribe
          </a>
        </Menu>
      </div>
    )
  } else {
    header = (
      <div id="header">
        <Container>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Logo</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/cases/">Cases</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/post-a-case/">Post a Case</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/subscribe/">Subscribe</NavLink>
                </NavItem>
              </Nav>
              <NavbarText>Social Icons</NavbarText>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    )
  }
  return (
    <>
      <header>{header}</header>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
