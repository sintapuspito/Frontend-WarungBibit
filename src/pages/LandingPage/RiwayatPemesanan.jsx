import { Form, Container, Table, Button, Modal, Row, Col, Image, Badge, Card } from "react-bootstrap"
import Navbar from '../../components/LandingPage/Navbar'
import { useEffect, useRef, useState } from "react";
import formatDate from "../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { deletePesanan, getPesananByIdUser, pesananSelector, updatePesanan } from "../../store/pesananSlice";
import rupiah from "../../utils/rupiah";
import { ToastContainer, toast } from "react-toastify";
import optionToast from "../../constants/optionToast";
import Lightbox from "react-spring-lightbox";
import $ from 'jquery';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

const RiwayatPemesanan = () => {
  const dispatch = useDispatch()
  const [datas, setDatas] = useState([])
  const [formValue, setFormValue] = useState({})
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [dataSelected, setDataSelected] = useState([])
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const tableRef = useRef(null);

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
    document.title = "Warung Bibit | Riwayat Pemesanan"
  }, [])

  // const { status } = useSelector(state => state.pesananSlice)
  const pesanan = useSelector(pesananSelector.selectAll)

  useEffect(() => {
    dispatch(getPesananByIdUser())
  }, [dispatch])

  useEffect(() => {
    setDatas(pesanan)
  }, [pesanan])

  const handleShowDetail = (data) => {
    setDataSelected(data)
    setShowDetail(true)
  };

  const handleShowDelete = (id) => {
    setIdDelete(id)
    setShowDelete(true)
  };

  const handleDelete = async (e) => {
    e.preventDefault()

    const res = await dispatch(deletePesanan(idDelete))

    try {
      if (res.payload.message != "") {
        setShowDelete(false)
        dispatch(getPesananByIdUser())
        toast.success(`${res.payload.message}`, optionToast)
      } else {
        await toast.error(`${res.payload.message}`, optionToast)
        setShowDelete(false)
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
      setShowDelete(false)
    }
  }

  const handleImageChange = async (id, e) => {
    const buktibayar = e.target.files[0];

    if (buktibayar && buktibayar.type.startsWith('image/')) {
      const res = await dispatch(updatePesanan({ buktibayar, id }))

      try {
        if (res.payload.data.message != "") {
          await toast.success(`${res.payload.data.message}`, optionToast)
          dispatch(getPesananByIdUser())
        } else {
          await toast.error(`${res.payload.data.message}`, optionToast)
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
      }
    } else {
      setFormValue({ ...formValue, gambar: null });
    }
  }

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Container fluid style={{ paddingTop: "130px", paddingBottom: "20px" }}>
        <Row className="justify-content-center">
          <Col className="m-0 p-0" xl="11">
            <Card className="shadow border-0 p-3">
              <Card.Title><span className="h2 fw-bold">Riwayat Pemesanan</span></Card.Title>
              <Card.Body className="p-0 mt-4">
                <Table responsive ref={tableRef}>
                  <thead className="bg-success text-white">
                    <tr>
                      <th>No</th>
                      <th>Tanggal</th>
                      <th>Produk</th>
                      <th>Biaya</th>
                      <th>Konfirmasi Pembayaran</th>
                      <th>Status</th>
                      <th>Role</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      datas?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{(index + 1)}</td>
                            <td>{formatDate(data?.createdAt)}</td>
                            <td><Button variant="outline-dark" onClick={() => handleShowDetail(data?.pesanandetail)}>Detail</Button></td>
                            <td>{rupiah(data?.total)}</td>
                            <td style={{ maxWidth: "300px", minWidth: "300px" }}>
                              {
                                data?.buktibayar
                                  ?
                                  (
                                    <>
                                      <Image style={{ maxWidth: "150px", minWidth: "50px" }} src={data?.buktibayar} thumbnail onClick={() => openLightbox(index)} />
                                      <Lightbox
                                        currentIndex={currentImage}
                                        images={datas?.map(image => ({ src: image?.buktibayar, alt: "gambar bukti bayar" }))}
                                        isOpen={lightboxOpen}
                                        onNext={() => false}
                                        onPrev={() => false}
                                        onClose={closeLightbox}
                                        style={{ background: "#5252526e", zIndex: 9999 }}
                                      />
                                    </>
                                  )
                                  :
                                  (
                                    <></>
                                    // <p className="mb-3">Belum upload gambar bukti bayar</p>
                                  )
                              }
                              <Form encType="multipart/form-data">
                                <Form.Group controlId="formFile" className="my-2">
                                  <Form.Control type="file" accept="image/*,.pdf" onChange={(e) => handleImageChange(data?.id, e)} />
                                </Form.Group>
                              </Form>
                            </td>
                            <td style={{ width: "200px" }}>{data?.status}</td>
                            <td style={{ width: "50px" }}>{data?.user?.role}</td>
                            <td>
                              <Button size="sm" variant='outline-danger' onClick={() => handleShowDelete(data?.id)}>Hapus</Button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>

                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal size="lg" show={showDetail} onHide={() => setShowDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          {
            dataSelected?.map((data, index) => {
              return (
                <Container key={index}>
                  <Row>
                    <Col xl="2"><img style={{ width: "100px" }} src={data?.product?.gambar} alt="" /></Col>
                    <Col xl="9" className="d-flex flex-column justify-content-center gap-1">
                      <h5>{data?.product?.nama} <Badge className="bg-success">{data?.product?.kategori}</Badge></h5>
                      <p>{rupiah(data?.product?.harga)}</p>
                    </Col>
                    <Col xl="1" className="d-flex align-items-center">
                      <p>x {data?.jumlah}</p>
                    </Col>
                  </Row>
                </Container>
              )
            })
          }
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin untuk menghapusnya?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Tidak
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RiwayatPemesanan