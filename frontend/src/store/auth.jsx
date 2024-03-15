import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, settoken] = useState(localStorage.getItem("Token"))
    const [user, setuser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [attendanceData, setattendanceData] = useState('')
    const AuthorizationToken = `Bearer ${token}`;

     const Apipath = "http://localhost:8000" || import.meta.env.Server_Address ;


    const storeTokenInLs = (servertoken) => {
        settoken(servertoken)
        return localStorage.setItem('Token', servertoken)
    };

    let isLoggedIn = !!token;
    // console.log(isLoggedIn)

    const LogoutUser = () => {
        settoken("");
        return localStorage.removeItem("Token")
    }

    //Jwt get the User Data who is currently loged in
    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${Apipath}/api/user`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                }
            })
            if (response.ok) {
                const data = await response.json();
                setuser(data.userData)
                // console.log(data.userData)
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const userAttendance = async()=>{
        try {
            const response = await fetch(`${Apipath}/api/get_attendance`, {
                method: "GET",
                headers: {
                  Authorization: AuthorizationToken,
                },
              });
              const result = await response.json()
              setattendanceData(result)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(attendanceData)

    useEffect(() => {
        userAuthentication()
        userAttendance()
    }, [])


    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, LogoutUser, user, isLoading, AuthorizationToken, Apipath,userAuthentication,userAttendance,attendanceData}}>
        {children}
    </AuthContext.Provider>
}

/* it is called Consumer */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider")
    }
    return authContextValue;
}