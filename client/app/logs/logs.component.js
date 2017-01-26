'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './logs.routes';

export class LogsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('rfidServerAppApp.logs', [uiRouter])
  .config(routes)
  .component('logs', {
    template: require('./logs.html'),
    controller: LogsComponent,
    controllerAs: 'logsCtrl'
  })
  .name;
