
import { Image } from 'react-bootstrap';
import post1 from '../../assets/images/post1.png';
import post2 from '../../assets/images/post2.png';
import storie3 from '../../assets/images/storie3.png';
import storie4 from '../../assets/images/storie4.png';
import storie5 from '../../assets/images/storie5.png';
import post7 from '../../assets/images/post7.png';
import plus2 from '../../assets/images/plus1.png';
import defaultimg from '../../assets/images/defaultimg.jpg';
import nopost from '../../assets/images/noposts.png';
import stories from '../../assets/images/storie1.png';
import { Grid3x3, Plus, PlusLg, PlusSquare, Trash3 } from 'react-bootstrap-icons';
import "../userProfile/userprofile.component.css"
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../navbar/navbar.component';
export function UserProfile() {
    const [profile, setprofile] = useState([]);
    const [prophoto, setprophoto] = useState([]);
    const [stories, setstories] = useState([]);

    const [imgpost, setimgpost] = useState([]);
    const [usersData, setUsersData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("userdata");
        if (data) {
            setUsersData(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        if (usersData && usersData.length > 0) {
            const cid = usersData[0].id;
            axios.get(`http://localhost:4002/getprofile/${cid}`)
                .then((res) => {
                    setprofile(res.data[0]);
                    setimgpost(res.data)

                })
                .catch((error) => {
                    console.error('Error fetching cart data:', error);

                });
        }
    }, [usersData]);

    useEffect(() => {
        if (usersData && usersData.length > 0) {
            const cid = usersData[0].id;
            axios.get(`http://localhost:4002/getprophoto/${cid}`)
                .then((res) => {
                    setprophoto(res.data[0]);
                    console.log(res.data[0]);
                })
                .catch((error) => {
                    console.error('Error fetching cart data:', error);

                });
        }
    }, [usersData]);

    useEffect(() => {
        if (usersData && usersData.length > 0) {
            const cid = usersData[0].id;
            axios.get(`http://localhost:4002/getstories/${cid}`)
                .then((res) => {
                    setstories(res.data);
                })
                .catch((error) => {
                    console.error('Error fetching cart data:', error);

                });
        }
    }, [usersData]);
    const deleteprofile = (id) => {
        axios.delete(`http://localhost:4002/profile/del/${id}`).then((res) => {
            window.location.reload();
        });
    }



    return (
        <>
            <NavBar></NavBar>
            <div>
                <div>
                    <div className='user-pro-head'>
                        <div className='user-profile'>

                            <Image src={prophoto ? prophoto.profileimg : defaultimg} onClick={() => { navigate("/addprofile") }} roundedCircle />
                            {prophoto && prophoto.profileimg && (
                                <span className='dele'>
                                    <Trash3 onClick={() => deleteprofile(prophoto.id)} />
                                        
                                </span>
                               
                            )}
                        </div>


                        <div>
                            <div className='user-main-proo'>
                                <p>{profile ? profile.username : usersData[0].username}</p>
                            </div>

                            <div className='user-main-pro'>

                                <div className='user-sub-pro'>
                                    <div><b>20</b></div>
                                    &nbsp;
                                    <div><label>posts</label></div>
                                </div>

                                <div className='user-sub-pro'>
                                    <div><b>20</b></div>
                                    &nbsp;
                                    <div><label>Following</label></div>
                                </div>

                                <div className='user-sub-pro'>
                                    <div><b>20</b></div>
                                    &nbsp;
                                    <div><label>Followers</label></div>
                                </div>

                            </div>
                        </div>


                    </div>
                    <div className='user-content' >
                        <label htmlFor="">{profile ? profile.username : usersData[0].username}</label>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati, exercitationem?</p>
                    </div>
                    <div className='user-storie-div'>

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

                        <div className='user-stories' onClick={() => { navigate("/addstories") }}>

                            <PlusLg className='m-3'></PlusLg>
                        </div>
                    </div>

                </div>


                <div className='user-posts'>
                    <div className='user-postes-head' ><span className='user-postes-grid' ><Grid3x3></Grid3x3> &nbsp; posts &nbsp; <PlusSquare style={{ cursor: "pointer" }} onClick={() => { navigate("/addingpost") }}></PlusSquare></span> </div>
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

            </div>

        </>
    );
}