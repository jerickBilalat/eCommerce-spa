import React, {Fragment} from 'react';
import Nav from "../common/mnRecNavigation";
import {CLIENT_MAIN_DOMAIN_URL as baseURL} from "../../constants";

const header = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="header">

          <div className="col-md-3 col-sm-12">
            <div id="logo">
              <a href={`${baseURL}/index.html`} ><img src={`${baseURL}/images/mnreclogo.png`} alt=""/></a>
            </div>
          </div>

          <div className="hidden-xs">
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

              <li className="with-btn"><a href={`${baseURL}/contact.html`} className="button border medium">Request Service</a></li>
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