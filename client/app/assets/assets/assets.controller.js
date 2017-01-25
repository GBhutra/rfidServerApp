'use strict';

export default class AssetsController {
  /*@ngInject*/
  constructor($http, $scope, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    var route = '/api/assets/loc/'+this.$stateParams.location;
    this.$http.get(route)
      .then(response => {
        this.assets = response.data;
      });
  }
}
