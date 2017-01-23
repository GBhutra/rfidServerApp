'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('asset', {
      url: '/asset',
      template: '<asset></asset>'
    });
}
