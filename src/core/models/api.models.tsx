import { AxiosResponse } from "axios";

interface ApiServiceClassImpl {
  apiget(url:string):Promise<AxiosResponse>;
  apipost(url:string,body:any):Promise<AxiosResponse>;
  apiput(url:string,body:any):Promise<AxiosResponse>;
  apidelete(url:string,body:any):Promise<AxiosResponse>;
}

export interface ApiPageResponse {
    message: string,
    status: number,

}

export default ApiServiceClassImpl;

