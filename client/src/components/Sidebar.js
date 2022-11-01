import { Button, Image, Nav, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../assets";
import Margin from "react-margin";
import Typography from "./Typography";
import config from "../config";
import { useState } from "react";
import routes from "../routes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserAuth } from "../context/UserAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandRock, faListAlt } from "@fortawesome/free-regular-svg-icons";

function NavLink({ to, icon, title }) {
    return (
        <Nav.Item>
            <Link to={to} className="nav-link hstack">
                <Margin end={1}>
                    <FontAwesomeIcon icon={faHandRock} className="text-primary" />
                </Margin>
                <Typography type="span">{title}</Typography>
            </Link>
        </Nav.Item>
    );
}

function Sidebar() {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const { setAuth, userProfile, setRole, setUserProfile, setAccessToken } = useUserAuth();

    const successAlert = () => toast.success("Sesión cerrada con éxito");

    const handleLogout = async () => {
        await axios.get(routes.logout);
        setAuth(false);
        setUserProfile(null);
        setAccessToken(null);
        setRole(2);
        successAlert();
        navigate(routes.login);
    };

    const handleShow = () => setShow(!show);
    return (
        <>
            <Offcanvas show={show} scroll={true} backdrop={false}>
                <Offcanvas.Body>
                    <Margin>
                        <Image src={images.logo} width={40} />
                    </Margin>
                    <Margin>
                        <Typography type="h5">Bienvenid@</Typography>
                        <div className="hstack">
                            <Margin end={1}>
                                <Typography variant="muted">{userProfile.first_name} {userProfile.last_name}</Typography>
                            </Margin>
                            <Button variant="link" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faHandRock} />
                            </Button>
                        </div>
                    </Margin>
                    <Margin>
                        <Nav className="flex-column gap-3">
                            {Object.entries(config).map(([key, link], index) => <NavLink key={index} to={link.route} icon={link.icon} title={link.title} />)}
                        </Nav>
                    </Margin>
                </Offcanvas.Body>
            </Offcanvas>
            <Button variant="link" className="fixed-top ms-auto d-block d-lg-none mt-3" onClick={handleShow}>
                <FontAwesomeIcon icon={faListAlt} size="lg" />
            </Button>
        </>
    );
}

export default Sidebar;
