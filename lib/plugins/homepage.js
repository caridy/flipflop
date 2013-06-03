var path = require('path'),
	handler = require('./handler.js');

function getTemplateData(blog) {
	var articles = blog.api.getRecent(10);
	return {
		article: articles[0],
		articles : articles,
		recent_articles : blog.api.getRecent(),
		pageTitle : blog.title,
		blogTitle : blog.title,
		blogDescription : blog.description,
		keywords : blog.keywords
	};
}

module.exports = {

	register : function(blog) {
		blog.app.get('/blog', function(req, res) {
			blog.info('serving homepage');
			res.render('homepage', getTemplateData(blog));
		});
	},

	generate : function(blog, dir) {
		handler.render('homepage', getTemplateData(blog), function (err, content) {
			handler.createHtmlFile(path.join(dir, 'index.html'), content);
		});
	}

};
