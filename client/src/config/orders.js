import routes from "../routes";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";

const columns = [
    {
        name: "Número de pedido",
        key: "order_number"
    },
    {
        name: "Estado",
        key: "status_id",
        options: [
            {},
            {
                title: "Pendiente",
                variant: "warning"
            },
            {
                title: "Completado",
                variant: "success"
            },
            {
                title: "Cancelado",
                variant: "danger"
            },
        ],
    },
    {
        name: "Fecha de creación",
        key: "created_at",
    },
    {
        name: "Fecha de actualización",
        key: "updated_at",
    },
];

const inputs = [
    {
        title: "Id",
        name: "id",
        required: false,
        disabled: true,
        description: "Campo no editable",
    },
    {
        title: "Número de pedido",
        name: "order_number",
        required: false,
        disabled: true,
        description: "Campo no editable",
    },
    {
        title: "Estado",
        name: "status_id",
        type: "select",
        route: routes.status,
        option: {
            key: "name"
        },
    },
    {
        title: "Descripción",
        name: "description",
        as: "textarea",
        required: false,
    },
    {
        title: "Fecha de creación",
        name: "created_at",
        description: "Por defecto al crear se usa la fecha actual",
        disabled: true,
        required: false,
    },
    {
        title: "Última actualización",
        name: "updated_at",
        description: "Campo no editable",
        disabled: true,
        required: false,
    },
];

const initialState = [
    {
        title: "Id",
        key: "id",
    },
    {
        title: "Número de pedido",
        key: "order_number",
    },
    {
        title: "Estado",
        key: "status_id",
        options: [
            {},
            {
                title: "Pendiente",
                variant: "warning"
            },
            {
                title: "Completado",
                variant: "success"
            },
            {
                title: "Cancelado",
                variant: "danger"
            },
        ],
    },
    {
        title: "Fecha de creación",
        key: "created_at",
    },
    {
        title: "Última actualización",
        key: "updated_at",
    },
    {
        title: "Descripción",
        key: "description",
    },
];

const preference = [
    {
        title: "Cantidad pagada",
        key: "payment_amount",
        dollar: true,
    },
    {
        title: "Cantidad devuelta",
        key: "refund_amount",
        dollar: true,
    },
    {
        title: "Fecha de creación del pago",
        key: "created_at",
    },
    {
        title: "Última actualización del pago",
        key: "updated_at",
    },
];

const config = {
    title: "Pedidos",
    icon: faHandRock,
    route: routes.orders,
    form: {
        created_at: null,
        inputs: inputs,
    },
    initialState: initialState,
    preference: preference,
    columns: columns,
};

export default config;
