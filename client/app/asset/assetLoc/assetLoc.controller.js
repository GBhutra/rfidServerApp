'use strict';
const angular = require('angular');

/*@ngInject*/
export default class AssetLocController {

  /*@ngInject*/
  constructor($http, $scope, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    console.log(this.$stateParams);
     $http.get('/api/assets/loc/$stateParams')
      .then(response => {
        this.assets = response.data;
        console.log(assets);
      });
  }

}

