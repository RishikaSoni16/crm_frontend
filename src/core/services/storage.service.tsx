class StorageService {

    public static setData(key:string,data:any) {
        localStorage.setItem(key,JSON.stringify(data));
    }

    public static getData(key:string) {
        // return JSON.parse(localStorage.getItem(key) || '{}');
        const dt = localStorage.getItem(key);
        if(dt){
            return JSON.parse(dt);
        }else{
            return null;
        }
    }
}
export default StorageService;

