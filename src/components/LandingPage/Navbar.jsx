import { Button, Container, Dropdown, Nav, Navbar as NavbarBootstrap } from "react-bootstrap"
import Logo from "../../assets/img/logo/Warung-Bibit.png";
import { toast } from "react-toastify";
import optionToast from "../../constants/optionToast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate()
  const [dataToken, setdataToken] = useState("")

  const cookies = new Cookies()
  useEffect(() => {
    const token = cookies.get("token")
    if (token) setdataToken(jwtDecode(token))
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      cookies.remove("token", {
        path: "/",
        // expires: new Date(new Date().getTime() + 200 * 1000)
      });
      await toast.error("You have successfully logged out", optionToast);

      setTimeout(() => {
        navigate("/login")
      }, 1000);
    } catch (err) {
      await toast.error(`${err.status}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }
  return (
    <NavbarBootstrap expand="lg" className="bg-light fixed-top shadow">
      <Container>
        <NavbarBootstrap.Brand href="/" className="d-flex align-items-center gap-2">
          <img style={{ width: "70px" }} src={Logo} alt="logo warung bibit" />
          <p className="h5 fw-normal d-none d-sm-block">Warung <span className="fw-bold">Bibit</span></p>
        </NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="basic-navbarBootstrap-nav" />
        <NavbarBootstrap.Collapse id="basic-navbarBootstrap-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Item><Link to={"/"} className="text-decoration-none text-dark">Beranda</Link></Nav.Item>
            <Nav.Item><Link to={"/keranjang"} className="text-decoration-none text-dark">Keranjang</Link></Nav.Item>
            {
              dataToken
                ?
                (
                  <Nav.Item>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {dataToken.nama}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.ItemText className="dropdown-item"><Link to={"/riwayat"} className="text-decoration-none text-dark">Riwayat Pemesanan</Link></Dropdown.ItemText>
                        <Dropdown.Item onClick={handleLogout}>Keluar</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                )
                :
                (
                  <Nav.Item>
                    <Link to={"/login"}><Button variant="success">Login</Button></Link>
                  </Nav.Item>
                )
            }
          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  )
}

export default Navbar