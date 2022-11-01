import { Suspense, useState } from "react";
import { Badge, Button, Col, Form, Image, InputGroup, Row, Table } from "react-bootstrap";
import useSWR from "swr";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Margin from "react-margin";
import Typography from "./Typography";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";
import Paper from "./Paper";
import Title from "./Title";

function Display({ route, columns, icon, data = [], customButton }) {
    const imagesBaseURL = axios.defaults.baseURL.replace("api", "images") + String.fromCharCode(47);
    const errorDeleteAlert = () => toast.error("No se puede eliminar el recurso porque otro recurso depende de este");
    const successDeleteAlert = () => toast.success("El recurso fue eliminado con éxito");
    const handleDisplayDelete = async id => {
        toast.dismiss();
        try {
            await axios.delete(route + String.fromCharCode(47) + id);
            successDeleteAlert();
        } catch (error) {
            errorDeleteAlert();
        }
    };
    const handleCustomButton = data => {
        if (customButton) {
            customButton(data);
        }
    };
    const handleDeleteConfirmationAlert = id => toast((t) => {
        return (
            <div>
                <Margin>
                    <Typography>¿Está seguro de borrar el recurso con id {id}?</Typography>
                </Margin>
                <Margin bottom={2} className="text-end">
                    <Button variant="link" onClick={() => toast.dismiss(t.id)}>Cancelar</Button>
                    <Button variant="danger" onClick={() => handleDisplayDelete(id)}>Borrar</Button>
                </Margin>
            </div>
        );
    }, { duration: 12000 });

    return (
        <Table responsive={true} borderless={true} hover={true}>
            <thead>
                <tr>
                    <th>Id</th>
                    {columns.map((column, index) => {
                        return (
                            <th key={index}>{column.name}</th>
                        )
                    })}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((x, index) => {
                    return (
                        <tr key={index}>
                            <td>{x.id}</td>
                            {columns.map((column, index) => {
                                return (
                                    <td key={index}>
                                        {column.key !== "image" ? (column.boolean ? <Badge bg={x[column.key] ? "success" : "danger"}>{x[column.key] ? "Activo" : "Oculto"}</Badge> : (column.options ? <Typography variant={column.options[x[column.key]].variant}>{column.options[x[column.key]].title}</Typography> : x[column.key])) : <Image src={imagesBaseURL + x[column.key]} width={80} thumbnail={true} />}
                                    </td>
                                )
                            })}
                            <td className="text-end">
                                <Button variant="link" disabled={x.active !== 0 ? false : true} onClick={() => handleCustomButton(x)}>
                                    <FontAwesomeIcon icon={faHandRock} />
                                </Button>
                                <Link className="btn btn-link px-0" to={route + String.fromCharCode(47) + "edit" + String.fromCharCode(47) + x.id}>
                                    <FontAwesomeIcon icon={faHandRock} />
                                </Link>
                                <Button variant="link" onClick={() => handleDeleteConfirmationAlert(x.id)}>
                                    <FontAwesomeIcon icon={faHandRock} className="text-danger" />
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

function Search({ route, data = [], icon, columns, customButton }) {
    const [active, setActive] = useState(false);
    const [search, setSearch] = useState([]);
    const handleCleanSearch = () => setActive(false);
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            let response = await axios.get(route + String.fromCharCode(63) + "search" + String.fromCharCode(61) + event.target.search.value);
            setSearch(response.data.data);
            setActive(true);

        } catch (error) { }
        event.target.search.value = null;
    }
    return (
        <Margin>
            <Margin>
                <Row className="g-3">
                    <Col lg={2}>
                        <Link className="btn btn-primary" to={route + String.fromCharCode(47) + "create"}>Crear</Link>
                    </Col>
                    <Col>
                        <Form noValidate={true} onSubmit={handleSubmit}>
                            <InputGroup>
                                <Form.Control name="search" placeholder="Escribe aquí..." />
                                <Button type="submit">Buscar</Button>
                            </InputGroup>
                            {active ? <Button variant="link" className="text-danger" onClick={handleCleanSearch}>Limpiar búsqueda</Button> : null}
                        </Form>
                    </Col>
                </Row>
            </Margin>
            <Display data={active ? search : data} icon={icon} route={route} columns={columns} customButton={customButton} />
        </Margin>
    );
}

function Data({ route, icon, columns, customButton }) {
    const [pageNumber, setPageNumber] = useState(1);
    const handleNextPage = () => setPageNumber(pageNumber + 1);
    const handlePrevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };
    const pagination = String.fromCharCode(63) + "page" + String.fromCharCode(61);
    const { data } = useSWR(route + pagination + pageNumber);
    return (
        <>
            <Search data={data.data} icon={icon} route={route} columns={columns} customButton={customButton} />
            <Margin botttom={2}>
                <Row>
                    <Col lg={6} className="text-center text-lg-start">
                        <Typography>Página: {pageNumber}</Typography>
                    </Col>
                    <Col className="text-center text-lg-end">
                        <Button variant="link" onClick={handlePrevPage}>
                            <FontAwesomeIcon icon={faHandRock} size="lg" />
                            <Typography type="span">Volver</Typography>
                        </Button>
                        <Button variant="link" onClick={handleNextPage}>
                            <Typography type="span">Siguiente</Typography>
                            <FontAwesomeIcon icon={faHandRock} size="lg" />
                        </Button>
                    </Col>
                </Row>
            </Margin>
        </>
    );
}

function DataTable({ config, icon = "block", customButton }) {
    return (
        <Paper>
            <Title title={config.title} icon={config.icon} />
            <Suspense fallback={<Loader />}>
                <Data route={config.route} icon={icon} columns={config.columns} customButton={customButton} />
            </Suspense>
        </Paper>
    );
}

export default DataTable;
