const chalk = require('chalk'); // todo use @types/chalk if fixed

export const errorTxt = chalk.red;
export const warningTxt = chalk.keyword('orange');
export const successTxt = chalk.green;
export const infoTxt = chalk.cyan;
export const infoTxtReverse = chalk.bgCyan.white;
export const commandTxt = chalk.magenta;
export const actionTxt = chalk.bold;
export const whiteTxt = chalk.white;
