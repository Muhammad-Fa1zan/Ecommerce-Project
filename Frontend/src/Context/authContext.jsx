const { createContext } = require("react");


const authContext = createContext();

function AuthProvider({ children }) {
    return (
        <authContext.Provider value={{}}>
            {children}
        </authContext.Provider>
    )
}



