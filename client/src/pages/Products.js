import routes from "../routes";
import config from "../config/products";
import DataTable from "../components/DataTable";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

function Products() {

    const { cart, setCart } = useCart();

    const handleAddProductCartAlert = () => toast.success("Producto agregado al carrito");

    const handleAddProductCart = data => {

        setCart([...cart, { product_id: data.id, data: data, quantity: 1, partial_amount: data.unit_price }]);

        handleAddProductCartAlert();
    };

    return (
        <DataTable route={routes.products} icon="cart-add" customButton={handleAddProductCart} config={config} />
    );
}

export default Products;
