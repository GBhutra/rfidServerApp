'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './assets.routes';
import assetLocs from './locations';
import assets from './assets';
import asset from './asset';

export default angular.module('rfidServerAppApp.assets', [uiRouter, assetLocs, assets, asset])
  .config(routing)
  .name;