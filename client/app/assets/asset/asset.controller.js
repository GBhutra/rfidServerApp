'use strict';

export default class AssetController {
  /*@ngInject*/
  constructor($http, $scope, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    console.log(this.$stateParams);
    var route = '/api/assets/'+this.$stateParams.id;
    this.$http.get(route)
      .then(response => {
        this.asset = response.data;
      });
  }
}
