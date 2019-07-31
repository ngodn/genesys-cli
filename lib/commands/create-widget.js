require('shelljs/global');
var prompt = require('prompt');
var fs = require('fs');
var util = require('../util');
var config = require('../../config');

module.exports = function (program) {
  var self = this;

  program
    .command('create-widget <widget-name>')
    .option('--player', 'Also add a public/js folder to your new genesys-widgets module directory with an always.js set up with an genesys player.')
    .description('Bootstrap a subclass of genesys-widgets with all the configuration you need to get started')
    .action(function(widgetName, options) {
      if(!util.getAppPath()) {
        return false;
      }

      util.nlog('create-widget', 'Adding '+ widgetName +'-widgets folder to /lib/modules.');

      var fullWidgetName = widgetName + '-widgets';
      var path = 'lib/modules/'+ fullWidgetName;

      mkdir('-p', path);

      util.nlog('create-widget', 'Creating a views folder and widget.html for ' + fullWidgetName + '.');
      mkdir('-p', path + '/views');
      exec('touch '+ path +'/views/widget.html');

      var widgetConfig = "module.exports = {\
        \n  extend: 'genesys-widgets',\
        \n  label: '" + util.titleCase(widgetName.replace(/-/g, ' ')) +"',\
        \n  addFields: []\
        \n};";

      util.nlog('create-widget', 'Setting up index.js for '+ fullWidgetName + '.');
      fs.writeFileSync(path + '/index.js', widgetConfig);

      if(options.player) {
        util.nlog('create-widget', 'Setting up always.js for '+ widgetName + fullWidgetName +'.');
        mkdir('-p', path + '/public/js');

        var jsConfig = "genex.define('"+ fullWidgetName +"', {\
          \n  extend: 'genesys-widgets',\
          \n  construct: function(self, options) {\
          \n    self.play = function($widget, data, options) {\
          \n\
          \n    };\
          \n  }\
          \n});"

        fs.writeFileSync(path + '/public/js/always.js', jsConfig);
      }

      util.success('create-widget');
      return true;
    });
};
