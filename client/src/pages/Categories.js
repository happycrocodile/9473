import routes from "../routes";
import config from "../config/categories";
import DataTable from "../components/DataTable";

function Categories() {
    return (
        <DataTable route={routes.categories} config={config} />
    );
}

export default Categories;
