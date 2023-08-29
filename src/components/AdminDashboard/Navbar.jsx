import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Container, Nav, Navbar as NavbarBootstrap } from 'react-bootstrap'
import Cookies from 'universal-cookie'

const Navbar = ({ title }) => {
  const [dataToken, setdataToken] = useState("")

  const cookies = new Cookies()
  useEffect(() => {
    const token = cookies.get("token")
    if (token) setdataToken(jwtDecode(token))
  }, [])
  return (
    <>
      <NavbarBootstrap expand='lg' className="py-2 navbar-dark" bg="success">
        <Container className='px-md-5'>
          <NavbarBootstrap.Brand className='fs-2 m-0 fw-semibold text-white' href="#home">{title}</NavbarBootstrap.Brand>
          <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBootstrap.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto mb-2 mb-lg-0">
              <Nav.Link className="fw-bold text-light">{dataToken.nama}</Nav.Link>
            </Nav>
          </NavbarBootstrap.Collapse>
        </Container>
      </NavbarBootstrap>
    </>
  )
}

export default Navbar