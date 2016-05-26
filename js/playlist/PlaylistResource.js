(function() {
  angular.module('wavesApp')
    .factory("PlaylistResource", PlaylistResource);

    PlaylistResource.$inject = ['$resource'];

    function PlaylistResource($resource) {
      return $resource(
        backendUrl+"api/playlists/:id",
        {id: '@id'}, {
          'update': { method: 'PUT'}
        }
      );
    }
})();
