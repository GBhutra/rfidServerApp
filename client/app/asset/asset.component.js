'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './asset.routes';

export class AssetController {
  Assets = [];

  /*@ngInject*/
  constructor($http, $scope) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/assets')
      .then(response => {
        this.Assets = response.data;
        console.log(this.Assets);
      });
  }
}

export default angular.module('rfidServerAppApp.asset', [uiRouter])
  .config(routes)
  .component('asset', {
    template: require('./asset.html'),
    controller: AssetController,
    controllerAs: 'assetCtrl'
  })
  .name;
