import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaClipboard, FaHouseChimney, FaListUl, FaPowerOff, FaUserGroup } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import optionToast from '../../constants/optionToast';
import Cookies from 'universal-cookie';

function Index() {
    const location = useLocation();
    const navigate = useNavigate()
    const cookies = new Cookies()
    const { pathname } = location;
    const splitLocation = pathname.split("/");

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
        <>
            <ToastContainer />
            <div className='bg-white' id='sidebar-wrapper'>
                <div className="sidebar-heading text-center py-3 primary-text fs-4 fw-bold text-uppercase border-bottom">
                    Warung Bibit
                </div>
                <div className="list-group list-group-flush my-3">
                    <Link to='/dashboard' className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${splitLocation.length == 2 ? splitLocation[1] === "dashboard" ? "active" : "" : ''} d-flex align-items-center`} >
                        <FaHouseChimney className='me-2 h-100' /><span>Dashboard</span></Link>
                    <Link to='/dashboard/produk' className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${splitLocation[2] === "produk" ? "active" : ""}`}> <FaClipboard className='me-2' />Produk</Link>
                    <Link to='/dashboard/riwayat' className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${splitLocation[2] === "riwayat" ? "active" : ""}`}> <FaListUl className='me-2' />Riwayat Pesanan</Link>
                    <Link to='/dashboard/pelanggan' className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${splitLocation[2] === "pelanggan" ? "active" : ""}`}> <FaUserGroup className='me-2' />Daftar Pelanggan</Link>
                    <Link className="list-group-item list-group-item-action bg-transparent text-danger fw-bold" onClick={handleLogout}> <FaPowerOff className='me-2' />Keluar</Link>
                </div>
            </div>
        </>
    )
}

export default Index
