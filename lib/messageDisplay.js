// IMPORT PACKAGES ================================================================================

const figlet = require('figlet');
const term = require("terminal-kit").terminal;

const start = () => {
  console.log("\n");
  term.magenta(figlet.textSync('\nEmployee\n Tracker', {
    font: 'Big Money-ne',
    horizontalLayout: 'full',
    width: 100,
    whitespaceBreak: true
  }));

  console.log("\n");
};

const exit = () => {
  console.log("\n");
  term.yellow(figlet.textSync('Thank You', {
    font: 'Ghost',
    horizontalLayout: 'full',
    width: 100,
    whitespaceBreak: true
  }));

  console.log("\n");
}


// EXPORT MODULE ================================================================================
module.exports = { start, exit};


