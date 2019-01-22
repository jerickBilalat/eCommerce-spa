import React from "react";
import classnames from "classnames/dedupe";

const flashMessage = props => {
  let flashMessageClass = classnames("notification", `${props.status}`);
  return (
    <div className={flashMessageClass}>
      <p>{props.title}</p>
      {props.texts.length && (
        <ul>
          {props.texts.map(text => (
            <li key={text}>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default flashMessage;
