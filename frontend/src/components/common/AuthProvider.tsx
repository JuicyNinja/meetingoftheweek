
import { useContext, createContext, useState } from "react";
import { signin as signinFn} from "../../services";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthContext = createContext<any>(null);

interface AuthProviderProps{
  children:React.ReactNode;
}
export const AuthProvider = ({ children }:AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data:{email:string,password:string}) => {
    try {
      const res = await signinFn(data);
      if (res.data) {
        setUser(res.data);
        setToken(res.accessToken);
        localStorage.setItem("site", res.accessToken);
        navigate("/admin/dashboard");
        return;
      } else {
        toast.error(`Error: ${res?.status}`, {
          hideProgressBar: true,
          autoClose: 5000,
          type: "error",
          position: "top-right",
      });
      }
    } catch (err) {
      // throw new Error(res.message);
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=() =>{  
  const context= useContext(AuthContext);
  return context;
};

