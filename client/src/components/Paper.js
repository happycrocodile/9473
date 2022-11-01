import { Card } from "react-bootstrap";

function Paper({ children }) {
    return (
        <Card>
            <Card.Body>{children}</Card.Body>
        </Card>
    );
}

export default Paper;
