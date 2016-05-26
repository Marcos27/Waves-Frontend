(function() {
  angular.module('wavesApp')
    .config(MainRouter);

    MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function MainRouter($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'js/home/home.html',
          controller: 'HomeController',
          controllerAs: 'homeVm'
        })
        .state('musicList', {
          url: '/music/list',
          templateUrl: 'js/music/music-list.html',
          controller: 'MusicListController',
          controllerAs: 'musicListVm',
          resolve: {
            auth: function($auth) {
              return $auth.validateUser();
            }
          }
        })
        .state('musicShow', {
          url: '/music/show/:id',
          templateUrl: 'js/music/music-show.html',
          controller: 'MusicShowController',
          controllerAs: 'musicShowVm'
        })
        .state('musicNew', {
          url: '/music/new',
          templateUrl: 'js/music/music-new.html',
          controller: 'MusicNewController',
          controllerAs: 'musicNewVm',
          resolve: {
            auth: function($auth) {
              return $auth.validateUser();
            }
          }
        })
        .state('musicEdit', {
          url: '/music/edit/:id',
          templateUrl: 'js/music/music-edit.html',
          controller: 'MusicEditController',
          controllerAs: 'musicEditVm'
        })
        .state('playlistList', {
          url: '/playlist/list',
          templateUrl: 'js/playlist/playlist-list.html',
          controller: 'PlaylistListController',
          controllerAs: 'playlistListVm'
        })
        .state('playlistShow', {
          url: '/playlist/show/:id',
          templateUrl: 'js/playlist/playlist-show.html',
          controller: 'PlaylistShowController',
          controllerAs: 'playlistShowVm'
        })
        .state('playlistNew', {
          url: '/playlist/new',
          templateUrl: 'js/playlist/playlist-new.html',
          controller: 'PlaylistNewController',
          controllerAs: 'playlistNewVm'
        })
        .state('playlistEdit', {
          url: '/playlist/edit/:id',
          templateUrl: 'js/playlist/playlist-edit.html',
          controller: 'PlaylistEditController',
          controllerAs: 'playlistEditVm'
        })
        .state('likeList', {
          url: '/like/list',
          templateUrl: 'js/like/like-list.html',
          controller: 'LikeListController',
          controllerAs: 'likeListVm'
        })
        .state('likeShow', {
          url: '/like/show/:id',
          templateUrl: 'js/like/like-show.html',
          controller: 'LikeShowController',
          controllerAs: 'likeShowVm'
        })
        .state('likeNew', {
          url: '/like/new',
          templateUrl: 'js/like/like-new.html',
          controller: 'LikeNewController',
          controllerAs: 'likeNewVm'
        })
        .state('likeEdit', {
          url: '/like/edit/:id',
          templateUrl: 'js/like/like-edit.html',
          controller: 'LikeEditController',
          controllerAs: 'likeEditVm'
        });


        $urlRouterProvider.otherwise('/');
    }
})();
