import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileGitHub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: "879ebc8858dc9397647b",
      clientSecret: "c7e7e83bde328b4e97622cec172ee5d42c45f9ba",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}
      &sort=${sort}&client_id=${clientId}%client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const reposItems = repos.map(repo => {
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>;
    });

    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest GitHub Repos</h3>
        {reposItems}
      </div>
    );
  }
}

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGitHub;
