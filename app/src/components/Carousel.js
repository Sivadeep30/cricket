import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles.css"; 
import IndiaImage from '../image/2024.png';



function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Change to show multiple images if needed
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div><img src={IndiaImage} alt="Slide 1" /></div>
        <div><img src="/images/image2.jpg" alt="Slide 2" /></div>
        <div><img src="/images/image3.jpg" alt="Slide 3" /></div>
        <div><img src="/images/image4.jpg" alt="Slide 4" /></div>
        <div><img src="/images/image5.jpg" alt="Slide 5" /></div>
      </Slider>
    </div>
  );
}

export default Carousel;
