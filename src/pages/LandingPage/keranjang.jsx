import { Container, Button, InputGroup, Form, Modal, Row, Col, Image, Card } from "react-bootstrap"
import Table from "react-bootstrap/Table";
import Navbar from "../../components/LandingPage/Navbar"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteKeranjangDetails, getKeranjangDetails, keranjangDetailsSelector, setKurangKeranjangDetails, setTambahKeranjangDetails } from "../../store/keranjangDetailsSlice";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import optionToast from "../../constants/optionToast";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { setKeranjangByIdUser } from "../../store/keranjangSlice";
// import Loading from "../../components/LandingPage/Loading";
import rupiah from "../../utils/rupiah";
import $ from 'jquery';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

const Keranjang = () => {
  const [datas, setDatas] = useState([])
  const [show, setShow] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [total, setTotal] = useState(0)

  const tableRef = useRef(null)

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable(tableRef.current)) {
      $(document).ready(function () {
        setTimeout(function () {
          $(tableRef.current).DataTable();
        }, 1000);
      });
    }

    return () => {
      const table = $(tableRef.current).DataTable();
      table.destroy();
    };
  });

  useEffect(() => {
    document.title = "Warung Bibit | Keranjang"
  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const keranjangDetail = useSelector(keranjangDetailsSelector.selectAll)

  useEffect(() => {
    dispatch(getKeranjangDetails())
  }, [dispatch])

  useEffect(() => {
    setDatas(keranjangDetail)
  }, [keranjangDetail])

  const handleShow = (id) => {
    setShow(true)
    setIdDelete(id)
  };

  useEffect(() => {
    const initialQuantities = {};
    datas?.forEach((item) => {
      initialQuantities[item?.product?.id] = item?.jumlah;
    });
  }, [datas]);

  const handleDecrease = async (keranjang_id, product_id) => {
    // if (quantities[productId] > 1) {
    //   setQuantities(prevQuantities => ({
    //     ...prevQuantities,
    //     [productId]: prevQuantities[productId] - 1
    //   }));
    // }

    await dispatch(setKurangKeranjangDetails({ id: keranjang_id, product_id }))
    dispatch(getKeranjangDetails())
  };

  const handleIncrease = async (keranjang_id, product_id) => {
    // setQuantities(prevQuantities => ({
    //   ...prevQuantities,
    //   [productId]: (prevQuantities[productId] ?? 0) + 1
    // }));

    await dispatch(setTambahKeranjangDetails({ id: keranjang_id, product_id }))
    dispatch(getKeranjangDetails())
  };

  useEffect(() => {
    setTotal(datas?.reduce((total, item) => total + (item?.product?.harga * item?.jumlah) || 0, 0))
  }, [datas])

  const handleDelete = async (e) => {
    e.preventDefault()

    const res = await dispatch(deleteKeranjangDetails(idDelete))

    try {
      if (res.payload.message != "") {
        await dispatch(getKeranjangDetails())
        setShow(false)
        toast.success(`${res.payload.message}`, optionToast)
      } else {
        await toast.error(`${res.payload.message}`, optionToast)
        setShow(false)
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
      setShow(false)
    }
  }

  const handleNext = async (e) => {
    e.preventDefault()
    let token = cookies.get("token")
    const dataToken = jwtDecode(token)

    const { payload } = await dispatch(setKeranjangByIdUser({ user_id: dataToken.id }))
    navigate("/pembayaran", {
      state: {
        keranjang_id: payload.data[0].id
      }
    })
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Container fluid style={{ paddingTop: "130px", paddingBottom: "20px" }}>
        <Row className="justify-content-center">
          <Col xl="11">
            <Card className="shadow border-0 p-3">
              <Card.Title><h2 className="fw-bold">Keranjang Belanja</h2></Card.Title>

              <Card.Body className="mt-4 p-0">
                <Table responsive ref={tableRef}>
                  <thead className="bg-success text-white">
                    <tr>
                      <th>Hapus</th>
                      <th>Gambar</th>
                      <th>Produk</th>
                      <th>Harga</th>
                      <th>Jumlah</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cookies.get("token")==""||cookies.get('token')==null? cookies.get("token"): (
                        datas?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center" style={{ width: "90px", minWidth: "60px" }}>
                              <Button
                                variant="outline-dark"
                                className="border-0 button p-0"
                                onClick={() => handleShow(data?.id)}
                              >
                                <RxCrossCircled className="h2 m-0 icon rounded-full" />
                              </Button>
                            </td>
                            <td style={{ width: "150px", minWidth: "100px", textAlign: "center" }}>
                              <Image thumbnail src={data?.product?.gambar} alt="gambar produk" />
                            </td>
                            <td>{data?.product?.nama}</td>
                            <td>{rupiah(data?.product?.harga)}</td>
                            <td style={{ width: "50px", minWidth: "50px" }}>
                              <InputGroup style={{ width: "120px" }}>
                                <Button className="border-0" disabled={data?.jumlah == 1} onClick={() => handleDecrease(data?.id, data?.product?.id)}>-</Button>
                                <Form.Control className="text-center" aria-label="Amount (to the nearest dollar)" value={data?.jumlah ?? 0} readOnly />
                                <Button className="border-0" onClick={() => handleIncrease(data?.id, data?.product?.id)}>+</Button>
                              </InputGroup>
                            </td>
                            <td>{rupiah(data ? (data?.product?.harga * data?.jumlah) || 0 : 0)}</td>
                          </tr>
                        )
                      })
                      )
                    }
                  </tbody>
                </Table>

                <Row className="justify-content-end">
                  <Col xs="11" sm="6" md="5" lg="4" xl="4">
                    <Table className="mt-4 ms-auto" bordered responsive>
                      <thead className="bg-success text-white">
                        <tr>
                          <th className="text-center" colSpan={2}>Total Keranjang Belanja</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Total Harga</td>
                          <td>{cookies.get("token") === "" || cookies.get('token') == null ? 0 : rupiah(total)}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="w-100 d-flex justify-content-end">
                      <Button disabled={datas?.length == 0 || cookies.get("token") === "" || cookies.get('token') == null} className="mt-2" variant="success" onClick={handleNext}>Lanjutkan Pembayaran</Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Produk pada Keranjang</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin menghapus produk ini pada keranjang anda?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Kembali
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Keranjang