import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, FormControl, FormSelect, ListGroup, Row, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Paper from "../components/Paper";
import Margin from "react-margin";
import Title from "../components/Title";
import Typography from "../components/Typography";
import config from "../config/cart";
import { useCart } from "../context/Cart";
import routes from "../routes";

function Cart() {
    const { payer, setPayer, cart, setCart } = useCart();
    const [totalAmount, setTotalAmount] = useState(0);
    const [payload, setPayload] = useState([]);
    const [description, setDescription] = useState(null);
    const navigate = useNavigate();

    const customer = [
        {
            title: "Id",
            description: payer?.id
        },
        {
            title: "Nombre completo",
            description: payer?.first_name + String.fromCharCode(32) + payer?.last_name
        },
        {
            title: "Teléfono",
            description: payer?.phone
        },
        {
            title: "Dirección",
            description: payer?.street_name + String.fromCharCode(44) + String.fromCharCode(32) + payer?.city
        },
    ];

    const handleDeleteDuplicates = () => {
        let patch = {};
        const oldCart = cart.filter(x => patch[x.product_id] ? false : patch[x.product_id] = true);
        setPayload(oldCart);

        handleCalculateTotalAmount(oldCart);
    };

    const handleCalculateTotalAmount = data => {
        let a = 0;
        data.forEach(x => {
            a += x.partial_amount;
        });

        setTotalAmount(a);
    };

    const handleChange = event => {

        const quantity = parseInt(event.target.value);

        payload.forEach(x => {
            if (x.product_id === parseInt(event.target.name)) {

                x.quantity = quantity;
                x.partial_amount = x.data.unit_price * quantity;
            }
        });

        handleCalculateTotalAmount(payload);
    }

    const handleSubmitPayload = async () => {
        try {
            let { data: preference } = await axios.post(routes.createPreference, { "preference_has_order": payload });
            let { data: order } = await axios.post(routes.orders, { customer_id: payer.id, preference_id: preference.data.preference_id, description: description });

            setCart([]);
            setPayload([]);
            setTotalAmount(0);
            setPayer(null);

            toast.success("Pedido creado con éxito");

            return navigate("/order-details" + String.fromCharCode(47) + order.data.order_id);

        } catch (error) {
            toast.error("No tienes los permisos requeridos");
        }
    };

    useEffect(() => {

        if (!payer) {
            toast.error("Para comenzar seleccione un cliente");
            return navigate(routes.customers);
        }

        handleDeleteDuplicates();
    }, []);

    return (
        <Row className="g-3">
            <Col lg={4}>
                <Paper>
                    <Title title="Detalles del cliente" icon="user" />
                    <ListGroup variant="flush">

                        {customer.map((detail, index) => {
                            return (
                                <ListGroup.Item key={index}>
                                    <Typography variant="muted">{detail.title}</Typography>
                                    <Typography>{detail.description}</Typography>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Paper>
            </Col>
            <Col>
                <Margin>
                    <Paper>
                        <Title title={config.title} icon={config.icon} />
                        <Table responsive={true} borderless={true}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio unitario</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payload.map((x, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{x.data.id}</td>
                                            <td>{x.data.name}</td>
                                            <td>${x.data.unit_price}</td>
                                            <td>
                                                <FormSelect name={x.product_id} defaultValue={x.quantity} onChange={handleChange}>
                                                    {[...Array(15)].map((option, index) => {
                                                        return (
                                                            <option key={index} value={index + 1}>{index + 1}</option>
                                                        )
                                                    })}
                                                </FormSelect>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        {payload.length === 0 ? <Link className="btn btn-primary" to={routes.products}>Añadir productos</Link> : null}
                    </Paper>
                </Margin>

                <Paper>
                    <Title title="Detalles del pedido" icon="receipt" />

                    <Margin>
                        <Typography variant="muted">Comentario</Typography>
                        <FormControl as="textarea" placeholder="Escribe aquí..." onChange={event => setDescription(event.target.value)} />
                    </Margin>
                    <Margin>
                        <Typography variant="muted">Total a pagar</Typography>
                        <Typography type="h4">${totalAmount.toFixed(2)}</Typography>
                    </Margin>
                    <Margin bottom={2} className="text-end">
                        <Button disabled={payload.length > 0 ? false : true} onClick={handleSubmitPayload}>Continuar</Button>
                    </Margin>
                </Paper>
            </Col>
        </Row>
    );
}

export default Cart;
