export default class LocalStorageService {
    static setItem = (key:string, data:any): any => {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static getItem = (key:string): any => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsedData = JSON.parse(data);
          return parsedData;
        }
        return null;
    }
}