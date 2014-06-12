var marked = require('marked');
var fs = require('fs');

module.exports = {
    readme: (function() {
        var contents = fs.readFileSync(__dirname +'/../node_modules/hammerjs/README.md', {encoding:'utf8'});
        return marked(contents);
    })()
};
