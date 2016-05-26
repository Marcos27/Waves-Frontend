(function() {
  angular.module('wavesApp', ['ui.router', 'ngResource', 'ng-token-auth'])
    .config(function($authProvider) {
          $authProvider
            .configure({
              apiUrl: 'http://localhost:3000',
              authProviderPaths: {
              spotify: '/auth/spotify'
              }
          })
        });
})();

