import axios from "axios";

//function for get api
export function read(url){
    return axios.get(url)
};

//function for save api
export function create(url,data){
    return axios.post(url,data)
};

//function for update api
export function update(url,data){
    return axios.put(url,data)
};

//function for delete
export function deleteitem(url){
    return axios.delete(url)
}
