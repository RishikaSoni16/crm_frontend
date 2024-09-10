import axios, { AxiosInstance,AxiosRequestConfig,AxiosRequestHeaders,AxiosResponse }  from 'axios';
import { APPLICATION_CONSTANTS } from '../constants/app.constant';
import StorageService from './storage.service';

class ApiInterceptor {
    public static axiosReference = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`
    });

    static init():AxiosInstance {
        ApiInterceptor.axiosReference.interceptors.request.use((configuration:AxiosRequestConfig)=>{
            configuration.headers = {...configuration.headers, ...this.generateHeader()}
            // console.log('requesting => ', configuration.url);
            return configuration;
        });

        ApiInterceptor.axiosReference.interceptors.response.use((configuration:AxiosResponse<any, any>)=>{
            // console.log('Response => ', configuration);
            return configuration;
        });

        return ApiInterceptor.axiosReference;
    }


    static generateHeader():AxiosRequestHeaders {
        const availableToken = StorageService.getData(APPLICATION_CONSTANTS.STOARAGE.TOKEN);
        if(availableToken) {
            return {
                'Authorization': 'Bearer ' + availableToken.token
            }
        } else {
            return {}
        }
    }
}


export default ApiInterceptor;