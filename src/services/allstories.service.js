import { read } from "./context.service"

let storiesurl="http://localhost:4002/getallstories" 
export function getallstories(){
    return(
        read(storiesurl)
    )
}