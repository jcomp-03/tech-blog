// import all models
const Blog_Post = require('./Blog_Post');
const User = require('./User');
const Comment = require('./Comment');

// create associations
User.hasMany(Blog_Post, {
  foreignKey: 'user_id'
});

Blog_Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Blog_Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Blog_Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Blog_Post, Comment };
