var commander = require('commander');
var path = require('path');
var chalk = require('chalk');
commander.unknownOption = function() {
};
// Command line arguments
var options = commander
  .option('-a, --api [url]', 'API URL', process.env.npm_package_config_api)
  .option('-p, --port [port]', 'web server port', process.env.npm_package_config_port)
  .option('-m, --mock [mock port]', 'mock API port', process.env.npm_package_config_mock)
  .option('-t, --tags [tags]', 'For ui:test only', process.env.npm_package_config_tags)
  .option('--host [host]', 'host to serve from', process.env.npm_package_config_host)
  .option('--base [baseHref]', 'baseHref to serve from', process.env.npm_package_config_base)
  .option('--hot [hot replace]', 'baseHref to serve from', process.env.npm_package_config_hot)
  .option('--scheme [scheme]', 'scheme to serve from', process.env.npm_package_config_scheme)
  .parse(process.argv);

function logEnvironment() {
  if (process.env.NODE_ENV === 'dev') {
    /*eslint-disable no-console */
    console.log(chalk.bold.cyan('api ->', options.api));
    console.log(chalk.bold.cyan('mock ->', options.mock));
    console.log(chalk.bold.cyan('host ->', options.scheme + '://' + options.host + ':' + options.port));
    console.log(chalk.bold.cyan('port ->', options.port));
    console.log(chalk.bold.cyan('hot ->', !!options.hot));
    console.log(chalk.bold.cyan('base ->', options.base));
    console.log(chalk.bold.cyan('get started at ->',
    options.scheme + '://' + options.host + ':' + options.port + '/' + options.base + '/#/login'));
    /*eslint-enable no-console */
  }
}
// path magic
var _root = path.resolve(__dirname, '..');

var _join = function(pathToJoin) {
  var paths = pathToJoin.split('/').join(path.sep);
  var joined = path.join(_root,paths);
  return path.normalize(joined);
}

exports.options = options;
exports.root = _root;
exports.normalizeToRoot = _join;
exports.appendToContextRoot = _join;
exports.logEnvironment = logEnvironment;
