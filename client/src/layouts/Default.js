import { faHandRock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import { Button, Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Margin from "react-margin";

function Default() {
    const navigate = useNavigate();
    const handleGoBack = () => navigate(-1);
    return (
        <>
            <Sidebar />
            <main>
                <Container>
                    <Margin bottom={4} className="mt-3">
                        <Margin>
                            <Button variant="link" onClick={handleGoBack} className="ps-0">
                                <FontAwesomeIcon icon={faHandRock} className="text-muted" />
                            </Button>
                        </Margin>
                        <Suspense fallback={<Loader />}>
                            <Outlet />
                        </Suspense>
                    </Margin>
                </Container>
            </main>
        </>
    );
}

export default Default;
