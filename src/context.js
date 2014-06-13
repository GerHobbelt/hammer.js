var marked = require('marked');
var gzipSize = require('gzip-size');
var fs = require('fs');

function readHammerFileSync(path) {
    return fs.readFileSync(__dirname +'/../node_modules/hammerjs/'+ path, {encoding:'utf8'});
}

module.exports = {
    readme: (function() {
        return marked(readHammerFileSync('README.md'));
    })(),

    version: (function() {
        return JSON.parse(readHammerFileSync('package.json')).version;
    })(),

    gzipped: (function() {
        return Math.round(gzipSize.sync(readHammerFileSync('hammer.min.js')) / 10.24) / 100;
    })()
};
