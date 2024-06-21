

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/navbar/navbar.component';
import { AppRouter } from './Approuter';
import { SearchProvider } from './services/searchcontext';
import { UserLogin } from './components/login/login.component';
import { ForgotPassword } from './components/login/forgotpassword.component';
import { Register } from './components/register/register.component';
import { PageNotFound } from './components/pagenotfount/pagenotfound.component';







function App() {

  return (
   <>
{
  !sessionStorage.getItem("loggin") && (
<BrowserRouter>
<Routes>
  <Route path='/'element={<UserLogin></UserLogin>}></Route>
  <Route path='/forgotpass' element={<ForgotPassword></ForgotPassword>}></Route>
  <Route path='/register' element={<Register></Register>}></Route>
  <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
</Routes>
</BrowserRouter>

  )
}
{
  sessionStorage.getItem("loggin") && (

    <SearchProvider>
    <BrowserRouter>
    <AppRouter></AppRouter>
    </BrowserRouter>
    </SearchProvider>
  )
}

 
   </>
  );
}

export default App;
