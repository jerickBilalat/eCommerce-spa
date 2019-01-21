import React, {PropTypes, Fragment} from 'react';

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

// TextInput.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
//   error: PropTypes.string
// };

export default TextInput;
