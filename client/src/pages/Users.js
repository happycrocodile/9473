import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import config from "../config/users";
import { useUserAuth } from "../context/UserAuth";

function Users() {
    const { role } = useUserAuth();

    if (role === 1) {
        return <DataTable config={config} />;

    } else {
        toast.error("No tienes los permisos requeridos");
        return <Navigate to={-1} />
    }
}

export default Users;
