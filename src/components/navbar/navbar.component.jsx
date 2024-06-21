import { BoxArrowDownRight, BoxArrowInRight, BoxArrowRight, Search } from 'react-bootstrap-icons';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import mainlogo from '../../assets/images/mainlogo.png';
import"../navbar/navbar.component.css"
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { SearchContext } from '../../services/searchcontext';
import { removeLocalStorageItem } from '../../services/storage/local.storage';

export function NavBar() {
  const { setSearchTerm } = useContext(SearchContext);
  const isMountedRef = React.useRef(false);
  const navigate1=useNavigate();
  const [usersData, setUsersData] = useState(null);
  const navigate=useNavigate();

  const getcustomername = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleLogout = () => {
    removeLocalStorageItem("userdata");
    sessionStorage.removeItem("loggin")
    setUsersData(null);
    navigate("/")
};

    return (
      <>
           {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar-head mb-3 ">
          <Container fluid>
            <Navbar.Brand className='brand-logo'>
            <Image src={mainlogo} rounded onClick={()=>{navigate("/sharefields")}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            >
              <Offcanvas.Header closeButton className='off-logo'>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <Image  src={mainlogo} rounded />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="navbar-cont ">
                
                <Form className="d-flex">
                  <Form.Control
                 style={{all: 'unset',border:"1px solid gray",padding:"7px"}}
                    type="search"
                    placeholder="Search"
                    onChange={getcustomername}
                  />
                  <Button variant="outline-success" onClick={()=>{navigate("/show")}}><Search ></Search></Button>
                </Form>
                <Nav >
                  <Nav.Link href="/sharefields">Home</Nav.Link>
                
                  <Nav.Link href="/userprofile">Profile</Nav.Link>
                  <Nav.Link className='logout-btn'><Button  onClick={handleLogout} >Logout <BoxArrowRight></BoxArrowRight> </Button></Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
       </>
    );
}