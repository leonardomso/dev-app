import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import { deletePost, addLike, removeLike } from "../../actions/post";
import { bindActionCreators } from "../../../../../../../../../AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux";

class PostItem extends Component {
  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  onLikeClick = id => {
    this.props.addLike(id);
  };

  onRemoveClick = id => {
    this.props.removeLike(id);
  };

  findUserLike = likes => {
    const { auth } = this.props;

    const userLike = likes.filter(like => like.user === auth.user.id);

    if (userLike.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onRemoveClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  delete: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deletePost, addLike, removeLike }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
