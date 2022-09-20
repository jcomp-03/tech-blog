const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const blogPostRoutes = require('./blog-post-routes');
const { route } = require('./user-routes.js');

router.use('/users', userRoutes);
router.use('/posts', blogPostRoutes);

module.exports = router;
