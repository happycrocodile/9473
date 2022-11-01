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
        name: "Username",
        key: "username"
    },
];

const inputs = [
    {
        title: "Id",
        name: "id",
        required: false,
        disabled: true,
        description: "Campo no editable",
        hidden: true,
    },
    {
        title: "Nombre",
        name: "first_name",
    },
    {
        title: "Apellido",
        name: "last_name",
    },
    {
        title: "Usuario",
        name: "username",
        disabled: true,
        required: false,
    },
    {
        title: "Contraseña",
        name: "password",
        type: "password",
        required: false,
    },
    {
        title: "Confirmar contraseña",
        name: "password_confirmation",
        type: "password",
        required: false,
    },
    {
        title: "Rol",
        name: "role_id",
        type: "select",
        route: routes.roles,
        option: {
            key: "name"
        }
    },
    {
        title: "Fecha de creación",
        name: "created_at",
        description: "Campo no editable",
        disabled: true,
        required: false,
        hidden: true,
    },
    {
        title: "Última actualización",
        name: "updated_at",
        description: "Campo no editable",
        disabled: true,
        required: false,
        hidden: true
    },
];

const config = {
    title: "Usuarios",
    icon: faHandRock,
    form: {
        created_id: "user_id",
        inputs: inputs,
    },
    route: routes.users,
    columns: columns,
};

export default config;
