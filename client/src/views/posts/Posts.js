import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../../utils/components/Spinner/Spinner";

import { getPosts } from "../../actions/post";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPosts }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
