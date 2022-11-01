import Margin from "react-margin";
import Title from "../components/Title";
import Paper from "../components/Paper";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import Typography from "../components/Typography";
import { useUserAuth } from "../context/UserAuth";
import routes from "../routes";
import { useReducer, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function UserProfile() {

    const { userProfile } = useUserAuth();
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
                await axios.put(routes.updatePassword, data);
                toast.success("Contraseña actualizada con éxito");

            } catch (error) { }
        }

        setValidated(true);
    };

    return (
        <Margin>
            <Row>
                <Col lg={6}>
                    <Paper>
                        <Title title="Mi cuenta" icon="user" />

                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Typography variant="muted">Nombre y apellido</Typography>
                                <Typography>{userProfile.first_name} {userProfile.last_name}</Typography>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Typography variant="muted">Usuario</Typography>
                                <Typography>{userProfile.username}</Typography>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Typography variant="muted">Rol</Typography>
                                <Typography>{userProfile.role.name}</Typography>
                            </ListGroup.Item>
                        </ListGroup>
                    </Paper>
                </Col>
                <Col>
                    <Paper>
                        <Title title="Cambiar contraseña" icon="lock" />
                        <Form noValidate={true} validated={validated} onSubmit={handleSubmit}>
                            <Margin>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleChange} required={true} />
                            </Margin>
                            <Margin>
                                <Form.Label>Confirmar contraseña</Form.Label>
                                <Form.Control type="password" name="password_confirmation" onChange={handleChange} required={true} />
                            </Margin>
                            <Button type="submit">Cambiar</Button>
                        </Form>
                    </Paper>
                </Col>
            </Row>
        </Margin>
    );
}

export default UserProfile;
