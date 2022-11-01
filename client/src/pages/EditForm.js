import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import BuildForm from "../components/BuildForm";
import Paper from "../components/Paper";
import Title from "../components/Title";
import useSWR from "swr";
import axios from "axios";

function EditForm({ config }) {
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useReducer((state, event) => {
        return {
            ...state,
            [event.name]: event.value
        };
    }, {});
    const successEditAlert = id => toast.success("El recurso con id " + id + " fue editado con exito");
    const errorEditAlert = () => toast.error("Error al editar el recurso");
    const handleChange = event => setData({ name: event.target.name, value: event.target.value });

    const handleSubmit = async event => {
        event.preventDefault();

        if (event.currentTarget.checkValidity() === true) {

            const formData = new FormData();

            if (config.transport_file) {
                inputs.forEach(input => {

                    if (input.type === "file") {
                        const imageFile = event.target[input.name].files[0];
                        if (imageFile) formData.append(input.name, imageFile);
                    
                    } else {
                        formData.append(input.name, data[input.name]);
                    }
                });
            }

            try {
                await axios({
                    method: config.transport_file ? "post" : "put",
                    url: config.route + String.fromCharCode(47) + id,
                    data: config.transport_file ? formData : data
                });
                successEditAlert(id);
                navigate(-1);
            } catch (error) {
                errorEditAlert();
            }
        }

        setValidated(true);
    };

    const { data: oldData } = useSWR(config.route + String.fromCharCode(47) + id);

    const handleAddDefaultValue = (inputs = [], data) => {
        inputs.forEach(input => {
            input.defaultValue = data[input.name];
            setData({ name: input.name, value: data[input.name] });
        });

        setInputs(inputs);
    };

    useEffect(() => {
        handleAddDefaultValue(config.form.inputs, oldData.data);
    }, []);

    return (
        <Paper>
            <Title title={config.title} icon={config.icon} />
            <BuildForm validated={validated} submitButton="Editar" formMode={1} inputs={inputs} onSubmit={handleSubmit} onChange={handleChange} />
        </Paper>
    );
}

export default EditForm;
