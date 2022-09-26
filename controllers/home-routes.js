const router = require("express").Router();
const sequelize = require("../config/connection");
const { Blog_Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Blog_Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
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
      // console.log("dbBlogPostData is", dbBlogPostData[0].get({ plain: true }));
      // map through blog post data and serialize each blog post object
      // the map will return an array which we capture in blogPosts
      const blogPosts = dbBlogPostData.map((blog) => blog.get({ plain: true }));
      // evn though blogPosts is an array, pass it in as an object
      // property to retain the ability to add/modify object properties
      res.render("homepage", { blogPosts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
