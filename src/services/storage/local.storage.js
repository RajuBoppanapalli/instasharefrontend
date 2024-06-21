
export function setLocalStorageItem(key,value){
    if(typeof(value)=="object"){
       value=JSON.stringify(value)
    }
    localStorage.setItem(key,value)

}
export function getLocalStorageItem(key){
    return localStorage.getItem(key);
    
}
export function removeLocalStorageItem(key){
    localStorage.removeItem(key)
}
