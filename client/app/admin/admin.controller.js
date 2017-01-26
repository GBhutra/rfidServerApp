'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User, $http, $state) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$http = $http;
    this.$state = $state;
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  approve(user, approval) {
    this.$http
    .put(`/api/users/approve`, {"_id":user._id,"approval" : approval})
    .then(() => {
          user.approved = !user.approved;
          this.message = 'Approval status changed';
        })
    .catch(() => {
          this.message = 'ERROR changing approval status';
        });
  }
}
