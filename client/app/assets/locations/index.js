'use strict';

import angular from 'angular';
import AssetLocsController from './locations.controller';

export default angular.module('rfidServerAppApp.assetLocs', [])
  .controller('AssetLocsController', AssetLocsController)
  .name;