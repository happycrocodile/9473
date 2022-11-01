import routes from "../routes";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";

const columns = [
    {
        name: "Nombre",
        key: "name"
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
        name: "name",
    },
];

const config = {
    title: "Categorias",
    icon: faHandRock,
    route: routes.categories,
    form: {
        created_id: "category_id",
        inputs: inputs
    },
    columns: columns,
};

export default config;
