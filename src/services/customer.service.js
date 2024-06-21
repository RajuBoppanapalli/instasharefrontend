import { read } from "./context.service"

let userurl="http://localhost:4002/customers"
export function getcustomers(){
    return(
  read(userurl)  
    )
}
let user="http://localhost:4002/getphoto"
export function getcustomerphoto(){
    return(
  read(user)  
    )
}

