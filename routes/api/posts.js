const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route   Post api/posts
// @desc    Creating a Post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/posts
// @desc    Get All Posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get Post by Id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts) {
      return res.status(404).json({ msg: "Post Not Found" });
    }

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   Delete api/posts/:id
// @desc    Delete a Post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }

    //checking if user is the owner of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not Authorised" });
    }

    await post.remove();

    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a Post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //checking if user already liked the post
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    await post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a Post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //checking if user already liked the post
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post not been liked yet" });
    }

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Post api/posts/comment/:id
// @desc    Posting a Comment
// @access  Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      await post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   Delete api/posts/comment/:post_id/:comment_id
// @desc    Delete a Comment from the Post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // finding the post
    const post = await Post.findById(req.params.id);

    //pulling comment from post
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // checking if comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment Not Found" });
    }

    //checking if user is the owner of the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not Authorised" });
    }

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
