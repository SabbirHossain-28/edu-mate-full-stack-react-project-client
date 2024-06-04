import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";

const useAuth = () => {
    const auth =useContext(AuthContext);
    return auth;
};

export default useAuth;