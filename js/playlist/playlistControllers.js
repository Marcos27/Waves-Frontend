(function() {
  angular.module('wavesApp')
    .controller("PlaylistListController", PlaylistListController)
    .controller("PlaylistShowController", PlaylistShowController)
    .controller("PlaylistNewController", PlaylistNewController)
    .controller("PlaylistEditController", PlaylistEditController);

    PlaylistListController.$inject = ['PlaylistResource'];
    PlaylistShowController.$inject = ['PlaylistResource', '$stateParams'];
    PlaylistNewController.$inject = ['PlaylistResource', '$state'];
    PlaylistEditController.$inject = ['PlaylistResource', '$stateParams', '$state'];

    function PlaylistListController(PlaylistResource) {
      var vm = this;
      vm.playlists = [];
      vm.destroy = destroy;

      PlaylistResource.query().$promise.then(function(playlists) {
        vm.playlists = playlists;
      });

      function destroy(showToDelete) {
        PlaylistResource.delete({id: showToDelete.id}).$promise.then(function (response) {
          console.log(response.message);
          vm.playlists = vm.playlists.filter(function(playlist) {
            return playlist != playlistToDelete;
          });
        });
      }
    }

    function PlaylistShowController(PlaylistResource, $stateParams) {
      var vm = this;
      vm.playlist = {};

      PlaylistResource.get({id: $stateParams.id}).$promise.then(function(jsonPlaylist) {
          vm.playlist = jsonPlaylist;
      });
    }

    function PlaylistNewController(PlaylistResource, $state) {
      var vm = this;
      vm.newPlaylist = {};
      vm.addPlaylist = addPlaylist;

      function addPlaylist() {
        PlaylistResource.save(vm.newPlaylist).$promise.then(function(jsonPlaylist) {
          vm.newPlaylist = {};
          $state.go('showPlaylist', {id: jsonPlaylist.id});
        });
      }
    }

    function PlaylistEditController(PlaylistResource, $stateParams, $state) {
      var vm = this;
      vm.playlist = {};
      vm.editPlaylist = editPlaylist;

      PlaylistResource.get({id: $stateParams.id}).$promise.then(function(jsonPlaylist) {
          vm.playlist = jsonPlaylist;
      });

      function editPlaylist() {
        PlaylistResource.update({id: vm.playlist.id}, vm.playlist).$promise.then(function(updatedPlaylist) {
          vm.playlist = updatedPlaylist;
          $state.go('showPlaylist', {id: updatedPlaylist.id});
        });
      }
    }

})();
