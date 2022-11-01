import { Col, Row, Spinner } from "react-bootstrap";
import Margin from "react-margin";
import Typography from "./Typography";

function Loader() {
    return (
        <Row className="mt-5">
            <Col className="text-center">
                <Margin>
                    <Spinner animation="border" variant="primary" role="status" />
                </Margin>
                <Typography>Cargando información...</Typography>
            </Col>
        </Row>
    );
}

export default Loader;
