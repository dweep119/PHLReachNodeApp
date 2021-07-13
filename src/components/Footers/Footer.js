import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="d-flex justify-content-between container-fluid">
        <div className="d-flex">
          <i className="fa fa-chevron-up footerIcon" aria-hidden="true"></i>
          <p className="roboto-normal-white-24px">Service in your cart</p>
          <p className="roboto-normal-white-18px-2 footerBadge">2</p>
        </div>
        <div>
          <i className="fa fa-briefcase footerIcon" aria-hidden="true"></i>
          <i className="fa fa-location-arrow footerIcon" aria-hidden="true"></i>
          <i className="fa fa-user-o footerIcon" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;