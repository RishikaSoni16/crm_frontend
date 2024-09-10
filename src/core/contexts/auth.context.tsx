import { ReactNode, useState, useContext, createContext, useEffect } from "react";
import StorageService from "../services/storage.service";
import { APPLICATION_CONSTANTS } from "../constants/app.constant";

const AuthContext:any = createContext<any>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const [loading, setLoading] = useState(true);

   useEffect(()=>{
    const checkUserDetails = StorageService.getData(APPLICATION_CONSTANTS.STOARAGE.USER_DETAILS);
    
    if(checkUserDetails){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false)
   },[])

   return (
       <AuthContext.Provider value={{ isLoggedIn,setIsLoggedIn,loading }}>
       {children}
       </AuthContext.Provider>
   );
};

export const useAuthContext = (): any => {
    const context = useContext(AuthContext);
    return context;
}
