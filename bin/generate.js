var bluebird = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var ncp = bluebird.promisify(require('ncp').ncp);
var rename = bluebird.promisify(require('fs').rename);

ncp.limit = 16;

var newProjectDir = process.cwd();
var generatorFilesPath = path.join(__dirname, '../generated');


var copyFiles = function () {
    return ncp(generatorFilesPath, newProjectDir);
};

var renameGitignore = function () {
    var oldPath = path.join(newProjectDir, 'gitignore.txt');
    var newPath = path.join(newProjectDir, '.gitignore');
    return rename(oldPath, newPath);
};

console.log(chalk.green('Meaniscule is generating a miniscule MEAN stack app, just for you.'));
copyFiles().then(renameGitignore).then(function () {
    console.log(chalk.green('All done. Enjoy!'));
    console.log(chalk.yellow('Run the following commands to get set up:'));
    console.log(chalk.white.bgBlack('- [Terminal 1] npm install '));
    console.log(chalk.white.bgBlack('- [Terminal 1] npm start   '));
    console.log(chalk.white.bgBlack('- [Terminal 2] gulp seedDB '));
    console.log(chalk.white.bgBlack('- [Terminal 2] gulp        '));
});