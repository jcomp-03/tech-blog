const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection_postgres');
// const sequelize = require('../config/connection_mysql');

// create our Blog Post model
class Blog_Post extends Model {}

// create fields/columns for Post model
Blog_Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    referred_article: {
      type: DataTypes.STRING(1000),
      validate: {
        isUrl: true
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog_posts'
  }
);

module.exports = Blog_Post;
