require('shelljs/global');
var fs = require('fs');
var config = require('../config.js');
var util = require('./util');

function getCommand(command) {
  var defaultNamespace = 'genesys:';
  var namespaced = false;

  [':', '.'].forEach(function(token) {
    if(command.split(token).length > 1) {
      namespaced = true;
    }
  });

  if (!namespaced) {
    command = defaultNamespace + command;
  }

  return command;
}

module.exports = function (program) {
  program
    .command('*')
    .usage('<commandName>')
    .description('Run a Genesys task, possibilities listed below')
    .action(function(commandName, options) {
      util.nlog(commandName, 'Running the task [1/1]');

      var appPath = util.getAppPath();
      var command = getCommand(commandName);

      if (appPath) {
        var path = 'node ' + appPath + '/app.js ' + command;
        if (exec('node ' + appPath + '/app.js ' + command).code !== 0) {
          util.error(commandName);
          return false;
        }
      } else {
        return false;
      }

      util.success(commandName);
      return true;
    });

  var retVal = {};

  retVal.help = function() {
    var appPath = util.getAppPath();

    if (appPath) {
      console.log('  Genesys Tasks:');
      exec('node ' + appPath + '/app.js genesys:tasks');
    }
  }

  return retVal;
};
