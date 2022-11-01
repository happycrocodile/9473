import config from "../config/feedbacks";
import DataTable from "../components/DataTable";

function Feedbacks() {

    return (
        <DataTable config={config} />
    );
}

export default Feedbacks;
