import '../../assets/css/style-admin.css'
import { Container, Row, Col } from 'react-bootstrap'
import { FaGift, FaHandHolding, } from "react-icons/fa6";
import SideBar from '../../components/AdminDashboard/SideBar'
import Navbar from '../../components/AdminDashboard/Navbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPesanan, pesananSelector } from '../../store/pesananSlice';
import rupiah from '../../utils/rupiah';
function Dashboard() {
    const [datas, setDatas] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(pesananSelector.selectAll)

    useEffect(() => {
        document.title = "Warung Bibit | Dashboard"
    }, [])

    useEffect(() => {
        dispatch(getPesanan())
    }, [dispatch])

    useEffect(() => {
        setDatas(user)
    }, [user])

    const total = () => {
        let totals = 0
        datas?.map(data => {
            totals = totals + data.total
        })

        return totals
    }
    return (
        <>
            <section id="beranda" className='secondary-bg'>
                <div className='d-flex'>
                    {/* SideBar */}
                    <SideBar />

                    {/* Page Content */}
                    <div id="page-content-wrapper">
                        <Navbar title="Dashboard" />

                        <Container className='px-4'>
                            <Row className='g-3 my-2'>
                                <Col md='6'>
                                    <div className='p-3 bg-white shadow-sm d-flex justify-content-between align-items-center rounded py-4 px-5'>
                                        <div>
                                            <h3 className='fs-2'>{datas?.length}</h3>
                                            <p className='fs-5'>Pesanan</p>
                                        </div>
                                        <div>
                                            <FaGift className="fs-1 primary-text border rounded-full secondary-bg p-2 w-100" />
                                        </div>
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <div className='p-3 bg-white shadow-sm d-flex align-items-center rounded justify-content-between py-4 px-5'>
                                        <div>
                                            <h3 className='fs-2'>{rupiah(total())}</h3>
                                            <p className='fs-5'>Total Pesanan</p>
                                        </div>
                                        <div>
                                            <FaHandHolding className='fs-1 primary-text border rounded-full secondary-bg p-2 w-100' />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard
