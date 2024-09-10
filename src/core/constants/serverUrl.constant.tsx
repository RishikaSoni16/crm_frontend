class ServerUrl {
    // private static readonly BASE_URL:string = ``;

    // Base URL
    // http://192.168.1.11:8080/auth/login

    private static readonly API_MODULE_AUTH:string = "auth";
    public static readonly API_LOGIN_USER:string = ServerUrl.API_MODULE_AUTH + "/login";
    public static readonly API_REGISTER_USER:string = ServerUrl.API_MODULE_AUTH + "/signup";

    private static readonly API_MODULE_USER:string = "users";
    public static readonly API_GET_ROLES:string = ServerUrl.API_MODULE_USER + "/getRole";
    public static readonly API_CREATE_USER:string = ServerUrl.API_MODULE_USER + "/createUser";
    public static readonly API_LIST_USER:string = ServerUrl.API_MODULE_USER + "/getAllUsers";
    public static readonly API_DELETE_USER:string = ServerUrl.API_MODULE_USER + "/deleteUserById";
    public static readonly API_UPDATE_USER:string = ServerUrl.API_MODULE_USER + "/update";

    private static readonly API_MODULE_CUSTOMER: string = "customer";
    public static readonly API_LIST_CUSTOMER: string = ServerUrl.API_MODULE_CUSTOMER + "/listCustomers";
    public static readonly API_CREATE_CUSTOMER: string = ServerUrl.API_MODULE_CUSTOMER + "/saveCustomer";
    public static readonly API_VIEW_CUSTOMER: string = ServerUrl.API_MODULE_CUSTOMER + "/getCustomerById";
    public static readonly API_EDIT_CUSTOMER: string = ServerUrl.API_MODULE_CUSTOMER + "/updateCustomer";
    public static readonly API_DELETE_CUSTOMER: string = ServerUrl.API_MODULE_CUSTOMER + "/deleteCustomer";

    public static readonly API_GET_SEGMENTS: string = ServerUrl.API_MODULE_CUSTOMER + "/getSegment";
    public static readonly API_GET_ACCOUNTNAMES: string = ServerUrl.API_MODULE_CUSTOMER + "/getAccountName";
    public static readonly API_GET_AMCTYPE: string = ServerUrl.API_MODULE_CUSTOMER + "/getAmcType";
    public static readonly API_GET_AMCSTATUS: string = ServerUrl.API_MODULE_CUSTOMER + "/getAmcStatus";
    public static readonly API_GET_SLA: string = ServerUrl.API_MODULE_CUSTOMER + "/getSla";
    public static readonly API_GET_AGREEDRESPONSE: string = ServerUrl.API_MODULE_CUSTOMER + "/getAgreedResponse";
    public static readonly API_GET_AGREEDRESOLUTION: string = ServerUrl.API_MODULE_CUSTOMER + "/getAgreedResolution";
    public static readonly API_GET_BILLINGCYCLE: string = ServerUrl.API_MODULE_CUSTOMER + "/getBillingCycle";
    public static readonly API_GET_MONTH_BY_AMC_FRM_DATE: string = ServerUrl.API_MODULE_CUSTOMER + "/first-quarter?amcFromDate=";
    public static readonly API_GET_AMCSYSTEM: string = ServerUrl.API_MODULE_CUSTOMER + "/getAmcSystem";
}
export default ServerUrl;

