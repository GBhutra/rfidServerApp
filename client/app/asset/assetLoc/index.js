'use strict';

import angular from 'angular';
import AssetLocController from './assetLoc.controller';

export default angular.module('rfidServerAppApp.assetLoc', [])
  .controller('AssetLocController', AssetLocController)
  .name;