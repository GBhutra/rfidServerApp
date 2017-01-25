'use strict';

export default class AssetLocsController {
  /*@ngInject*/
  constructor($http, $scope) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/assets/loc')
      .then(response => {
        this.locations = response.data;
      });
  }
}
