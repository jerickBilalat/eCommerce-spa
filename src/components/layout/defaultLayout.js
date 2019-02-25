import React, {Fragment} from 'react';
import "../../css/style.css"
import "../../css/colors/blue.css"

// import Header from "../common/header";
import Header from "../common/header";
import Footer from "../common/footer";

const DefaultLayout = (props) => {
  return (
    <Fragment>
      <div className="container">
        <Header />
        {props.children}
      </div>
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;