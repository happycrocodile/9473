import routes from "../routes";
import customer from "./customers";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";

const config = {
    title: "Carrito",
    icon: faHandRock,
    relationship: {
        customer: customer
    },
    route: routes.cart,
};

export default config;
