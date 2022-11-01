import { createContext, useContext, useState } from "react";
const context = createContext();

export const useUserAuth = () => useContext(context);

function UserAuth({ children }) {
    const [auth, setAuth] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(2);

    return (
        <context.Provider value={{ auth, setAuth, userProfile, setRole, role, setUserProfile, accessToken, setAccessToken }}>
            {children}
        </context.Provider>
    );
}

export default UserAuth;
