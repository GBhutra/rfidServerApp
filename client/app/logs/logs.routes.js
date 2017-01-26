'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('logs', {
      url: '/logs',
      template: '<logs></logs>'
    });
}
