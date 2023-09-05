import '../../assets/css/style-admin.css'
import { Card, Container, Row, Table,Modal,Button } from 'react-bootstrap'
import SideBar from '../../components/AdminDashboard/SideBar'
import Navbar from '../../components/AdminDashboard/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getUser, userSelector,deleteUser } from '../../store/userSlice'
import { toast } from 'react-toastify'
import optionToast from '../../constants/optionToast'
import $ from 'jquery';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

function DaftarPelanggan() {
    const [datas, setDatas] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(userSelector.selectAll)
    const tableRef = useRef(null)
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState();
    const handleShowDelete = (id) => {
        setIdDelete(id)
        setShowDelete(true)
    };
    const handleDelete = async (e) => {
        e.preventDefault()

        const res = await dispatch(deleteUser(idDelete))

        try {
            if (res.payload.message != "") {
                setShowDelete(false)
                dispatch(getUser())
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
        document.title = "Warung Bibit | Daftar Pelanggan"
    }, [])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        setDatas(user)
    }, [user])

    return (
        <>
            <section id="beranda" className='secondary-bg'>
                <div className='d-flex'>
                    {/* SideBar */}
                    <SideBar />

                    {/* Page Content */}
                    <div id="page-content-wrapper">
                        <Navbar title="Daftar Pelanggan" />
                        <Container className='p-4'>
                            <Card className="shadow border-0">
                                <Card.Body>
                                    <Row>
                                        <Table className='bg-white' responsive ref={tableRef}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    datas?.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{(index + 1)}</th>
                                                                <td>{data?.name}</td>
                                                                <td>{data?.role}</td>
                                                                <td><Button size="sm" variant='outline-danger' onClick={() => handleShowDelete(data?.id)}>Hapus</Button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Row>
                                </Card.Body>
                            </Card>
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

export default DaftarPelanggan
