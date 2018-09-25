import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextArea = ({ name, placeholder, value, error, info, onChange }) => (
  <div className="form-group">
    <textarea
      className={classnames("form-control form-control-lg", {
        "is-invalid": error
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired
};

export default TextArea;
