'use strict';
const angular = require('angular');

/*@ngInject*/
export function assetController() {
  this.message = 'Hello';
}

export default angular.module('rfidServerAppApp.asset', [])
  .controller('AssetController', assetController)
  .name;
