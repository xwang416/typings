/**
* Static members of Postmedia.Utils
*/
interface Postmedia {
    
    Utils: {
        SetCookie(name: string, value: string, expires: string, path: string, domain: string, secure: string): void;
        GetCookie(name: string): any;
    }
}