import '../../assets/css/style-admin.css'
import { Container, Row, Card, Button, Form, InputGroup, Image, Col } from 'react-bootstrap'
import SideBar from '../../components/AdminDashboard/SideBar'
import Navbar from '../../components/AdminDashboard/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, productSelector, updateProduct } from '../../store/productSlice'
import { ToastContainer, toast } from 'react-toastify'
import optionToast from '../../constants/optionToast'

function EditProduct() {
    const { id } = useParams()
    const [datas, setDatas] = useState([])
    const [loading, setLoading] = useState(false);
    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        document.title = "Warung Bibit | Edit Produk"
    }, [])

    const dispatch = useDispatch()
    const product = useSelector(state => productSelector.selectById(state, id))

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    useEffect(() => {
        setDatas(product)
        setBenefits(product?.manfaat)
    }, [product])

    const navigate = useNavigate()

    const handleBenefitChange = (index, newValue) => {
        const newBenefits = [...benefits];
        newBenefits[index] = newValue;
        setBenefits(newBenefits);
    };

    const addBenefit = () => {
        setBenefits([...benefits, '']);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setDatas({ ...datas, gambar: file });
        } else {
            setDatas({ ...datas, gambar: null });
        }
    };

    const removeBenefit = (index) => {
        const newBenefits = [...benefits];
        newBenefits.splice(index, 1);
        setBenefits(newBenefits);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const res = await dispatch(updateProduct({ ...datas, manfaat: benefits }))

        try {
            if (res.payload.data.message != "") {
                await toast.success(`${res.payload.data.message}`, optionToast)

                setTimeout(() => {
                    navigate('/dashboard/produk')
                    setLoading(false)
                }, 2000);
            } else {
                await toast.error(`${res.payload.data.message}`, optionToast)

                setTimeout(() => {
                    setLoading(false)
                    setDatas({})
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
            // setLoading(false)
        }
    };

    const numberInputOnWheelPreventChange = (e) => {
        e.target.blur()
        e.stopPropagation()

        setTimeout(() => {
            e.target.focus()
        }, 0)
    }
    return (
        <>
            <ToastContainer />
            <section id="beranda" className='secondary-bg'>
                <div className='d-flex'>
                    {/* SideBar */}
                    <SideBar />

                    {/* Page Content */}
                    <div id="page-content-wrapper">
                        <Navbar title={"Edit Produk"} />
                        <Container className='px-4 mt-5'>
                            <Row>
                                <Card className='py-4'>
                                    <Card.Title className='ms-3'>Edit Data Produk</Card.Title>
                                    <hr></hr>
                                    <Card.Body>
                                        {
                                            datas?.kategori == "Benih"
                                                ?
                                                (
                                                    <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                                                        <Form.Group className="mb-3" controlId="nama">
                                                            <Form.Label>Nama Produk</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="cth. Benih Okra"
                                                                defaultValue={datas?.nama}
                                                                onChange={e => setDatas({ ...datas, nama: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group controlId="harga">
                                                            <Form.Label>Harga</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>Rp.</InputGroup.Text>
                                                                <Form.Control
                                                                    required
                                                                    type="number"
                                                                    onWheel={numberInputOnWheelPreventChange}
                                                                    placeholder='cth. 9000'
                                                                    defaultValue={datas?.harga} onChange={e => setDatas({ ...datas, harga: e.target.value })} />
                                                                <InputGroup.Text>.00</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="berat">
                                                            <Form.Label>Berat Bersih</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange}
                                                                    placeholder='cth. 25' defaultValue={datas?.beratbersih}
                                                                    onChange={e => setDatas({ ...datas, beratbersih: e.target.value })} />
                                                                <InputGroup.Text>gr</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="isi">
                                                            <Form.Label>Isi Benih</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>+-</InputGroup.Text>
                                                                <Form.Control
                                                                    required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange}
                                                                    placeholder='cth. 10' defaultValue={datas?.isibenih}
                                                                    onChange={e => setDatas({ ...datas, isibenih: e.target.value })} />
                                                                <InputGroup.Text>butir</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="semai">
                                                            <Form.Label>Masa Semai</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange}
                                                                    placeholder='cth. 3' defaultValue={datas?.masasemai}
                                                                    onChange={e => setDatas({ ...datas, masasemai: e.target.value })} />
                                                                <InputGroup.Text>HSS</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="pertumbuhan">
                                                            <Form.Label>Masa Pertumbuhan</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange}
                                                                    placeholder='cth. 30'
                                                                    defaultValue={datas?.masapertumbuhan}
                                                                    onChange={e => setDatas({ ...datas, masapertumbuhan: e.target.value })} />
                                                                <InputGroup.Text>HST</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="lingkungan">
                                                            <Form.Label>Lingkungan Tumbuh</Form.Label>
                                                            <Form.Control
                                                                required as="textarea" rows={3}
                                                                placeholder='cth. Cocok ditanam didataran rendah...'
                                                                defaultValue={datas?.lingkungantumbuh}
                                                                onChange={e => setDatas({ ...datas, lingkungantumbuh: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="ilmiah">
                                                            <Form.Label>Nama Ilmiah</Form.Label>
                                                            <Form.Control
                                                                required type="text"
                                                                placeholder="cth. Abelmoschus"
                                                                defaultValue={datas?.namailmiah}
                                                                onChange={e => setDatas({ ...datas, namailmiah: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="family">
                                                            <Form.Label>Family</Form.Label>
                                                            <Form.Control
                                                                required type="text"
                                                                placeholder="cth. Malvaceae"
                                                                defaultValue={datas?.family}
                                                                onChange={e => setDatas({ ...datas, family: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="stok">
                                                            <Form.Label>Stok</Form.Label>
                                                            <Form.Control
                                                                required type="number"
                                                                onWheel={numberInputOnWheelPreventChange}
                                                                placeholder="cth. 100"
                                                                defaultValue={datas?.stok}
                                                                onChange={e => setDatas({ ...datas, stok: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="gambar">
                                                            <Form.Label>Gambar Produk</Form.Label>
                                                            <Row className="mb-3">
                                                                {
                                                                    datas?.gambar != ""
                                                                        ?
                                                                        (
                                                                            <Col xl="4"><Image src={datas?.gambar} thumbnail /></Col>
                                                                        )
                                                                        :
                                                                        (
                                                                            <p>fdf</p>
                                                                        )
                                                                }
                                                            </Row>
                                                            <Form.Control
                                                                type="file"
                                                                accept='image/*'
                                                                onChange={handleImageChange} />
                                                        </Form.Group>
                                                        <Button disabled={loading} type='submit' className='mt-3' variant='success'>{loading ? "Loading..." : "Ubah data"}</Button>
                                                    </Form>
                                                )
                                                :
                                                (
                                                    <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                                                        <Form.Group className="mb-3" controlId="nama">
                                                            <Form.Label>Nama Produk</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="cth. Benih Okra"
                                                                defaultValue={datas?.nama}
                                                                onChange={e => setDatas({ ...datas, nama: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group controlId="harga">
                                                            <Form.Label>Harga</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>Rp.</InputGroup.Text>
                                                                <Form.Control
                                                                    required
                                                                    type="number"
                                                                    onWheel={numberInputOnWheelPreventChange}
                                                                    placeholder='cth. 9000'
                                                                    defaultValue={datas?.harga}
                                                                    onChange={e => setDatas({ ...datas, harga: e.target.value })} />
                                                                <InputGroup.Text>.00</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group controlId="berat">
                                                            <Form.Label>Berat Bersih</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    required type="number"
                                                                    onWheel={numberInputOnWheelPreventChange}
                                                                    placeholder='cth. 25'
                                                                    defaultValue={datas?.beratbersih}
                                                                    onChange={e => setDatas({ ...datas, beratbersih: e.target.value })} />
                                                                <InputGroup.Text>gr</InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="deskripsi">
                                                            <Form.Label>Deskripsi</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="textarea"
                                                                rows={3}
                                                                placeholder='cth. Aram sekam terbuat dari...'
                                                                defaultValue={datas?.deskripsi}
                                                                onChange={e => setDatas({ ...datas, deskripsi: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="stok">
                                                            <Form.Label>Stok</Form.Label>
                                                            <Form.Control
                                                                required type="number"
                                                                onWheel={numberInputOnWheelPreventChange}
                                                                placeholder="cth. 100"
                                                                defaultValue={datas?.stok}
                                                                onChange={e => setDatas({ ...datas, stok: e.target.value })} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="exampleForm.Control
                                                        requiredInput1">
                                                            <Form.Label>Gambar Produk</Form.Label>
                                                            <Row className="mb-3">
                                                                {
                                                                    datas?.gambar != ""
                                                                        ?
                                                                        (
                                                                            <Col xl="4"><Image src={datas?.gambar} thumbnail /></Col>
                                                                        )
                                                                        :
                                                                        (
                                                                            <p>fdf</p>
                                                                        )
                                                                }
                                                            </Row>
                                                            <Form.Control
                                                                type="file"
                                                                placeholder="Masukkan Nama Produk"
                                                                accept='image/*'
                                                                onChange={handleImageChange} />
                                                        </Form.Group>
                                                        <Form.Group controlId="productBenefits">
                                                            <Form.Label>Manfaat Produk</Form.Label>
                                                            {benefits?.map((benefit, index) => (
                                                                (
                                                                    <div className="mb-3 d-flex gap-2 align-items-center" key={index}>
                                                                        <Form.Control
                                                                            required
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
                                                        <Button disabled={loading} type='submit' className='mt-3' variant='success'>{loading ? "Loading..." : "Ubah data"}</Button>
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

export default EditProduct
