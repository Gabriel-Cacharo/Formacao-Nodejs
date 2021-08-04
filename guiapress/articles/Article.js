const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Category.hasMany(Article) // Uma Categoria possui vários Artigos ( 1 para Muitos )
Article.belongsTo(Category) // Um Artigo pertence a uma Categoria ( 1 para 1 )

module.exports = Article