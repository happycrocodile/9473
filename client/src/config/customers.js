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
        title: "Teléfono",
        name: "phone",
        description: "El número de teléfono es único, si ya se registró ocurrirá un error",
        disabled: true
    },
    {
        title: "Correo electrónico",
        name: "email",
        type: "email",
    },
    {
        title: "Género",
        name: "gender_id",
        type: "select",
        route: routes.genders,
        option: {
            key: "name"
        },
    },
    {
        title: "Provincia",
        name: "province_id",
        type: "select",
        route: routes.provinces,
        option: {
            key: "name"
        },
    },
    {
        title: "Localidad",
        name: "city",
    },
    {
        title: "Dirección",
        name: "street_address",
    },
    {
        title: "Total de compras",
        name: "total_purchases",
        description: "Campo no editable",
        disabled: true,
        required: false,
        hidden: true
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
    title: "Clientes",
    icon: faHandRock,
    form: {
        created_id: "customer_id",
        inputs: inputs,
    },
    route: routes.customers,
    columns: columns,
};

export default config;
