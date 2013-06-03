var path = require('path'),
	handler = require('./handler.js');

function getTemplateData(blog) {
	return {
		recent_articles : blog.api.getRecent(),
		articles : blog.api.getAll(),
		pageTitle : 'archive - ' + blog.title,
		blogTitle : blog.title,
		blogDescription : blog.description,
		keywords : blog.keywords
	};
}

module.exports = {

	register : function(blog) {
		blog.app.get('/blog/archives/', function(req, res) {
			blog.info('serving archive');
			res.render('archive', getTemplateData(blog));
		});
	},

	generate : function(blog, dir) {
		handler.render('archive', getTemplateData(blog), function (err, content) {
			handler.createHtmlFile(path.join(dir, 'archives', 'index.html'), content);
		});
	}

};
