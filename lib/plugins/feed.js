var path = require('path'),
	handler = require('./handler.js');

function getTemplateData(blog) {
	return {
		articles : blog.api.getAll(),
		blogTitle : blog.title,
		blogDescription : blog.description,
		domain : blog.domain
	};
}

module.exports = {

	register : function(blog) {
		blog.app.get('/blog/index.xml', function(req, res) {
			var data = getTemplateData(blog);
			data.layout = false; // to disable layout for feed
			blog.info('serving feed');
			res.contentType('application/xml');
			res.render('feed', data);
		});
	},

	generate : function(blog, dir) {
		var data = getTemplateData(blog);
			data.layout = false; // to disable layout for feed
		handler.render('feed', data, function (err, content) {
			handler.createHtmlFile(path.join(dir, 'index.xml'), content);
		});
	}

};
