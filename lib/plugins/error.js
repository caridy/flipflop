var path = require('path'),
	handler = require('./handler.js');

function getTemplateData(blog) {
	return {
		recent_articles : blog.api.getRecent(),
		pageTitle : blog.title,
		blogTitle : blog.title,
		blogDescription : blog.description,
		keywords : blog.keywords
	};
}

module.exports = {

	generate : function(blog, dir) {
		handler.render('/404', getTemplateData(blog), function (err, content) {
			handler.createHtmlFile(path.join(dir, '404.html'), content);
		});
	}

};
