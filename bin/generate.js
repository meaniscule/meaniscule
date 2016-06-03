var Promise = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var ncp = Promise.promisify(require('ncp').ncp);
var rename = Promise.promisify(require('fs').rename);
var fs = Promise.promisifyAll(require('fs'));
var finder = require('fs-finder');
var exec = require('child_process').exec;
var isWin = (process.platform.indexOf('win32') != -1); //are we windowsing?

ncp.limit = 16;

var newProjectDir = process.cwd();
var generatorFilesPath = path.join(__dirname, '../generated');

// rename files
// make a promise
var noDb = process.argv[2] === "nodb";

var renameNoDbFiles = function renameNoDbFiles() {
    var paths = finder.from(newProjectDir).findFiles('*.nodb*');
    var newPaths = [];

    for (var i = 0; i < paths.length; i++) {
        var oldPath = paths[i];
        var targetString = '.nodb';
        var startPos = oldPath.indexOf(targetString);
        var newPath = oldPath.slice(0, startPos) + oldPath.slice(startPos + targetString.length);
        newPaths.push(rename(oldPath, newPath));
    }

    return Promise.all(newPaths);
};

var removeDbFiles = function removeDbFiles() {

    return new Promise(function(resolve, reject) {
        if (!isWin) {
            //user's POSIXy
            exec('rm -r ./client/pre-build/modules/ ./seed.js ./server/api/modules/ ./server/db.js', function(error, stdout, stderr) {
                if (error) return reject(stderr);
                else return resolve(stdout);
            });
        } else {
            /*notes:
            cmd doesn't seem to like it when we delete without confirming, so /q says 'quiet mode'. In other words, delete without confirm.
            /s says delete whole tree (this folder and its contents)
            note BACKslash, not forward!
            If you're wondering "why the loops?",
            A) congrats, you don't suck @ programming, and 
            B), Windows' rd (remove directory) command apparently does not allow deleting of multiple, independent loops. 
            So instead, we delete each folder on its own. 
            */
            exec('rd /s /q .\\client\\pre-build\\modules', function(error, stdout, stderr) {
                if (error) return reject('ERR lvl 1 ' + stderr + ' ' + error);
                exec('del /q seed.js .\\server\\db.js', function(error, stdout, stderr) {
                    if (error) return reject('ERR lvl 2' + stderr);
                    exec('rd /s /q .\\server\\api', function(error, stdout, stderr) {
                        if (error) return reject('ERR lvl 3' + stderr + error);
                        return resolve(stdout);
                    });
                });
            });
        }
    });
};


var removeNoDbFiles = function removeNoDbFiles() {
    return new Promise(function(resolve, reject) {
        if (!isWin) {
            exec('find . -type f -name "*.nodb*" -delete', function(error, stdout, stderr) {
                if (error) return reject(stderr);
                else return resolve(stdout);
            });
        } else {
            exec('del /s /q .\\*.nodb*', function(error, stdout, stderr) {
                if (error) {
                    return reject(stderr);
                } else {
                    return resolve(stdout);
                }
            });
        }
    });
};

var copyFiles = function() {
    return ncp(generatorFilesPath, newProjectDir);
};

var renameGitignore = function() {
    var oldPath = path.join(newProjectDir, 'gitignore.txt');
    var newPath = path.join(newProjectDir, '.gitignore');
    return rename(oldPath, newPath);
};


console.log(chalk.green('Meaniscule is generating your new miniscule MEAN stack app.'));
console.log(chalk.green('You\'ll be up and running in no time!'));

copyFiles()
    .then(function() {
        if (noDb) {
            if (isWin) {
                return renameNoDbFiles().then(removeDbFiles());
            } else {
                return renameNoDbFiles()
                    .then(removeDbFiles);
            }
        } else {
            return removeNoDbFiles();
        }
    })
    .then(renameGitignore)
    .then(function() {
        var codeyBits = isWin ? 'Cmd Prompt' : 'Terminal';
        console.log(chalk.green('Your app is ready!'));
        console.log(chalk.yellow('Run the following commands to get set up:'));
        console.log(chalk.white.bgBlack('- [' + codeyBits + ' 1] npm install '));
        console.log(chalk.white.bgBlack('- [' + codeyBits + ' 1] npm start   '));
        if (!noDb) console.log(chalk.white.bgBlack('- [' + codeyBits + ' 2] gulp seedDB '));
        console.log(chalk.white.bgBlack('- [' + codeyBits + ' 2] gulp'));
    })
    .catch(function(err) {
        console.log(err);
    });

//TO DO: write a way to find files of type '.nodb' and delete, in windooz
//do any of these happen to be mac-os only?