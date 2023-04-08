import {createContext, useContext, useState} from "react";

const AuthContext = createContext({
    setUser: () => {},
    user: null
})

function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const data = localStorage.getItem("user");
    let jsonObject = ""
    if (data !== null) {
        jsonObject = JSON.parse(data);
    }
    const [user, setUser] = useState(jsonObject);
    return (
        <AuthContext.Provider value={{setUser,user}}>
            {children}
        </AuthContext.Provider>
    );
}


export {AuthContext, useAuth, AuthProvider}