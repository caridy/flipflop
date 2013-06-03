var path = require('path');

var cmd = module.exports = function() {
	var app = this;

	cmd.lib.blogDir = process.cwd();
	cmd.lib.log = app.log.info;
	cmd.lib.error = app.log.error;
	cmd.lib.generate();
};
cmd.lib = {

	blogDir : null,

	log : function() {},

	error : function() {},

	generate : function(cb) {
		var config = require(path.join(this.blogDir, 'blog.json'));
		config.dir = this.blogDir;
		config.buildDir = path.resolve(cmd.lib.blogDir, config.buildDir || 'gh-pages');

		require('../flipflop')
			.init(config)
			.load(config.articles, function(err) {
				if(err) return cmd.lib.error(err);
				this.generate(config.buildDir);
				(cb||function(){})();
			});
	}

};
