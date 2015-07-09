var Promise = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var ncp = Promise.promisify(require('ncp').ncp);
var rename = Promise.promisify(require('fs').rename);
var fs = Promise.promisifyAll(require('fs'));
var finder = require('fs-finder');

console.log(process.argv);

ncp.limit = 16;

var newProjectDir = process.cwd();
var generatorFilesPath = path.join(__dirname, '../generated');

// rename files
// make a promise
var noDb = process.argv[2] === "-nodb";

var renameDbFiles = function() {
    if (noDb) {
        var paths = finder.from(generatorFilesPath).findFiles('*.nodb*');
        console.log(paths);
        var newPaths = [];

        for (var i = 0; i < paths.length; i++) {
            var oldPath = paths[i];
            var targetString = '.nodb';
            var startPos = oldPath.indexOf(targetString);
            var newPath = oldPath.slice(0, startPos) + oldPath.slice(startPos + targetString.length);
            newPaths.push(rename(oldPath, newPath));
        }

        return Promise.all(newPaths);
    }
    else return new Promise(function() {return;});
}

var copyFiles = function () {
    return ncp(generatorFilesPath, newProjectDir);
};

var renameGitignore = function () {
    var oldPath = path.join(newProjectDir, 'gitignore.txt');
    var newPath = path.join(newProjectDir, '.gitignore');
    return rename(oldPath, newPath);
};


console.log(chalk.green('Meaniscule is generating a miniscule MEAN stack app, just for you.'));
renameDbFiles().then(copyFiles).then(renameGitignore).then(function () {
    console.log(chalk.green('All done. Enjoy!'));
    console.log(chalk.yellow('Run the following commands to get set up:'));
    console.log(chalk.white.bgBlack('- [Terminal 1] npm install '));
    console.log(chalk.white.bgBlack('- [Terminal 1] npm start   '));
    console.log(chalk.white.bgBlack('- [Terminal 2] gulp seedDB '));
    console.log(chalk.white.bgBlack('- [Terminal 2] gulp        '));
})
.catch(function(err) {
    console.log(err);
});