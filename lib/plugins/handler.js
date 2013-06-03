var fs = require('fs'),
	path = require('path'),
	wrench = require('wrench'),
	jade = require('jade'),
	exphbs = require('express3-handlebars'),
	flipflop = require('../flipflop.js'),
	renderer = exphbs.create({
		defaultLayout: 'layout'
	});

module.exports = {

	createHtmlFile : function(dest, html) {
		var	destDir = path.dirname(dest);
		if (!fs.existsSync(destDir)) {
			wrench.mkdirSyncRecursive(destDir);
		}
		fs.writeFileSync(dest, html);
		flipflop.info('created file:\t\t', dest);
	},

	render: function (template, data, callback) {
		renderer.renderView('views/' + template + '.handlebars', data, callback);
	}

};
