import { read } from "./context.service";

let wishlisturl="http://localhost:4002/getallpost" 
export function getallposts(){
    return(
        read(wishlisturl)
    )
}