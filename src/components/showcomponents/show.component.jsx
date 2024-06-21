import React, { useContext, useEffect, useState } from 'react';
import post7 from '../../assets/images/post7.png';
import searchnot from '../../assets/images/searchresult.png';
import defaultimg from '../../assets/images/defaultimg.jpg';
import { Image } from 'react-bootstrap';
import { getcustomerphoto, getcustomers } from '../../services/customer.service';
import { SearchContext } from '../../services/searchcontext';
import { useNavigate } from 'react-router-dom';
import"../showcomponents/show.component.css"
import { NavBar } from '../navbar/navbar.component';

export default function Show() {
  const { searchTerm } = useContext(SearchContext);
  const [allpostdata, setallpostdata] = useState([]);
  const [profile, setprofile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getcustomers().then((res) => {
      setallpostdata(res.data);
 
      
    });
    getcustomerphoto().then((res) => {
      setprofile(res.data);
    });
  }, []);

  const filteredData = allpostdata.filter((item) => 
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getProfileImage = (userId) => {
    const userProfile = profile.find((prof) => prof.id === userId);
    return userProfile ? userProfile.profileimg : defaultimg;
  };

  return (
    <>
    <NavBar></NavBar>

    <div>
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div className='user-pro-head' key={item.username} onClick={() => navigate(`/customerpro/${item.id}`)}>
            <div className='user-profile'>
              <Image src={getProfileImage(item.id)} roundedCircle />
            </div>
            <div>
              <div className='user-main-proo'>
                <p>{item.username}</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati, exercitationem?</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='notfound'>
          <img src={searchnot} alt="" />

          <h4>Search Not Found</h4>
          <p>Try different keyword or search again</p>
        </div>
        
      )}
    </div>
    </>
  );
}
