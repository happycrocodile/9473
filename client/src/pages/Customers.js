import config from "../config/customers";
import DataTable from "../components/DataTable";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import routes from "../routes";
import { useNavigate } from "react-router-dom";
function Customers() {

    const { setPayer } = useCart();

    const navigate = useNavigate();

    const handleSuccessAddCustomerAlert = () => toast.success("Cliente seleccionado");

    const handleAddCustomerCart = data => {
        toast.dismiss();
        setPayer(data);
        handleSuccessAddCustomerAlert();
        navigate(routes.cart);
    };

    return (
        <DataTable config={config} icon="user-plus" customButton={handleAddCustomerCart} />
    );
}

export default Customers;
