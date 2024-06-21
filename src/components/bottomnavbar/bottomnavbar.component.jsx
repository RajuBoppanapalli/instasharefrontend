
import { NavLink } from "react-bootstrap";
import { CardList, Cart3, Heart, House, Person } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import"../bottomnavbar/bottomnavbar.component.css"
import dog from '../../assets/images/dog.png';
export function BottomNavBar(){
    const navigate=useNavigate();
    return(
        <>
        <div className="navbar-footer">
      
      <div  className="navbar-footer-icons" ><span onClick={()=>{navigate("/sharefields")}}><House></House> Home</span></div>
      <div className="navbar-footer-icons" > <span onClick={()=>{navigate("/products")}}><CardList></CardList> Category</span></div>
      <div  className="navbar-footer-icons"><span onClick={()=>{navigate("/shopingcart")}}><Cart3></Cart3> cart</span></div>
      <div className="navbar-footer-icons" > <span onClick={()=>{navigate("/wishlist")}} ><Heart></Heart> Wishlist</span></div>
      <div  className="navbar-footer-icons"><img src={dog} alt="" onClick={()=>{navigate("/userprofile")}} /></div>
     


</div>
        </>
    );
}