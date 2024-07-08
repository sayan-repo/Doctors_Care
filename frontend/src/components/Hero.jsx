import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
        <div className="banner">
            <h1>{title}</h1>
            <p>meow meow meow</p>
        </div>
        <div className="banner">
            <img src={imageUrl} alt="hero" className="animated-image"/>
            <span>
                <img src="" alt="vector"/>
            </span>
        </div>
    </div>
  );
};

export default Hero;