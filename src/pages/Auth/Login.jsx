import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from '../../store/loginSlice';
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify';
import optionToast from '../../constants/optionToast';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const [formValue, setFormValue] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Warung Bibit | Login"
  }, [])

  const [visible, setVisible] = useState(false)
  const handleVisible = () => {
    setVisible(!visible)
  }

  const eye = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  )

  const eyeSlash = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
    </svg>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)


    const res = await dispatch(setLogin(formValue))

    try {
      if (res.payload.message != "") {
        const cookies = new Cookies()
        const token = res.payload.token
        cookies.set("token", token, { path: "/" })
        const dataToken = jwtDecode(token)
        await toast.success(`${res.payload.message}`, optionToast)

        setTimeout(() => {
          setLoading(false)
          dataToken.role == "admin" ? navigate('/dashboard') : navigate("/")
        }, 1500);
      } else {
        await toast.error(`${res.payload.message}`, optionToast)

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
  return (
    <>
      <ToastContainer />
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <div className="border border-3 border-success rounded-top"></div>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Warung Bibit</h2>
                  <p className=" mb-5">Silahkan masukkan email dan password untuk login!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control type="email" placeholder="cth. saya@gmail.com" onChange={(e) => setFormValue({ ...formValue, email: e.target.value })} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                          <Form.Control
                            type={visible ? "text" : "password"}
                            placeholder="cth. saya123"
                            onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
                          />
                          <Button variant='outline-dark' onClick={handleVisible}>{visible ? eyeSlash : eye}</Button>
                        </InputGroup>
                      </Form.Group>

                      <div className="d-grid">
                        <Button disabled={loading} type='submit' variant="success">
                          {loading ? "Loading..." : "Masuk"}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Belum punya akun?{" "}
                        <Link to={"/register"} className="text-success fw-bold">
                          Buat akun
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login