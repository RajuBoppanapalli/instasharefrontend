import { Route, Routes } from "react-router-dom";
import { UserProfile } from "./components/userProfile/userprofile.component";
import { NavBar } from "./components/navbar/navbar.component";
import { UserLogin } from "./components/login/login.component";
import { ShareFields } from "./components/fields/fields.component";
import { Stories } from "./components/stories/stories.component";
import { ForgotPassword } from "./components/login/forgotpassword.component";
import { Register } from "./components/register/register.component";
import { AddPost } from "./components/addpost/addpost.component";
import { CustomerProfile } from "./components/customerprofile/customerprofile.component";
import Show from "./components/showcomponents/show.component";
import AddProfile from "./components/addpost/addprofile.component";
import { PageNotFound } from "./components/pagenotfount/pagenotfound.component";
import { AddUsrStories } from "./components/addpost/addstories.component";



export function AppRouter(){
    return(
        <>
      <Routes>
        
        <Route path="/userprofile" element={<UserProfile></UserProfile>}></Route>
        <Route path="/navbar" element={<NavBar></NavBar>}></Route>
        <Route path="/" element={<UserLogin></UserLogin>}></Route>
        <Route path="/sharefields" element={<ShareFields></ShareFields>}></Route>
        <Route path="/stories" element={<Stories></Stories>}></Route>
        <Route path="/addingpost" element={<AddPost></AddPost>}></Route>
        <Route path="/addprofile" element={<AddProfile></AddProfile>}></Route>
        <Route path="/customerpro/:id" element={<CustomerProfile></CustomerProfile>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        <Route path="/show" element={<Show></Show>}></Route>
        <Route path="/addstories" element={<AddUsrStories></AddUsrStories>}></Route>
       
       

      </Routes>
        </>
    );
}