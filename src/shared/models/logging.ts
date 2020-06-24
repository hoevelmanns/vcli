const chalk = require('chalk'); // todo use @types/chalk if fixed

export const errorTxt = chalk.bold.red;
export const warningTxt = chalk.keyword('orange').bold;
export const successTxt = chalk.bold.green;
export const infoTxt = chalk.cyan;
export const infoTxtReverse = chalk.bgCyan.white;
export const commandTxt = chalk.magenta.bold;
export const actionTxt = chalk.bold;
export const whiteTxt = chalk.white;
