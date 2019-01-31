import React from "react";
import {Link} from "react-router-dom";

const TitleBar = props => {
  return (
    <div id="titlebar">
      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <h2>{props.title}</h2>
            
            <nav id="breadcrumbs">
              <ul>
                <li><a href="http://minnesotarec.surge.sh/index.html">Home</a></li>
                <li>{props.title}</li>
              </ul>
            </nav>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
