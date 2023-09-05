import { Button, Card, Carousel, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap"
import Banner1 from "../../assets/img/banner/banner1.png";
import Banner2 from "../../assets/img/banner/banner2.png";
import HubungiKami from "../../assets/img/logo/hubungikami.png";
import { BsWhatsapp } from "react-icons/bs";
import { useEffect, useState } from "react";
import Navbar from "../../components/LandingPage/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, productSelector } from "../../store/productSlice";
import rupiah from "../../utils/rupiah";
import { ToastContainer, toast } from "react-toastify";
import { setKeranjangByIdUser } from "../../store/keranjangSlice";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { setKeranjangDetails } from "../../store/keranjangDetailsSlice";
import { useNavigate } from "react-router-dom";
import optionToast from "../../constants/optionToast";

const Beranda = () => {
  const [datas, setDatas] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState({})
  const [jumlah, setJumlah] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()

  useEffect(() => {
    document.title = "Warung Bibit | Landing Page"
  }, [])

  const product = useSelector(productSelector.selectAll)

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  useEffect(() => {
    setDatas(product)
  }, [product])

  const handleDetail = (data) => {
    let token = cookies.get("token")
    if (!token) navigate("/login")
    setModalShow(true)
    setDataDetail(data)
  }

  const RenderCards = ({ category }) => {
    return datas
      .filter(data => data.kategori === category)
      .map((data, index) => (
        <Col key={index} xs="10" sm="6" md="4" lg="4" xl="3" className="d-flex justify-content-center">
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src={data?.gambar} style={{ maxHeight: "24rem", objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column align-content-center justify-content-center" style={{ width: "98%" }}>
              <Card.Title className="text-center">{data?.nama}</Card.Title>
              <Card.Title className="h6 text-center mb-4">{rupiah(data?.harga)}</Card.Title>
              <Button variant="success" onClick={() => handleDetail(data)}>Detail Produk</Button>
            </Card.Body>
          </Card>
        </Col>
      ));
  };

  const handleToCart = async (e) => {
    e.preventDefault()
    setLoading(true)
    let token = cookies.get("token")
    const dataToken = jwtDecode(token)

    const cart = await dispatch(setKeranjangByIdUser({ user_id: dataToken.id }))
    const res = await dispatch(setKeranjangDetails({ product_id: dataDetail.id, keranjang_id: cart.payload.data[0].id, jumlah }))

    try {
      if (res.payload.message != "") {
        setLoading(false)
        setJumlah(1)
        setModalShow(false)
        await toast.success(`${res.payload.message}`, optionToast)
      } else {
        await toast.error(`${res.payload.message}`, optionToast)
        setModalShow(false)
        setLoading(false)
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
      setModalShow(false)
      setLoading(false)
    }

  }
  return (
    <>
      <ToastContainer />
      <Navbar />

      <Container fluid style={{ padding: "5rem 0 0 0" }}>
        <Carousel>
          <Carousel.Item interval={3000}>
            <img style={{}} className="w-100" src={Banner1} alt="Banner" />
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img style={{}} className="w-100" src={Banner2} alt="Banner" />
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container fluid className="pt-5 d-flex flex-column align-items-center">
        <h1>-Pelayanan Warung Bibit-</h1>
        <Row className="pt-4 justify-content-center gy-3">
          <Col lg="6" xl="3">
            <Card style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title>Waktu Pemesanan!</Card.Title>
                <Card.Text>
                  Melayani pemesanan dari pukul 07.00 WIB hingga pukul 18.00 WIB.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title>Proses Pengiriman!</Card.Title>
                <Card.Text>
                  Pesanan akan diproses dan dikirim dalam waktu 24 jam setelah
                  pembayaran diterima. Estimasi waktu pengiriman adalah 2-7 hari
                  kerja tergantung pada lokasi.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title>Bayar di Tempat!</Card.Title>
                <Card.Text>
                  Bisa bayar di tempat khusus wilayah Jakarta, Depok, Tangerang,
                  Bekasi (JADETABEK) tanpa ada minimal jumlah produk yang dipesan.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title>Gratis Ongkos Kirim!</Card.Title>
                <Card.Text>
                  Gratis ongkir khusus wilayah Pulau Jawa dengan minimal pemesanan
                  di atas Rp50.000.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className="pt-5 d-flex flex-column align-items-center" style={{ width: "98%" }}>
        <h1>-Katalog Produk-</h1>
        <div className="w-100 mt-5 d-flex justify-content-center bg-success text-white py-2 rounded">
          <h4>Produk Benih</h4>
        </div>
        <Row className="pt-4 w-100 gy-3 justify-content-center justify-content-md-start">
          <RenderCards category="Benih" />
        </Row>

        <div className="w-100 mt-5 d-flex justify-content-center bg-success text-white py-2 rounded">
          <h4>Media Tanah</h4>
        </div>
        <Row className="pt-4 w-100 gy-3 justify-content-center justify-content-md-start">
          <RenderCards category="Media Tanah" />
        </Row>

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {dataDetail?.nama}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column justify-content-center gap-2">
            <p>Nama: {dataDetail?.nama}</p>
            <p>Harga: {rupiah(dataDetail?.harga)}</p>
            <p>Berat Bersih: {dataDetail?.beratbersih}</p>
            {
              dataDetail?.kategori == "Benih"
                ?
                (
                  <>
                    <p>Isi Benih: {dataDetail?.isibenih}</p>
                    <p>Masa Semai: {dataDetail?.masasemai}</p>
                    <p>Masa Pertumbuhan: {dataDetail?.masapertumbuhan}</p>
                    <p>Lingkungan Tumbuh: {dataDetail?.lingkungantumbuh}</p>
                    <p>Nama Ilmiah: {dataDetail?.namailmiah}</p>
                    <p>Family: {dataDetail?.family}</p>
                  </>
                )
                :
                (
                  <>
                    <p>Deskripsi: {dataDetail?.deskripsi}</p>
                    <p>Manfaat:</p>
                    <ul>
                      {
                        dataDetail?.manfaat?.map((data, index) => (
                          <li key={index}>{data}</li>
                        ))
                      }
                    </ul>
                  </>
                )
            }

            <Form>
              <Form.Group controlId="jumlah">
                <Form.Label>Jumlah:</Form.Label>
                <InputGroup style={{ maxWidth: "120px" }}>
                  <Button className="border-0" disabled={jumlah == 1} onClick={() => setJumlah(Math.max(1, jumlah - 1))}>-</Button>
                  <Form.Control className="text-center" aria-label="Amount (to the nearest dollar)" value={jumlah} readOnly />
                  <Button className="border-0" onClick={() => setJumlah((jumlah + 1))}>+</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={loading} variant="success" onClick={handleToCart}>{loading ? "Loading..." : "Masukkan keranjang"}</Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <Container fluid className="pt-5 d-flex flex-column align-items-center gy-3">
        <h1>-Katalog Produk-</h1>
        <Row className="align-items-center justify-content-center mt-5">
          <Col sm="12" md="6" lg="6" xl="6" className="d-flex d-sm-flex d-md-inline d-xl-inline-block flex-column align-items-center">
            <h5>Hubungi Kami:</h5>
            <p className="mt-2 text-center text-md-start">Jika anda mencari bantuan lebih lanjut, silahkan hubungi kami melalui</p>
            <p className="d-flex align-items-center gap-1">
              <BsWhatsapp />
              (+62)81215671811 (WhatsApp Only)
            </p>
          </Col>
          <Col xs={{ order: "first", span: "8" }} sm={{ order: "first", span: "8" }} md={{ span: "6", order: "last" }} lg="6" xl="6"><img className="ms-auto" style={{ width: "100%" }} src={HubungiKami} alt="gambar hubungi kami" /></Col>
        </Row>
      </Container>

      <Container fluid className="mt-5 bg-success px-0 pb-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,213.3C672,192,768,128,864,138.7C960,149,1056,235,1152,261.3C1248,288,1344,256,1392,240L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <p className="text-white text-center">&#169; {new Date().getFullYear()} Sinta Puspito Rini | All Right Reserved</p>
      </Container>
    </>
  )
}

export default Beranda