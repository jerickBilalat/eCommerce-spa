import React, {Fragment} from 'react';
import "../../css/style.css"
import "../../css/colors/blue.css"

import Nav from "../common/navigation";

const DefaultLayout = (props) => {
  return (
    <Fragment>
      <Nav />
      <div className="container">
          {props.children}
      </div>
    </Fragment>
  );
};

export default DefaultLayout;