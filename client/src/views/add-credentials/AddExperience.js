import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import TextField from "../../utils/components/TextField";
import TextArea from "../../utils/components/TextArea";

import { addExperience } from "../../actions/profile";

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: "",
      title: "",
      location: "",
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

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
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
      company,
      title,
      location,
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
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you've ahd in the past or current.
              </p>
              <small className="d-block pb-3">* required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextField
                  placeholder="Job Title"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextField
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
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
                    Current Job
                  </label>
                </div>

                <TextField
                  placeholder="Job Description"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addExperience }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
