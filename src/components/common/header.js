import React, {Fragment} from 'react';
import Nav from "../common/navigation";

const header = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="header">

          <div className="col-md-3 col-sm-12">
            <div id="logo">
              <h3>JRK-Shop</h3>
            </div>
          </div>

          <div className="col-md-9 col-sm-12">
            <ul className="header-widget">
              <li>
                <i className="sl sl-icon-call-in"></i>
                <div className="widget-content">
                  <span className="title">Questions?</span>
                  <span className="data">(123) 123-456 </span>
                </div>
              </li>

              <li>
                <i className="sl sl-icon-location"></i>
                <div className="widget-content">
                  <span className="title">Our Office</span>
                  <span className="data">123 Numbers Avenue, MN</span>
                </div>
              </li>

              <li className="with-btn"><a href="contact.html" className="button border medium">Request Service</a></li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <div className="row">
        <Nav />
      </div>
    </Fragment>
  );
};

export default header;