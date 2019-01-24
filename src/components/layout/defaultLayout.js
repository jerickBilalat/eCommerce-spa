import React, {Fragment} from 'react';
import "../../css/style.css"
import "../../css/colors/blue.css"

import Header from "../common/header";

const DefaultLayout = (props) => {
  return (
    <Fragment>
      <div className="container">
        <Header />
        {props.children}
      </div>
    </Fragment>
  );
};

export default DefaultLayout;