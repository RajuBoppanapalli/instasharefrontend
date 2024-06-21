import { Image, Spinner } from 'react-bootstrap';
import post7 from '../../assets/images/post7.png';
import profile from '../../assets/images/profiles.png';
import nopost from '../../assets/images/noposts.png';
import storie3 from '../../assets/images/storie3.png';
import storie4 from '../../assets/images/storie4.png';
import storie5 from '../../assets/images/storie5.png';
import stories from '../../assets/images/storie1.png';
import defaultimg from '../../assets/images/defaultimg.jpg';
import { Grid3x3 } from 'react-bootstrap-icons';
import "../customerprofile/customerpeofile.component.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../navbar/navbar.component';

export function CustomerProfile() {
    const { id } = useParams();
    const [customerposts, setcustomerposts] = useState(null);
    const [imgpost, setimgpost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stories, setstories] = useState([]);
    const [profilepic, setprofilepic] = useState([]);


    useEffect(() => {
        setLoading(true);
        fetchProfileDetails(id);
        fetchProfileDetailbyid(id);
        getcustmstories(id);
        getcustmprofile(id)
    }, [id]);

    const fetchProfileDetails = async (id) => {
        axios.get(`http://localhost:4002/getprofile/${id}`)
            .then(response => {
                const data = response.data;

                if (data) {
                    // setcustomerposts(data[0]);
                    setimgpost(data)
                    setLoading(false);
                } else {
                    console.error("No product data found for ID:", id);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    };
    const fetchProfileDetailbyid = async (id) => {
        axios.get(`http://localhost:4002/getprofiles/${id}`)
            .then(response => {
                const data = response.data;

                if (data) {
                    setcustomerposts(data);
                   
                } else {
                    console.error("No product data found for ID:", id);
              
                }
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            
            });
    };
    const getcustmstories = async (id) => {
        axios.get(`http://localhost:4002/getcustmstories/${id}`)
            .then(response => {
                const data = response.data;

                if (data) {
                    setstories(data);
                   
                } else {
                    console.error("No product data found for ID:", id);
              
                }
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            
            });
    };
    const getcustmprofile = async (id) => {
        axios.get(`http://localhost:4002/getcustmprofile/${id}`)
            .then(response => {
                const data = response.data;

                if (data) {
                    setprofilepic(data[0]);
                   
                } else {
                    console.error("No product data found for ID:", id);
              
                }
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            
            });
    };


    if (loading) {


        return
        <div className='lodingeffect'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

        </div>

    }

    if (!customerposts) {
        return <div>No product data available for this username</div>;
    }


    return (
        <>
        <NavBar></NavBar>
            <div>
                <div className='customer-pro-head'>
                    <div className='customer-profile'>
                        <Image src={profilepic?profilepic.profileimg:defaultimg} roundedCircle />
                    </div>
                    <div>
                        <div className='customer-main-proo'>
                            <p>{customerposts.username}</p>
                        </div>
                        <div className='customer-main-pro'>
                            <div className='customer-sub-pro'>
                                <div><b>20</b></div>
                                &nbsp;
                                <div><label>posts</label></div>
                            </div>
                            <div className='customer-sub-pro'>
                                <div><b>20</b></div>
                                &nbsp;
                                <div><label>Following</label></div>
                            </div>
                            <div className='customer-sub-pro'>
                                <div><b>20</b></div>
                                &nbsp;
                                <div><label>Followers</label></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='customer-content'>
                    <label htmlFor="">{customerposts.username}</label>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati, exercitationem?</p>
                </div>
                <div className='customer-storie-div'>
                {stories.length > 0 ? (
                            stories.map((item, index) => (
                                <div key={index} className='user-stories'>
                                    <img src={item.urstories} alt="" />
                                </div>
                            ))
                        ) : (
                            <div className='user-stories'>
                                <img src={defaultimg} alt="" />
                            </div>
                        )}
                </div>
            </div>
            <div className='customer-posts'>
                <div className='customer-postes-head'><span className='customer-postes-grid'><Grid3x3 /> &nbsp; posts</span></div>
                <div className="profile-post-div">
                    {
                        imgpost && imgpost.length > 0 ? (
                            imgpost.map((item, index) => {

                                return (
                                    <div className="profile-post" key={index}>
                                        <Image src={item.image} rounded />
                                    </div>
                                );
                            })
                        ) : (
                            <div className='noposts'><img src={nopost} alt="" /></div>
                        )
                    }
                </div>
            </div>
        </>
    );
}
