'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './dashboard.routes';
import nvd3 from 'angular-nvd3';

export class DashboardComponent {
  awesomeThings = [];
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    $scope.donutChart = {
          chart: {
              type: 'pieChart',
              height: 400,
              x: function(d){return d.key;},
              y: function(d){return d.y;},
              showLabels: false,
              legend: {
                  margin: {
                      top: 5,
                      right: 10,
                      bottom: 5,
                      left: 0
                  }
              }
          }
      };
      this.$scope = $scope;
  }

  $onInit() {
    this.$http.get('/api/assets/nums')
      .then(response => {
        this.numAssets = response.data.numAssets;
        this.numTags = response.data.numTags;
        this.numUntaggedAssets = this.numAssets - this.numTags;
        this.$scope.assetData = [{
          key: "Un-Tagged Assets",
          y: this.numUntaggedAssets
        },
        {
          key: "Assets",
          y: this.numAssets
        },
        {
          key: "Total Tags",
          y: this.numTags
        }];
      });

    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
        this.$scope.devicesData = [{
          key: "Online",
          y: 10
        },
        {
          key: "Offline",
          y: 30
        }];
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
