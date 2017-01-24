'use strict';
const angular = require('angular');

/*@ngInject*/
export function assetService($location, $http) {
	// AngularJS will instantiate a singleton by calling "new" on this function
  var Assets = {
    getAll()  {
      $http.get('/api/things')
      .then(response => {
        return response.data;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
    },
    getAssetsFromLocation(location) {

    }
  };
  return Assets;
}

export default angular.module('rfidServerAppApp.asset', [])
  .service('asset', assetService)
  .name;
