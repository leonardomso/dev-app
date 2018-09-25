import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../../utils/components/Spinner/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged user has a profile.
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h1>Your profile</h1>;
      } else {
        // User is logged in but has no profile.
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p className="lead text-muted">You've not yet setup a profile.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getCurrentProfile }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
