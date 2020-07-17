const chalk = require('chalk'); // todo use @types/chalk if fixed

export const errorTxt = chalk.red,
  warningTxt = chalk.keyword('orange'),
  successTxt = chalk.green,
  infoTxt = chalk.cyan,
  infoTxtReverse = chalk.bgCyan.white,
  commandTxt = chalk.magenta,
  actionTxt = chalk.bold,
  whiteTxt = chalk.white;
