import '../../assets/css/style-admin.css'
import { Card, Container, Row, Table } from 'react-bootstrap'
import SideBar from '../../components/AdminDashboard/SideBar'
import Navbar from '../../components/AdminDashboard/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getUser, userSelector } from '../../store/userSlice'
import $ from 'jquery';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

function DaftarPelanggan() {
    const [datas, setDatas] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(userSelector.selectAll)
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    datas?.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{(index + 1)}</th>
                                                                <td>{data?.name}</td>
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
        </>
    )
}

export default DaftarPelanggan
