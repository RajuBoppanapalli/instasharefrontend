
import { Chat, Heart, HeartFill, Share, StarFill } from 'react-bootstrap-icons';
import dog from '../../assets/images/dog.png';
import fields1 from '../../assets/images/fields1.png';
import fields2 from '../../assets/images/fields2.png';
import fields3 from '../../assets/images/fields3.png';
import fields4 from '../../assets/images/fields4.png';
import defaultimg from '../../assets/images/defaultimg.jpg';
import "../fields/fields.component.css"
import { Stories } from '../stories/stories.component';
import { useContext, useEffect, useState } from 'react';
import { getallposts } from '../../services/allpost.service';
import { NavBar } from '../navbar/navbar.component';
import { SearchContext } from '../../services/searchcontext';
import { useNavigate } from 'react-router-dom';
export function ShareFields() {
    const { searchTerm } = useContext(SearchContext);
    const [liked, setLiked] = useState([]);
    const [likeCount, setLikeCount] = useState([]);
    const [allpostdata, setallpostdata] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        getallposts().then((res) => {
            setallpostdata(res.data);
            setLiked(new Array(res.data.length).fill(false));
            setLikeCount(res.data.map(post => post.likes || 0));

        });
    }, []);


    const handleLikeClick = (index) => {
        const newLiked = [...liked];
        const newLikeCount = [...likeCount];

        newLiked[index] = !newLiked[index];
        newLikeCount[index] = newLiked[index] ? newLikeCount[index] + 1 : newLikeCount[index] - 1;

        setLiked(newLiked);
        setLikeCount(newLikeCount);
    };

    const filteredData = allpostdata.filter((item) =>
        item.caption == searchTerm
    );

    return (
        <>
            <NavBar></NavBar>
            <Stories></Stories>
            <div>
                {
                    !searchTerm.trim() == " " ? (

                        filteredData && filteredData.map((iteam, index) =>
                            <div>

                                <div className='share-fiels' onClick={() => navigate(`/customerpro/${iteam.id}`)}>
                                    <div className='share-fiels-profile'>
                                        <img src={iteam.profileimg} alt="" />
                                    </div>
                                    <div className='share-fiels-name'> <p>{iteam.username}</p></div>
                                </div>
                                <div className='share-fields-post'>
                                    <div className='share-fields-pic'>
                                        <img src={iteam.image} alt="" />
                                    </div>
                                    <div>
                                        <div className="icon-container" onClick={() => handleLikeClick(index)}>
                                            {liked[index] ? (
                                                <HeartFill className="me-4 heart-icon liked" />
                                            ) : (
                                                <Heart className="me-4 heart-icon" />
                                            )}
                                        </div>
                                        <Chat className='me-3'></Chat>
                                        <Share className='me-3'></Share>
                                    </div>
                                    <div>
                                        <span>{likeCount[index]} Likes</span>
                                        <br />
                                        <span>{iteam.caption}</span>
                                        <br />
                                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, quibusdam. </span>
                                        <br />
                                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, quibusdam. </span>
                                        <br />
                                        <span>1hour ago</span>

                                    </div>
                                </div>



                            </div>
                        )
                    ) : (

                        allpostdata && allpostdata.map((iteam, index) =>
                            <div>

                                <div className='share-fiels' onClick={() => navigate(`/customerpro/${iteam.id}`)} >
                                    <div className='share-fiels-profile'>
                                        <img src={iteam.profileimg} alt="" />
                                    </div>
                                    <div className='share-fiels-name'> <p>{iteam.username}</p></div>
                                </div>
                                <div className='share-fields-post'>
                                    <div className='share-fields-pic'>
                                        <img src={iteam.image} alt="" />
                                    </div>
                                    <div>
                                        <div className="icon-container" onClick={() => handleLikeClick(index)}>
                                            {liked[index] ? (
                                                <HeartFill className="me-4 heart-icon liked" />
                                            ) : (
                                                <Heart className="me-4 heart-icon" />
                                            )}
                                        </div>
                                        <Chat className='me-3'></Chat>
                                        <Share className='me-3'></Share>
                                    </div>
                                    <div>
                                        <span>{likeCount[index]} Likes</span>
                                        <br />
                                        <span>{iteam.caption}</span>
                                        <br />
                                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, quibusdam. </span>
                                        <br />
                                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, quibusdam. </span>
                                        <br />
                                        <span>1hour ago</span>

                                    </div>
                                </div>



                            </div>
                        )
                    )
                }

            </div >
        </>
    );

}