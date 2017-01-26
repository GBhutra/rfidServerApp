'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';

export class DashboardComponent {
  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/assets/nums')
      .then(response => {
        this.numAssets = response.data.numAssets;
        this.numTags = response.data.numTags;
        this.numUntaggedAssets = this.numAssets - this.numTags;
      });
  }
}

export default angular.module('rfidServerAppApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  })
  .name;
