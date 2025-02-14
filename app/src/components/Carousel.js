import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles.css"; 
import IndiaImage from '../image/2024.png';
import IndiaImagee from '../image/2013.png';
import IndiaImageee from '../image/2011.png';
import IndiaImageeee from '../image/2007.png';
import IndiaImageeeee from '../image/1983.png';





function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Change to show multiple images if needed
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div><img src={IndiaImage} alt="Slide 1" /></div>
        <div><img src={IndiaImagee} alt="Slide 2" /></div>
        <div><img src={IndiaImageee} alt="Slide 3" /></div>
        <div><img src={IndiaImageeee} alt="Slide 4" /></div>
        <div><img src={IndiaImageeeee} alt="Slide 5" /></div>
      </Slider>
    </div>
  );
}

export default Carousel;
