const chalk = require('chalk');

console.log('');
console.log(chalk.green('Your dependencies are installed!'));
console.log(chalk.yellow('Run the following commands to start your app:'));
console.log(chalk.white.bgBlack('- [Terminal 1] npm start     '));
console.log(chalk.white.bgBlack('- [Terminal 2] npm run seed  ') + ' (skip if you used the `nodb` flag)');
console.log(chalk.white.bgBlack('- [Terminal 2] npm run watch '));
console.log('');

process.exit(0);