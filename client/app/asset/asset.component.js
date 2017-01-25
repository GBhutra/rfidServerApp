'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './asset.routes';
import assetLoc from './assetLoc';

export class AssetController {
  
  /*@ngInject*/
  constructor($http, $scope) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/assets/loc')
      .then(response => {
        this.locations = response.data;
      });
  }
}

export default angular.module('rfidServerAppApp.asset', [uiRouter, assetLoc])
  .config(routes)
  .component('asset', {
    template: require('./locations.html'),
    controller: AssetController,
    controllerAs: 'assetCtrl'
  })
  .name;
