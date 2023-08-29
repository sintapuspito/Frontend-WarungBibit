import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import Navbar from "../../components/LandingPage/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import optionToast from "../../constants/optionToast"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Dana from "../../assets/img/logo/LogoDana.png";
import { getKeranjang, keranjangSelector } from "../../store/keranjangSlice"
import Cookies from "universal-cookie"
import jwtDecode from "jwt-decode"
import { setPesanan } from "../../store/pesananSlice"

const Pembayaran = () => {
  const location = useLocation()
  const [formValue, setFormValue] = useState({})
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()

  useEffect(() => {
    document.title = "Warung Bibit | Pembayaran"
  }, [])

  let token = cookies.get("token")
  const dataToken = jwtDecode(token)

  useEffect(() => {
    if (location.state == null) navigate("/keranjang")
  }, [location, navigate])

  const keranjang = useSelector(state => keranjangSelector.selectById(state, location?.state?.keranjang_id))

  useEffect(() => {
    dispatch(getKeranjang())
  }, [dispatch])

  const handleNext = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await dispatch(setPesanan({ ...formValue, keranjang_id: location.state.keranjang_id, total: keranjang.total, user_id: dataToken.id }))

    try {
      if (res.payload.message != "") {
        setLoading(false)
        await toast.success(`${res.payload.message}`, optionToast)
        navigate("/riwayat")
      } else {
        await toast.error(`${res.payload.message}`, optionToast)

        setTimeout(() => {
          setLoading(false)
        }, 2000);
      }
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
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Container fluid="md" style={{ paddingTop: "130px", paddingBottom: "30px" }}>
        <p className="h2 fw-bold">Form Pembayaran</p>
        <Form className="mt-5" onSubmit={handleNext}>
          <Row className="mb-3">
            <Form.Group as={Col} sm="12" md="6" lg="6" xl="6" controlId="nama">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control type="text" placeholder="cth. Sinta Puspito" onChange={e => setFormValue({ ...formValue, nama: e.target.value })} required />
            </Form.Group>

            <Form.Group as={Col} sm="12" md="6" lg="6" xl="6" controlId="notelp">
              <Form.Label>No Telepon</Form.Label>
              <Form.Control type="tel" placeholder="0812345678" onChange={e => setFormValue({ ...formValue, notelp: e.target.value })} required />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} sm="12" md="6" lg="6" xl="6" controlId="alamat">
              <Form.Label>Alamat</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="cth. Jalan saya rt 01/02, Kec. saya saja" onChange={e => setFormValue({ ...formValue, alamat: e.target.value })} required />
            </Form.Group>

            <Form.Group as={Col} sm="12" md="6" lg="6" xl="6" controlId="totalharga">
              <Form.Label>Total Harga</Form.Label>
              <Form.Control value={keranjang?.total || 0} readOnly />
            </Form.Group>
          </Row>

          <Row>
            <Col xs="12" sm="10" md="8" lg="6" xl="5">
              <h5>Metode Pembayaran</h5>
              <Row className="mt-2 mb-3 align-items-center">
                <Col className="pe-xl-1" xs="5" sm="4" md="4" lg="4" xl="4">
                  <Image src={Dana} style={{ width: "100%" }} />
                </Col>
                <Col className="ps-xl-1 mt-2 mt-sm-0 mt-xl-0" xs="10" sm="8" md="8" lg="8" xl="8">
                  <p>0812-1567-1800 a.n. Wiji Dwi Lestari</p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Button disabled={loading} variant="success" type="submit">
            {loading ? "Loading..." : "Proses Pembayaran"}
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Pembayaran