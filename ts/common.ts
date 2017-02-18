

module Driving{
    export class Common{
        /**
         * debounce function is originally from https://gist.github.com/nmsdvid/8807205
         * its purpose is to improve broser performance for resize and scroll events
         */
        public static debounce(func: any, wait: number, immediate: boolean) {
            var timeout : number;
            return function() {
                var context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                }, wait);
                if (immediate && !timeout) func.apply(context, args);
            };
        }
        
        public static utilSetCookie(c_name: string, value: string, exdays?: number){
            var exdate = new Date();
            exdate.setDate(exdate.getDate()+ exdays);
            var c_value = encodeURI(value)+ ((exdays === null)? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        }

        public static utilGetCookie(c_name: string){
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++){
              x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
              y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+ 1);
              x = x.replace(/^\s+|\s+$/g, "");
              if (x == c_name){
                return decodeURI(y);
              }
            }
            return null;
        }

        public static utilDeleteCookie(c_name: string){
            document.cookie = encodeURIComponent(c_name)+ "=deleted; expires=" + new Date(0).toUTCString();
        }
        
        public static utilGetCurrentYear(){
            var d = new Date();
            return d.getFullYear();
        }
        
        public static utilGetJSONLen(c: JSON){
            var len = 0;
            for(var key in c){
                len++;
            }
            return len;
        }
        
        
        
        
        
        
        
    }
    

        

}  
