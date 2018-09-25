import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextField = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled
}) => (
  <div className="form-group">
    <input
      type={type}
      className={classnames("form-control form-control-lg", {
        "is-invalid": error
      })}
      placeholder={placeholder}
      name={name}
      required
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextField.defaultProps = {
  type: "text"
};

export default TextField;
