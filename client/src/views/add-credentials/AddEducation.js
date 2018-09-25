import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import TextField from "../../utils/components/TextField";
import TextArea from "../../utils/components/TextArea";

import { addEducation } from "../../actions/profile";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onCheck = e =>
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });

  render() {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      errors,
      disabled
    } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back to Dashboard
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp etc that you've attended.
              </p>
              <small className="d-block pb-3">* required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="School"
                  name="school"
                  value={school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextField
                  placeholder="Degree"
                  name="degree"
                  value={degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextField
                  placeholder="Field of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From</h6>
                <TextField
                  placeholder="from"
                  type="date"
                  name="from"
                  value={from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To</h6>
                <TextField
                  placeholder="to"
                  type="date"
                  name="to"
                  value={to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={disabled ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current
                  </label>
                </div>

                <TextField
                  placeholder="Program Description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                />

                <button
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addEducation }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
