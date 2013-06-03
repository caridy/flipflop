var express = require('express'),
	fs = require('fs'),
	path = require('path'),
	wrench = require('wrench');

module.exports = {

	register : function(blog) {
		blog.app.use('/blog/static', express.static(blog.dir+'/static'));
	},

	generate : function(blog, dir) {
		//copy static resources into destination root
		wrench.copyDirSyncRecursive(
			path.join(blog.dir, 'static'),
			path.join(dir, 'static')
		);
		blog.info('Copied static files: ', path.join(dir, 'static'));
	}

};
