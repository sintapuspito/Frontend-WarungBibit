import '../../assets/css/style-admin.css'
import { Container, Row, Col, Table, Button, Image, Modal, Card } from 'react-bootstrap'
import SideBar from '../../components/AdminDashboard/SideBar'
import { Link } from 'react-router-dom'
import Navbar from '../../components/AdminDashboard/Navbar'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProduct, productSelector } from '../../store/productSlice'
import { ToastContainer, toast } from 'react-toastify'
import rupiah from '../../utils/rupiah'
import optionToast from '../../constants/optionToast'
import $ from 'jquery';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

function Product() {
    const [datas, setDatas] = useState([])
    const dispatch = useDispatch()
    const product = useSelector(productSelector.selectAll)
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
        document.title = "Warung Bibit | Daftar Produk"
    }, [])

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    useEffect(() => {
        setDatas(product)
    }, [product])

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState();

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setIdDelete(id)
        setShow(true)
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        const res = await dispatch(deleteProduct(idDelete))

        try {
            if (res.payload.message != "") {
                setShow(false)
                dispatch(getProduct())
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

    return (
        <>
            <ToastContainer />
            <section id="beranda" className="secondary-bg">
                <div className='d-flex'>
                    {/* SideBar */}
                    <SideBar />

                    {/* Page Content */}
                    <div id="page-content-wrapper">
                        <Navbar title="Produk" />
                        <Container className='p-4'>
                            <Card className="shadow border-0">
                                <Card.Body>
                                    <Row>
                                        <Col className='my-3'>
                                            <Link className='btn btn-success' to='/dashboard/produk/tambah'>Tambah Data</Link>
                                        </Col>
                                        <Table className='bg-white' responsive ref={tableRef}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Nama Produk</th>
                                                    <th scope="col">Gambar</th>
                                                    <th scope="col">Stok</th>
                                                    <th scope="col">Harga</th>
                                                    <th scope="col">Kategori</th>
                                                    <th scope="col">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    datas?.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{(index + 1)}</td>
                                                                <td>{data?.nama}</td>
                                                                <td>
                                                                    <Image src={data?.gambar} height="100px" width="100px" style={{ objectFit: 'cover' }} />
                                                                </td>
                                                                <td>{data?.stok}</td>
                                                                <td>
                                                                    {rupiah(data?.harga)}
                                                                </td>
                                                                <td>{data?.kategori}</td>
                                                                <td style={{ width: "130px" }}>
                                                                    <Link to={`/dashboard/produk/edit/${data?.id}`} className='btn btn-outline-success btn-sm me-2' >Edit</Link>
                                                                    <Button size="sm" variant='outline-danger'
                                                                        onClick={() => handleShow(data?.id)}>Hapus</Button>
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
                        </Container>
                    </div>
                </div>
            </section>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Produk</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah anda yakin untuk menghapusnya?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
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

export default Product
