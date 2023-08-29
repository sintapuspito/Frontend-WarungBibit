import '../../assets/css/style-admin.css'
import { Container, Row, Card, Button, Form, Nav, InputGroup } from 'react-bootstrap'
import SideBar from '../../components/AdminDashboard/SideBar'
import Navbar from '../../components/AdminDashboard/Navbar'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProduct } from '../../store/productSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import optionToast from '../../constants/optionToast'
function TambahProduct() {
    const [formValue, setFormValue] = useState({})
    const [event, setEvent] = useState("Benih")
    const [loading, setLoading] = useState(false)
    const [benefits, setBenefits] = useState(['']);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Warung Bibit | Tambah Produk"
    }, [])

    const handleBenefitChange = (index, newValue) => {
        const newBenefits = [...benefits];
        newBenefits[index] = newValue;
        setBenefits(newBenefits);
    };

    const addBenefit = () => {
        setBenefits([...benefits, '']);
    };

    const removeBenefit = (index) => {
        const newBenefits = [...benefits];
        newBenefits.splice(index, 1);
        setBenefits(newBenefits);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setFormValue({ ...formValue, gambar: file });
        } else {
            setFormValue({ ...formValue, gambar: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const res = await dispatch(setProduct({ ...formValue, manfaat: benefits, kategori: event }))

        try {
            if (res.payload.data.message != "") {
                await toast.success(`${res.payload.data.message}`, optionToast)

                setTimeout(() => {
                    setLoading(false)
                    navigate('/dashboard/produk')
                }, 2000);
            } else {
                await toast.error(`${res.payload.data.message}`, optionToast)

                setTimeout(() => {
                    setLoading(false)
                    setFormValue({})
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

    const numberInputOnWheelPreventChange = (e) => {
        e.target.blur()
        e.stopPropagation()

        setTimeout(() => {
            e.target.focus()
        }, 0)
    }

    return (
        <>
            <section id="beranda" className='secondary-bg'>
                <div className='d-flex'>
                    {/* SideBar */}
                    <SideBar />

                    {/* Page Content */}
                    <div id="page-content-wrapper">
                        <Navbar title="Tambah Produk" />
                        <Container className='px-4 mt-5'>
                            <Row>
                                <Card className='py-4'>
                                    <Card.Title className='ms-3 my-3'>Tambah Data Produk</Card.Title>
                                    <hr className="m-0"></hr>
                                    <Card.Body>
                                        <Nav className="mb-3" variant="pills" defaultActiveKey="Benih" onSelect={(eventKey) => setEvent(eventKey)}>
                                            <Nav.Item>
                                                <Nav.Link eventKey={"Benih"}>Benih</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="Media Tanah">Media Tanah</Nav.Link>
                                            </Nav.Item>
                                        </Nav>

                                        {
                                            event == "Benih"
                                                ?
                                                (
                                                    <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                                                        <Form.Group className="mb-3" controlId="nama">
                                                            <Form.Label>Nama Produk</Form.Label>
                                                            <Form.Control required type="text" placeholder="cth. Benih Okra" onChange={e => setFormValue({ ...formValue, nama: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group controlId="harga">
                                                            <Form.Label>Harga</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>Rp.</InputGroup.Text>
                                                                <Form.Control required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange} placeholder='cth. 9000' onChange={e => setFormValue({ ...formValue, harga: e.target.value })} />
                                                                <InputGroup.Text>.00</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="berat">
                                                            <Form.Label>Berat Bersih</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange} placeholder='cth. 25' defaultValue={formValue.beratbersih} onChange={e => setFormValue({ ...formValue, beratbersih: e.target.value })} />
                                                                <InputGroup.Text>gr</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="isi">
                                                            <Form.Label>Isi Benih</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>+-</InputGroup.Text>
                                                                <Form.Control required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange} placeholder='cth. 10' defaultValue={formValue.isibenih} onChange={e => setFormValue({ ...formValue, isibenih: e.target.value })} />
                                                                <InputGroup.Text>butir</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="semai">
                                                            <Form.Label>Masa Semai</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange} placeholder='cth. 3' defaultValue={formValue.masasemai} onChange={e => setFormValue({ ...formValue, masasemai: e.target.value })} />
                                                                <InputGroup.Text>HSS</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="pertumbuhan">
                                                            <Form.Label>Masa Pertumbuhan</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange} placeholder='cth. 30' defaultValue={formValue.masapertumbuhan} onChange={e => setFormValue({ ...formValue, masapertumbuhan: e.target.value })} />
                                                                <InputGroup.Text>HST</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="lingkungan">
                                                            <Form.Label>Lingkungan Tumbuh</Form.Label>
                                                            <Form.Control required as="textarea" rows={3} placeholder='cth. Cocok ditanam didataran rendah...' defaultValue={formValue.lingkungantumbuh} onChange={e => setFormValue({ ...formValue, lingkungantumbuh: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="ilmiah">
                                                            <Form.Label>Nama Ilmiah</Form.Label>
                                                            <Form.Control required type="text" placeholder="cth. Abelmoschus" defaultValue={formValue.namailmiah} onChange={e => setFormValue({ ...formValue, namailmiah: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="family">
                                                            <Form.Label>Family</Form.Label>
                                                            <Form.Control required type="text" placeholder="cth. Malvaceae" defaultValue={formValue.family} onChange={e => setFormValue({ ...formValue, family: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="stok">
                                                            <Form.Label>Stok</Form.Label>
                                                            <Form.Control required type="number"
                                                                onWheel={numberInputOnWheelPreventChange} placeholder="cth. 100" defaultValue={formValue.stok} onChange={e => setFormValue({ ...formValue, stok: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="gambar">
                                                            <Form.Label>Gambar Produk</Form.Label>
                                                            <Form.Control required type="file" accept='image/*' onChange={handleImageChange} />
                                                        </Form.Group>
                                                        <Button disabled={loading} type='submit' className='mt-3' variant='success'>{loading ? "Loading..." : "Tambah data"}</Button>
                                                    </Form>
                                                )
                                                :
                                                (
                                                    <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                                                        <Form.Group className="mb-3" controlId="nama">
                                                            <Form.Label>Nama Produk</Form.Label>
                                                            <Form.Control required type="text" placeholder="cth. Benih Okra" onChange={e => setFormValue({ ...formValue, nama: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group controlId="harga">
                                                            <Form.Label>Harga</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>Rp.</InputGroup.Text>
                                                                <Form.Control required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange} placeholder='cth. 9000' onChange={e => setFormValue({ ...formValue, harga: e.target.value })} />
                                                                <InputGroup.Text>.00</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="berat">
                                                            <Form.Label>Berat Bersih</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange} placeholder='cth. 25' defaultValue={formValue.beratbersih} onChange={e => setFormValue({ ...formValue, beratbersih: e.target.value })} />
                                                                <InputGroup.Text>gr</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="deskripsi">
                                                            <Form.Label>Deskripsi</Form.Label>
                                                            <Form.Control required as="textarea" rows={3} placeholder='cth. Aram sekam terbuat dari...' onChange={e => setFormValue({ ...formValue, deskripsi: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="stok">
                                                            <Form.Label>Stok</Form.Label>
                                                            <Form.Control required type="number"
                                                                onWheel={numberInputOnWheelPreventChange} placeholder="cth. 100" defaultValue={formValue.stok} onChange={e => setFormValue({ ...formValue, stok: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="exampleForm.Control requiredInput1">
                                                            <Form.Label>Gambar Produk</Form.Label>
                                                            <Form.Control required type="file" placeholder="Masukkan Nama Produk" accept='image/*' onChange={handleImageChange} />
                                                        </Form.Group>
                                                        <Form.Group controlId="productBenefits">
                                                            <Form.Label>Manfaat Produk</Form.Label>
                                                            {benefits.map((benefit, index) => (
                                                                (
                                                                    <div className="mb-3 d-flex gap-2 align-items-center" key={index}>
                                                                        <Form.Control required
                                                                            type="text"
                                                                            placeholder="Enter a benefit"
                                                                            value={benefit}
                                                                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                                                                        />
                                                                        <Button variant="danger" onClick={() => removeBenefit(index)}>
                                                                            Hapus
                                                                        </Button>
                                                                    </div>
                                                                )
                                                            ))}
                                                            <Button variant="secondary" onClick={addBenefit}>
                                                                Tambah Manfaat
                                                            </Button>
                                                        </Form.Group>
                                                        <Button disabled={loading} type='submit' className='mt-3' variant='success'>{loading ? "Loading..." : "Tambah data"}</Button>
                                                    </Form>
                                                )
                                        }
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Container>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TambahProduct
