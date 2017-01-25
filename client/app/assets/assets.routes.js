'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('assetLocs', {
      url: '/assets/loc/',
      template: require('./locations/locations.html'),
      controller: 'AssetLocsController',
      controllerAs: 'vm'
    })
    .state('assets', {
      url: '/assets/loc/{location}',
      template: require('./assets/assets.html'),
      controller: 'AssetsController',
      controllerAs: 'vm'
    })
    .state('asset', {
      url: '/assets/{id}',
      template: require('./asset/asset.html'),
      controller: 'AssetController',
      controllerAs: 'vm'
    });
}
