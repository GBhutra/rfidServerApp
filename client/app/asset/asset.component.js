'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './asset.routes';

export class AssetComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('rfidServerAppApp.asset', [uiRouter])
  .config(routes)
  .component('asset', {
    template: require('./asset.html'),
    controller: AssetComponent,
    controllerAs: 'assetCtrl'
  })
  .name;
