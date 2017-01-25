'use strict';

import angular from 'angular';
import AssetController from './asset.controller';

export default angular.module('rfidServerAppApp.assetC', [])
  .controller('AssetController', AssetController)
  .name;