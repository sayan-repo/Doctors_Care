import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <div className="container biography">
        <div className="banner">
            <img src={imageUrl} alt="about" />
        </div>
        <div className="banner">
            <p>Biography</p>
            <h3>About Us</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id natus provident earum placeat. Veritatis esse inventore quis libero repudiandae placeat. Dignissimos dolore quia non consequuntur enim at, quas alias culpa?</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt illum voluptates omnis nihil voluptatibus dolorum. Molestiae quam ipsum officiis aliquam, dicta vitae? Voluptatem culpa explicabo doloribus exercitationem blanditiis illo nostrum, et non impedit, dicta laboriosam.</p>
        </div>
    </div>
  );
};

export default Biography;