class RoutePath {
    public static readonly DEFAULT:string = "/";
    
    public static readonly AUTH:string = "auth";
    public static readonly AUTH_LOGIN:string =  "login";
    public static readonly AUTH_SIGNUP:string =  "signup";
    
    // After login
    public static readonly AUTHENTICATED:string =  "dashboard";
    
    // User module
    public static readonly AUTHENTICATED_USER:string = "user";
    public static readonly AUTHENTICATED_USER_LIST:string = "list";
    public static readonly AUTHENTICATED_ADD_USER:string = "add";

    // customer module
    public static readonly AUTHENTICATED_CUSTOMER:string = "customer";
    public static readonly AUTHENTICATED_CUSTOMER_LIST:string = "list";
    public static readonly AUTHENTICATED_ADD_CUSTOMER:string = "add";

    // complaint module
    public static readonly AUTHENTICATED_COMPLAINT:string = "complaint";
    public static readonly AUTHENTICATED_COMPLAINT_LIST:string = "list";
    public static readonly AUTHENTICATED_COMPLAINT_USER:string = "add";
}

export default RoutePath;