import { useEffect, useReducer, useState } from "react";
import Paper from "../components/Paper";
import Title from "../components/Title";
import BuildForm from "../components/BuildForm";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuth";

function CreateForm({ config }) {
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useReducer((state, event) => {
        return {
            ...state,
            [event.name]: event.value
        };
    }, {});
    const successCreateAlert = id => toast.success("El recurso fue creado con exito el id es " + id);
    const errorCreateAlert = () => toast.error("Error al crear el recurso");
    const handleChange = event => setData({ name: event.target.name, value: event.target.value });

    const handleSubmit = async event => {
        event.preventDefault();

        if (event.currentTarget.checkValidity() === true) {
            const formData = new FormData();
            inputs.forEach(input => {
                if (input.type === "file") {
                    formData.append(input.name, event.target[input.name].files[0]);

                } else {
                    formData.append(input.name, data[input.name]);
                }
            });

            try {
                let response = await axios.post(config.route, formData);
                successCreateAlert(response.data.data[config.form.created_id]);
                navigate(-1);

            } catch (error) {
                errorCreateAlert();
            }
        }

        setValidated(true);
    };

    const handleRemoveDefaultValue = (inputs = []) => {
        inputs.forEach(input => {
            input.defaultValue = null;
        });

        setInputs(inputs);
    };

    useEffect(() => {
        handleRemoveDefaultValue(config.form.inputs);
    }, []);

    return (
        <Paper>
            <Title title={config.title} icon={config.icon} />
            <BuildForm validated={validated} inputs={inputs} onSubmit={handleSubmit} onChange={handleChange} />
        </Paper>
    );
}

function IsAcceptedRole({ config }) {
    const { role } = useUserAuth();

    if (role === 1 || role === 2) {
        return <CreateForm config={config} />;
    
    } else {
        toast.error("No tienes los permisos requeridos");
        return <Navigate to={-1} />
    }
}

export default IsAcceptedRole;
