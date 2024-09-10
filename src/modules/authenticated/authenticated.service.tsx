import { resolve } from "path";
import ServerUrl from "../../core/constants/serverUrl.constant";
import { ApiPageResponse } from "../../core/models/api.models";
import ApiService from "../../core/services/api.service";
import {AxiosResponse} from 'axios';
import { rejects } from "assert";
import { data } from "autoprefixer";

class AuthenticatedService{
    private apiService:ApiService = new ApiService();

    public signUpUser(formData:any):Promise<ApiPageResponse>{
        return new Promise((resolve,reject)=>{
        this.apiService.apipost(ServerUrl.API_REGISTER_USER,formData).then((resp:AxiosResponse)=>{
            if(resp && resp.data && resp.data.status == 200){
                resolve({message: "Register success", status:200});
            }else{
                resolve({message:"Something went wrong in the register", status:404})
            }
        })  
    })
    }

    public listAllUsers(subUrl:string = ""):Promise<any>
    {
        return new Promise((resolve, reject) =>{
            this.apiService.apiget(ServerUrl.API_LIST_USER + subUrl).then((resp:AxiosResponse)=>{
                if(resp && resp.data && resp.data.status == 200){
                    resolve({message: "Register success", status:200, data:resp.data});
                }else{
                    resolve({message:"Something went wrong in the register", status:404})
                }
            }).catch((error) => {
                reject(error);
            }); 
        })
    }

    public fetchRoles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_ROLES).then((resp: AxiosResponse) => {
                    if (resp && resp.data  && resp.data.status == 200) {
                        resolve(resp.data); 
                    } else {
                        reject("No roles found");
                    }
                })
                .catch((error) => {
                    reject("Failed to fetch roles");
                });
        });
    }

    public async deleteUser(userId: string): Promise<ApiPageResponse> {
        try {
            const url = `${ServerUrl.API_DELETE_USER}/${userId}`;
            const resp: AxiosResponse = await this.apiService.apidelete(url);
            
            if (resp && resp.status === 200) {
                return { message: "User deleted successfully", status: 200 };
            } else {
                return { message: "Failed to delete user", status: resp.status };
            }
        } catch (error) {
          
            return { message: "Unknown error", status: 500 };
        }
    }
    
    public async updateUser(user: any): Promise<ApiPageResponse> {
        try {
            const url = `${ServerUrl.API_UPDATE_USER}/${user.id}`;
            const resp: AxiosResponse = await this.apiService.apiput(url, user);

            if (resp && resp.status === 200) {
                return { message: "User updated successfully", status: 200 };
            } else {
                return { message: "Failed to update user", status: resp.status };
            }
        } catch (error) {
            // Optionally, log the error or provide more details
            console.error("Error updating user:", error);
            return { message: "Unknown error occurred", status: 500 };
        }
    }

    public createCustomer(formData: any): Promise<ApiPageResponse> {
        return new Promise((resolve, reject) => {

            this.apiService.apipost(ServerUrl.API_CREATE_CUSTOMER, formData).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve({ message: "Customer created success", status: 200 });
                } else {
                    resolve({ message: "Something went wrong in the create customer", status: 404 })
                }
            })
        })
    }

    public listAllCustomers(subUrl:string = ""):Promise<any>
    {
        return new Promise((resolve, reject) =>{
            this.apiService.apiget(ServerUrl.API_LIST_CUSTOMER + subUrl).then((resp:AxiosResponse)=>{
                if(resp && resp.data && resp.data.status == 200){
                    resolve({message: "Register success", status:200, data:resp.data});
                }else{
                    resolve({message:"Something went wrong in the register", status:404})
                }
            }).catch((error) => {
                reject(error);
            }); 
        })
    }
    
    public async editCustomer(customer: any): Promise<ApiPageResponse> {
        try {
            const url = `${ServerUrl.API_EDIT_CUSTOMER}/${customer.id}`;
            const resp: AxiosResponse = await this.apiService.apiput(url, customer);

            if (resp && resp.status === 200) {
                return { message: "customer updated successfully", status: 200 };
            } else {
                return { message: "Failed to update customer", status: resp.status };
            }
        } catch (error) {
            // Optionally, log the error or provide more details
            console.error("Error updating customer:", error);
            return { message: "Unknown error occurred", status: 500 };
        }
    }
    public fetchViewCustomer(customerId:any):Promise<any>
    {
        return new Promise((resolve, reject) =>{
            const url = `${ServerUrl.API_VIEW_CUSTOMER}/${customerId}`;
            this.apiService.apiget(url).then((resp:AxiosResponse)=>{
                if(resp && resp.data && resp.data.status == 200){
                    resolve({message: "View button clicked", status:200, data:resp.data});
                }else{
                    resolve({message:"Something went wrong in the View", status:404})
                }
            }).catch((error) => {
                reject(error);
            }); 
        })
    }
    

    public async deleteCustomer(userId: string): Promise<ApiPageResponse> {
        try {
            const url = `${ServerUrl.API_DELETE_CUSTOMER}/${userId}`;
            const resp: AxiosResponse = await this.apiService.apidelete(url);
            
            if (resp && resp.status === 200) {
                return { message: "User deleted successfully", status: 200 };
            } else {
                return { message: "Failed to delete user", status: resp.status };
            }
        } catch (error) {
            console.error('Error in deleteCustomer:', error);
            return { message: "Unknown error", status: 500 };
        }
    }

    public fetchSegments(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_SEGMENTS).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No segments found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch segments");
                });
        });
    }

    public fetchAccountNames(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_ACCOUNTNAMES).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No Account Name found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch Account Names");
                });
        });
    }

    public fetchAmcTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_AMCTYPE).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No AMC Type found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch AMC Type");
                });
        });
    }

    public fetchAmcStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_AMCSTATUS).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No AMC Status found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch AMC Status");
                });
        });
    }

    public fetchSlas(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_SLA).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No SLA found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch SLA");
                });
        });
    }

    public fetchMonthByAMCFrmDate(date:string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_MONTH_BY_AMC_FRM_DATE + date).then((resp: AxiosResponse) => {
                console.log(resp)
;                if (resp && resp.data && resp.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No SLA found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch SLA");
                });
        });
    }

    // http://192.168.1.11:9099/v1/customer/first-quarter?amcFromDate=2024-03-05

    public fetchAgreedResponse(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_AGREEDRESPONSE).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No Agreed Response found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch Agreed Response");
                });
        });
    }

    public fetchAgreedResolutions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_AGREEDRESOLUTION).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No Agreed Resolution found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch Agreed Resolution");
                });
        });
    }

    public fetchBillingCycles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_BILLINGCYCLE).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No Billing Cycle found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch Billing Cycle");
                });
        });
    }

    public fetchAmcSystems(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.apiget(ServerUrl.API_GET_AMCSYSTEM).then((resp: AxiosResponse) => {
                if (resp && resp.data && resp.data.status == 200) {
                    resolve(resp.data);
                } else {
                    reject("No AMC System found");
                }
            })
                .catch((error) => {
                    reject("Failed to fetch AMC System");
                });
        });
    }
}

export default AuthenticatedService;

