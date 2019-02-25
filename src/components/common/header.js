import React, {Fragment} from 'react';
import Nav from "./navigation";

const header = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="header">

          <div className="col-md-3 col-sm-12">
            <div id="logo">
              <h1>JRK POOLS</h1>
            </div>
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