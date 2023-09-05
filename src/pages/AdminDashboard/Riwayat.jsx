import '../../assets/css/style-admin.css'
import { Container, Row, Table, Button, Form, Image, Modal, Col, Badge, Card } from 'react-bootstrap'
import SideBar from '../../components/AdminDashboard/SideBar'
import Navbar from '../../components/AdminDashboard/Navbar'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePesanan, getPesanan, pesananSelector, updatePesanan } from '../../store/pesananSlice'
import formatDate from '../../utils/formatDate'
import rupiah from '../../utils/rupiah'
import { toast } from 'react-toastify'
import optionToast from '../../constants/optionToast'
import Lightbox from 'react-spring-lightbox'
import $ from 'jquery';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

function Product() {
    const [datas, setDatas] = useState([])
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState();
    const [dataSelected, setDataSelected] = useState([])
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const dispatch = useDispatch()
    const pesanan = useSelector(pesananSelector.selectAll)
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
        document.title = "Warung Bibit | Riwayat Pemasanan"
    }, [])

    useEffect(() => {
        dispatch(getPesanan())
    }, [dispatch])

    useEffect(() => {
        setDatas(pesanan)
    }, [pesanan])

    const handleShowDetail = (data) => {
        setDataSelected(data)
        setShowDetail(true)
    };

    const handleStatus = async (id, e) => {
        e.preventDefault()

        const res = await dispatch(updatePesanan({ status: e.target.value, id }))

        try {
            if (res.payload.data.message != "") {
                await toast.success(`${res.payload.data.message}`, optionToast)
                dispatch(getPesanan())
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
    }

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
                dispatch(getPesanan())
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

    const openLightbox = (index) => {
        setCurrentImage(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <>
            <section id="beranda" className='secondary-bg'>
                <div className='d-flex'>
                    {/* SideBar */}
                    <SideBar />

                    {/* Page Content */}
                    <div id="page-content-wrapper">
                        <Navbar title="Riwayat" />
                        <Container className='p-4'>
                            <Card className="shadow border-0">
                                <Card.Body>
                                    <Row>
                                        <Table className='bg-white' responsive ref={tableRef}>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>No</th>
                                                    <th scope='col'>Tanggal</th>
                                                    <th scope='col'>Produk</th>
                                                    <th scope="col">Pembeli</th>
                                                    <th scope='col'>Biaya</th>
                                                    <th scope="col">Bukti Bayar</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Aksi</th>
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
                                                                <td>{data?.nama}</td>
                                                                <td>{rupiah(data?.total)}</td>
                                                                <td style={{ maxWidth: "150px", minWidth: "160px" }}>
                                                                    {
                                                                        data?.buktibayar != ""
                                                                            ?
                                                                            (
                                                                                <>
                                                                                    <Image
                                                                                        style={{ maxWidth: "150px", minWidth: "50px" }}
                                                                                        className="mb-2"
                                                                                        src={data?.buktibayar}
                                                                                        thumbnail
                                                                                        onClick={() => openLightbox(index)}
                                                                                    />
                                                                                    <Lightbox
                                                                                        singleClickToZoom
                                                                                        currentIndex={currentImage}
                                                                                        images={datas?.map(image => ({ src: image?.buktibayar, alt: "gambar bukti bayar" }))}
                                                                                        isOpen={lightboxOpen}
                                                                                        onClose={closeLightbox}
                                                                                        style={{ backgroundColor: "#5252526e" }}
                                                                                    />
                                                                                </>
                                                                            )
                                                                            :
                                                                            (
                                                                                <p></p>
                                                                            )
                                                                    }
                                                                </td>
                                                                <td style={{ width: "300px" }}>
                                                                    <Form>
                                                                        <Form.Select
                                                                            aria-label="Choose Status"
                                                                            onChange={e => handleStatus(data?.id, e)}
                                                                            defaultValue={data?.status}
                                                                        >
                                                                            <option value={"Belum Bayar"}>Belum Bayar</option>
                                                                            <option value="Sedang Melakukan Konfirmasi">Sedang Melakukan Konfirmasi</option>
                                                                            <option value="Pembayaran Terkonfirmasi">Pembayaran Terkonfirmasi</option>
                                                                            <option value="Barang Diproses">Barang Diproses</option>
                                                                            <option value="Barang Dikirim">Barang Dikirim</option>
                                                                        </Form.Select>
                                                                    </Form>
                                                                </td>
                                                                <td>
                                                                    <Button size="sm" variant='outline-danger' onClick={() => handleShowDelete(data?.id)}>Hapus</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Row>
                                </Card.Body>
                            </Card>

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
                        </Container>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Product
