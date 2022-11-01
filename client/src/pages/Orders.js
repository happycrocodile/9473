import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import config from "../config/orders";
import routes from "../routes";

function Orders() {

    const navigate = useNavigate();

    const handleDisplayDetails = data => navigate("/order-details" + String.fromCharCode(47) + data.id);

    return (
        <DataTable config={config} icon="show-alt" customButton={handleDisplayDetails} />
    );
}

export default Orders;