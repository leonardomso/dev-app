import React from "react";
import PropTypes from "prop-types";

import PostItem from "./PostItem";

const PostFeed = ({ posts }) => {
  return posts.map(post => <PostItem key={post._id} post={post} />);
};

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
