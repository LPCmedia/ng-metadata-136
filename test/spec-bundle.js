'use strict';

// need to add angular and ng-mock to window object
var mock = require('npm/angular-mocks');
window.angular = angular;
window.mock = mock;

require('./../src/app/vendor.ts');

// aplication modules
// todo seperate into own test pipelines

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
var componentContext = require.context('./../src/components', true, /\.spec\.(js|ts)/);
requireAll(componentContext);
