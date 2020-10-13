// IMPORT PACKAGES ================================================================================

const figlet = require('figlet');
const term = require("terminal-kit").terminal;


let starter = () => {
  term.red(figlet.textSync('Employee Tracker', {
    font: '3D Diagonal',
    horizontalLayout: 'fitted',
    width: 100,
    whitespaceBreak: true
  }));
}

// EXPORT MODULE ================================================================================
module.exports = starter;


