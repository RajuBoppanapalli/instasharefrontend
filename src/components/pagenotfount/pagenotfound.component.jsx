import { Button } from "react-bootstrap";
import error1 from "../../assets/images/erroring 1.png"
import { useNavigate } from "react-router-dom";
import "../pagenotfount/pagenotfound.component.css"
export function PageNotFound() {
    const navigate = useNavigate();
    return (
        <>
            <div className=" errorpage">
                <img src={error1} alt="" />
                <h4>Page Not Found</h4>
                <p> We are sorry,the Page you requested could not be found.please go back to Home page</p>
                <Button className="me-5" onClick={() => { navigate("/sharefields") }}>Home Page</Button>
            </div>
        </>
    );
}