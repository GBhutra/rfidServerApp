'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('asset', {
      url: '/asset',
      template: '<asset></asset>'
    })
    .state('assetLoc', {
      url: '/asset/loc/:location',
      template: require('./assetLoc/assets.html'),
      controller: 'AssetLocController',
      controllerAs: 'AssetLocCtrl'
    });
}
