'use strict';

angular.module('responymous')
  .factory('Firebase', function(CONFIG){
    return new Firebase(CONFIG.Firebase.baseUrl);
  })
  .factory('Auth', function(Firebase, $firebaseAuth, $firebase){
    var auth = $firebaseAuth(Firebase);

    return {
      /**
      * Wrapper for `$firebaseAuth.$onAuth()` that filters the `auth` object
      * through the `updateUser()` function
      */
      onAuth: function(cb){
        auth.$onAuth(function(data){
          cb(updateUser(data));
        });
      },
      /**
      * Wrapper for `$firebaseAuth.$authWithOAuthPopup()` that invokes the
      * correct provider code.
      */
      login: function(){
        return auth.$authWithOAuthRedirect('github');
      },
      /**
      * Wrapper for `$firebaseAuth.$unauth()`
      */
      logout: function(){
        auth.$unauth();
      }
    }; // END service

    /**
    * Tranform the `authdUser` object from `$firebaseAuth` into a full User
    * record in the `/users` collection.
    *
    * @param {Object} authdUser from $firebaseAuth.getAuth()
    * @return {Object} from $firebase.$asObject()
    */
    function updateUser(authdUser){
      if ( authdUser === null ){
        return null;
      }

      var user = $firebase(Firebase
        .child('users')
        .child( authdUser.github.id )
      ).$asObject();

      angular.extend(user, {
        access_token: authdUser.github.accessToken,
        email: authdUser.github.email,
        name: authdUser.github.displayName,
        last_vote: 5,
        current_class: "Q42014FEEORL",
        student: true
      });

      user.$save();

      return user;
    } // END updateUser
  }) // END factory(Auth)

  .controller('MainCtrl', function(Auth) {

    var self = this;

    this.login = Auth.login;
    this.logout = Auth.logout;

    Auth.onAuth(function(user){
      self.user = user;
    });
  })
;
