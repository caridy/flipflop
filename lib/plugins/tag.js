var path = require('path'),
	handler = require('./handler.js');

function getTemplateData(blog, tag) {
	return {
		articles : blog.api.getByTag(tag),
		recent_articles : blog.api.getRecent(),
		tag : tag,
		pageTitle : tag + ' - ' + blog.title,
		blogTitle : blog.title,
		blogDescription : blog.description,
		keywords : blog.keywords
	};
}

module.exports = {

	register : function(blog) {
		blog.app.get('/blog/tag/:tag/', function(req, res) {
			var tag = req.param('tag');
			blog.info('serving tag: ', tag);
			res.render('tag', getTemplateData(blog, tag));
		});
	},

	generate : function(blog, dir) {
		Object.keys(blog.api.getTags()).forEach(function(tag) {
			handler.render('tag', getTemplateData(blog, tag), function (err, content) {
				handler.createHtmlFile(path.join(dir, 'tag', tag, 'index.html'), content);
			});
		});
	}

};
