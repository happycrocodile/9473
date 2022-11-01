import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuth";
import routes from "../routes";

function CheckAccessToken() {
    const { setAuth, setRole, setUserProfile, setAccessToken } = useUserAuth();
    const navigate = useNavigate();

    const accessToken = sessionStorage.getItem("access_token");

    const recoverUserProfile = async () => {
        try {
            let response = await axios.get(routes.userProfile);
            setAuth(true);
            setUserProfile(response.data.data);
            setAccessToken(accessToken);
            setRole(response.data.data.role_id);
            navigate(-1);

        } catch (error) {
            navigate(routes.login);
        }
    }

    useEffect(() => {
        accessToken ? recoverUserProfile() : navigate(routes.login);

    }, []);

    return <></>;
}

export default CheckAccessToken;
