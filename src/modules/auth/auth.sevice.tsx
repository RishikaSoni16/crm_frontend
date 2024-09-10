import { AxiosResponse } from "axios";
import ServerUrl from "../../core/constants/serverUrl.constant";
import { ApiPageResponse } from "../../core/models/api.models";
import ApiService from "../../core/services/api.service";
import { LoginUserRequest, SignupUserRequest } from "./models/auth.models";
import StorageService from "../../core/services/storage.service";
import { APPLICATION_CONSTANTS } from "../../core/constants/app.constant";

class AuthService {
    // declaring and accessing API service property
    private apiService:ApiService;
    constructor() {
        // initializing API service Property one time
        this.apiService = new ApiService();
    }
    /**
     * Login user functionality
     * accepts email & password and calling login API
     */
    public loginUser(formData:LoginUserRequest):Promise<ApiPageResponse> {
        return new Promise((resolve,reject)=>{
            this.apiService.apipost(ServerUrl.API_LOGIN_USER,formData).then((resp:AxiosResponse)=>{
                if(resp.data && 'token' in resp.data) {
                    StorageService.setData(APPLICATION_CONSTANTS.STOARAGE.TOKEN,resp.data);
                    resolve({message: "Login success", status:200});
                }
            }).catch((error)=>{
                console.log(error);
                resolve({message:"Invalid username or password", status:404})
            })
        })
    }
    /**
     * Signup user functionality
    */
    public signUpUser(formData:SignupUserRequest):Promise<ApiPageResponse> {
        return new Promise((resolve,reject)=>{
            this.apiService.apipost(ServerUrl.API_REGISTER_USER,formData).then((resp:AxiosResponse)=>{
                if(resp.data){
                    resolve({message: "Register success", status:200});
                }
            }).catch((error)=>{
                console.log(error);
                resolve({message:"Something went wrong in the register", status:404})
            })
        })
    }

}


export default AuthService;