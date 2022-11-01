import routes from "../routes";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";

const columns = [
    {
        name: "Número de pedido",
        key: "tracking_number"
    },
    {
        name: "Activo",
        key: "active",
        boolean: true,
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
        name: "tracking_number",
        required: false,
        disabled: true,
        description: "Campo no editable",
    },
    {
        title: "Clasificación",
        name: "classification",
        type: "select",
        options: ["Negativo", "Positivo"],
        disabled: true,
    },
    {
        title: "Activo",
        name: "active",
        type: "select",
        options: ["Oculto", "Activo"],
    },
    {
        title: "Descripción",
        name: "description",
        as: "textarea",
        required: false,
        disabled: true,
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

const config = {
    title: "Comentarios",
    icon: faHandRock,
    form: {
        created_id: null,
        inputs: inputs
    },
    route: routes.feedbacks,
    columns: columns,
};

export default config;
