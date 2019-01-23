import React, {Fragment} from 'react';

const TextInput = ({name, onChange, placeholder, value, error}) => {

  return (
        <Fragment>
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
          {error && <div className="alert alert-danger">{error}</div>}
        </Fragment>
  );
};


export default TextInput;
