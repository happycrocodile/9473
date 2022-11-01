import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import axios from "axios";
import routes from "../routes";
import { images } from "../assets";
import { useUserAuth } from "../context/UserAuth";
import toast from "react-hot-toast";
import Margin from "react-margin";
import Paper from "../components/Paper";
import Typography from "../components/Typography";

function LoginForm() {
    const { setAuth, setUserProfile, setRole, setAccessToken } = useUserAuth();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [data, setData] = useReducer((state, event) => {
        return {
            ...state,
            [event.name]: event.value
        };
    }, {});

    const handleChange = event => setData({ name: event.target.name, value: event.target.value });

    const errorAlert = () => toast.error("Las credenciales ingresadas no son válidas");

    const handleSubmit = async event => {
        event.preventDefault();

        if (event.currentTarget.checkValidity() === true) {
            try {
                let response = await axios.post(routes.login, data);
                setAuth(true);
                setUserProfile(response.data.data);
                setAccessToken(response.data.access_token);
                setRole(response.data.data.role_id);
                sessionStorage.setItem("access_token", response.data.access_token);
                navigate(routes.dashboard);

            } catch (error) {
                errorAlert();
            }
        } else {
            errorAlert();
        }

        setValidated(true);
    };

    return (
        <>
            <Form noValidate={true} validated={validated} onSubmit={handleSubmit}>
                <Margin>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control name="username" onChange={handleChange} required={true} />
                </Margin>
                <Margin>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} required={true} />
                </Margin>
                <Margin className="text-end">
                    <Link to={routes.home} className="btn btn-link">
                        <Margin end={1}>Volver</Margin>
                    </Link>
                    <Button type="submit">Iniciar sesión</Button>
                </Margin>
            </Form>
        </>
    );
}

function Login() {
    return (
        <section>
            <Container>
                <Row>
                    <Col lg={4} className="mx-auto">
                        <Paper>
                            <Margin size={4}>
                                <Image src={images.logo} width={40} />
                            </Margin>
                            <Margin>
                                <Typography type="h4">Iniciar sesión</Typography>
                                <Typography>Ingreso exclusivo para personal autorizado</Typography>
                            </Margin>
                            <LoginForm />
                        </Paper>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Login;
