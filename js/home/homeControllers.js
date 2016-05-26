(function() {
  angular.module('wavesApp')
    .controller("HomeController", HomeController)

    HomeController.$inject = ['$auth'];

  function HomeController($auth) {
    var vm = this;

      vm.spotifyLogin = spotifyLogin;
      vm.spotifyLogout = spotifyLogout;

    function spotifyLogin() {
      $auth.authenticate('spotify')
        .then(function(resp) {
          console.log(resp)
        })
        .catch(function(resp) {
          console.log('errors: ', resp)
        });
        console.log("succesfully logged in")

    }

    function spotifyLogout() {
      $auth.signOut()
        .then(function(resp) {
          console.log("succesfully logged out")
        })
        .catch(function(resp) {
          console.log('errors: ', resp)
        });



    }
  }
})();
