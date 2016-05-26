(function() {
  angular.module('wavesApp', ['ui.router', 'ngResource', 'ng-token-auth'])
    .config(function($authProvider) {
          $authProvider
            .configure({
              apiUrl: backendUrl,
              authProviderPaths: {
              spotify: '/auth/spotify'
              }
          })
        });
})();

