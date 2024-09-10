import axios, { AxiosResponse }  from 'axios';
import ApiServiceClassImpl from '../models/api.models';
import StorageService from './storage.service';
import { APPLICATION_CONSTANTS } from '../constants/app.constant';
import ApiInterceptor from './interceptor.service';
// import { ApiServiceClassImpl } from '../models/api.models';

class ApiService implements ApiServiceClassImpl {
 
    apiget(url:string):Promise<AxiosResponse> { 
        return ApiInterceptor.init().get(`${url}`)
    }

    apipost(url:string,body:any):Promise<AxiosResponse> {
        return ApiInterceptor.init().post(`${url}`, body)
    }

    apiput(url:string,body:any):Promise<AxiosResponse> {
        return ApiInterceptor.init().put(`${url}`, body)
    }
    
    apidelete(url:string):Promise<AxiosResponse> {
        return ApiInterceptor.init().delete(`${url}`)
    }
}

export default ApiService;