import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { images } from "../assets";
import Typography from "../components/Typography";
import Margin from "react-margin";
import Paper from "../components/Paper";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import routes from "../routes";
import { useReducer, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";

function Home() {

    const [validated, setValidated] = useState(false);

    const [data, setData] = useReducer((state, event) => {
        return {
            ...state,
            [event.name]: event.value
        };
    }, {});

    const handleChange = event => setData({ name: event.target.name, value: event.target.value });

    const handleSubmit = async event => {
        event.preventDefault();

        if (event.currentTarget.checkValidity() === true) {
            try {
                let response = await axios.post(routes.feedbacks, data);
                toast.success("Comentario enviado con éxito. Id " + response.data.data.feedback_id);

            } catch (error) {
                toast.error("El numero de pedido ya fue utilizado o es incorrecto");
            }
        }

        setValidated(true);
    };


    return (
        <>
            <header>
                <Container>
                    <Row>
                        <Col lg={6} className="mx-auto text-center">
                            <Margin>
                                <Image src={images.logo} width={40} />
                            </Margin>
                            <Margin>
                                <Typography className="fw-bold" type="h3">CRM</Typography>
                            </Margin>
                            <Margin bottom={3}>
                                <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vulputate placerat odio, a posuere elit. Nunc eu purus ornare, tristique diam</Typography>
                            </Margin>
                            <Link to={routes.login} className="btn btn-outline-light">Iniciar session</Link>
                        </Col>
                    </Row>
                </Container>
            </header>
            <section>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={4}>
                            <Typography type="h5">Deja tu comentario</Typography>
                            <hr></hr>
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vulputate placerat odio, a posuere elit. Nunc eu purus ornare, tristique diam</Typography>
                        </Col>
                        <Col lg={6} className="ms-auto">
                            <Paper>
                                <Title title="Comentario" icon={faHandRock} />
                                <Form noValidate={true} validated={validated} onSubmit={handleSubmit}>
                                    <Margin>
                                        <Form.Label>Numero de pedido</Form.Label>
                                        <Form.Control name="tracking_number" required={true} onChange={handleChange} />
                                    </Margin>
                                    <Margin bottom={2}>
                                        <Form.Label>Comentario</Form.Label>
                                        <Form.Control as="textarea" name="description" required={true} onChange={handleChange} />
                                    </Margin>
                                    <Margin>
                                        <Form.Label>Clasificacion</Form.Label>
                                        <Form.Select name="classification" onChange={handleChange} required={true}>
                                            <option></option>
                                            <option value={0}>Negativo</option>
                                            <option value={1}>Positivo</option>
                                        </Form.Select>
                                    </Margin>
                                    <Margin bottom={2} className="text-end">
                                    <Button type="submit">Enviar</Button>
                                    </Margin>
                                </Form>
                            </Paper>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Home;
