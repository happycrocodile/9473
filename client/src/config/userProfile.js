import routes from "../routes";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";

const columns = [
    {
        name: "Nombre",
        key: "first_name"
    },
    {
        name: "Apellido",
        key: "last_name"
    },
    {
        name: "Teléfono",
        key: "phone"
    },
    {
        name: "Localidad",
        key: "city"
    },
    {
        name: "Dirección",
        key: "street_name"
    },
];

const config = {
    title: "Mi perfil",
    icon: faHandRock,
    route: routes.userProfile,
    columns: columns,
};

export default config;
