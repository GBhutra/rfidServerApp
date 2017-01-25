'use strict';

import angular from 'angular';
import AssetsController from './assets.controller';

export default angular.module('rfidServerAppApp.assetsC', [])
  .controller('AssetsController', AssetsController)
  .name;