import routes from "../routes";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";

const columns = [
    {
        name: "Imagen",
        key: "image"
    },
    {
        name: "Nombre",
        key: "name"
    },
    {
        name: "Precio unitario",
        key: "unit_price"
    },
    {
        name: "Estado",
        key: "active",
        boolean: true,
    }
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
        name: "name"
    },
    {
        title: "Precio unitario",
        name: "unit_price",
        type: "number",
    },
    {
        title: "Activo",
        name: "active",
        type: "select",
        options: ["Oculto", "Activo"],
        hidden: true,
    },
    {
        title: "Categoria",
        name: "category_id",
        type: "select",
        route: routes.categories,
        option: {
            key: "name"
        }
    },
    {
        title: "Descripción",
        name: "description",
        as: "textarea",
        required: false,
    },
    {
        title: "Imagen",
        name: "image_file",
        type: "file",
        required: false,
        description: "Si no selecciona una imagen al momento de editar, la imagen no se actualiza"
    },
    {
        title: "Total de ventas",
        name: "total_sales",
        description: "Campo no editable",
        disabled: true,
        required: false,
        hidden: true,
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
        hidden: true,
    },
];

const config = {
    title: "Productos",
    icon: faHandRock,
    route: routes.products,
    form: {
        created_id: "product_id",
        inputs: inputs
    },
    columns: columns,
    transport_file: true
};

export default config;
