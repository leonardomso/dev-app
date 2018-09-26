const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post and Profile Model.
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// Validation.
const validatePostInput = require("../../validation/post");

const router = express.Router();

// Route: GET api/posts/test
// Description: Tests post route
// Access: Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// Route: GET api/posts
// Description: Get posts
// Access: Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ noPostFound: "No post found with that ID." })
    );
});

// Route: GET api/post/:id
// Description: Get post by ID
// Access: Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostFound: "No post found with that ID." })
    );
});

// Route: POST api/posts
// Description: Create post
// Access: Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    const { name, text, avatar } = req.body;

    // Check validation.
    if (!isValid) {
      // If any errors, send 400 with errors object.
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      name,
      text,
      avatar
    });

    newPost.save().then(post => res.json(post));
  }
);

// Route: DELETE api/posts/:id
// Description: Delete post
// Access: Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner.
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notAuthorized: "User not authorized to delete this post."
            });
          }

          // Delete post.
          Post.deleteOne().then(() => res.json({ message: "Post deleted." }));
        })
        .catch(err =>
          res.status(404).json({ postNotFound: "Post not found." })
        );
    });
  }
);

// Route: POST api/posts/like/:id
// Description: Like post
// Access: Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User already liked this post." });
          }

          // Add user ID to likes array.
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ postNotFound: "Post not found." })
        );
    });
  }
);

// Route: POST api/posts/unlike/:id
// Description: Unlike post
// Access: Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "You have not yet liked this post." });
          }

          // Get the remove index.
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice the like out the array.
          post.likes.splice(removeIndex, 1);

          // Save.
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ postNotFound: "Post not found." })
        );
    });
  }
);

// Route: POST api/posts/comment/:id
// Description: Add comment to post
// Access: Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const { errors, isValid } = validatePostInput(req.body);
        const { name, text, avatar } = req.body;

        // Check validation.
        if (!isValid) {
          // If any errors, send 400 with errors object.
          return res.status(400).json(errors);
        }

        const newComment = {
          user: req.user.id,
          text,
          name,
          avatar
        };

        // Add to comments array.
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: "Post not found." }));
  }
);

// Route: DELETE api/posts/comment/:id/:comment_id
// Description: Add comment to post
// Access: Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if the comment exists.
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentNotExists: "Comment does not exists" });
        }

        // Get remove index.
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice it out the array.
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: "Post not found." }));
  }
);

module.exports = router;
