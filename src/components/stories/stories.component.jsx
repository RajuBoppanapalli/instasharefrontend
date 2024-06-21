import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../stories/stories.component.css';
import { getallstories } from '../../services/allstories.service';
import { useNavigate } from 'react-router-dom';
export function Stories() {
  const [allstories, setallstories] = useState([]);

  const navigate = useNavigate();
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", backgroundColor: "black", borderRadius: "100%" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    afterChange: function (index) {
      console.log(`Slider changed to: ${index + 1}`);
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  useEffect(() => {
    getallstories().then((res) => {
      setallstories(res.data);

    });
  }, []);
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {
            allstories && allstories.map((iteam) =>
              <div className="slickk" onClick={() => navigate(`/customerpro/${iteam.id}`)}>
                <div className="slick-img">
                  <img src={iteam.urstories} alt="mango1" />
                  <p>{iteam.username}</p>

                </div>
              </div>
            )
          }

        </Slider>
      </div>
    </>
  );
}
