const router = require("express").Router();
const { User, Blog_Post, Comment } = require("../../models");

// HTTP GET request ALL blog posts JOIN user information
router.get("/", (req, res) => {
  // notice that when we return all the blog posts, we return
  // the username who made the blog post, but also the username of
  // whoever left a comment (that's the purpose of nested include)
  Blog_Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      // First LEFT OUTER JOIN blog post with user
      {
        model: User,
        attributes: ["username"],
      },
      // Second LEFT OUTER JOIN blog post with comment
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_At"],
        include: [
          // Third LEFT OUTER JOIN comment with user
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbBlogPostData) => res.json(dbBlogPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// HTTP GET request SINGLE blog post JOIN user information
router.get("/:id", (req, res) => {
  Blog_Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_At"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbBlogPostData) => {
      if (!dbBlogPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbBlogPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// HTTP POST request SINGLE blog post
router.post("/", (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Blog_Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.user_id,
  })
    .then((dbBlogPostData) => res.json(dbBlogPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// HTTP PUT request SINGLE blog post update title
router.put("/:id", (req, res) => {
  Blog_Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBlogPostData) => {
      if (!dbBlogPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbBlogPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// HTTP DELETE request SINGLE blog post
router.delete("/:id", (req, res) => {
  Blog_Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbBlogPostData) => {
      if (!dbBlogPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbBlogPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
