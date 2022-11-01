import { Col, ListGroup, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paper from "../components/Paper";
import Margin from "react-margin";
import Title from "../components/Title";
import Typography from "../components/Typography";
import routes from "../routes";

function OrderDetails({ config }) {
    const { id } = useParams();

    const { data } = useSWR(config.route + String.fromCharCode(47) + id);

    console.log(data);

    return (
        <>
            <Margin>
                <Paper>
                    <Title title="Detalles del pedido" icon={faHandRock} />
                    <Margin>
                        <Row className="g-3">
                            {config.initialState.map((x, index) => {
                                return (
                                    <Col lg={4} key={index}>
                                        <Typography variant="muted">{x.title}</Typography>
                                        <Typography variant={x.options ? x.options[data.data[x.key]].variant : "dark"}>{x.options ? x.options[data.data[x.key]].title : data.data[x.key]}</Typography>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Margin>
                    <Row>
                        <Col>
                            <Link className="btn btn-primary" to={routes.customers + String.fromCharCode(47) + "edit" + String.fromCharCode(47) + data.data.customer_id}>Ver cliente</Link>
                            <Link className="btn btn-link" to={routes.orders + String.fromCharCode(47) + "edit" + String.fromCharCode(47) + data.data.id}>
                                <FontAwesomeIcon icon={faHandRock} />
                            </Link>
                        </Col>
                    </Row>
                </Paper>
            </Margin>
            <Row className="g-3">
                <Col lg={8}>
                    <Paper>
                        <Title title={config.title} icon={config.icon} />
                        <Table responsive={true} borderless={true} hover={true}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio fijo</th>
                                    <th>Cantidad</th>
                                    <th>Monto total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.data.preference_has_order.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.product_id}</td>
                                            <td>{item.product.name}</td>
                                            <td>${item.fixed_price}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.partial_amount}</td>
                                            <td>
                                                <Link to={routes.products + String.fromCharCode(47) + "edit" + String.fromCharCode(47) + item.product_id}>
                                                    <FontAwesomeIcon icon={faHandRock} />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Paper>
                </Col>
                <Col lg={4}>
                    <Paper>
                        <Title title="Detalles del pago" icon="money-withdraw" />
                        <ListGroup variant="flush">
                            {config.preference.map((x, index) => {
                                return (
                                    <ListGroup.Item key={index}>
                                        <Typography variant="muted">{x.title}</Typography>
                                        <Typography type="h5">{(String.fromCharCode(36) + data.data.preference[x.key]).slice(x.dollar ? 0 : 1)}</Typography>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Paper>
                </Col>
            </Row>
        </>
    );
}

export default OrderDetails;
