(function() {
  angular.module('wavesApp')
    .factory("PlaylistResource", PlaylistResource);

    PlaylistResource.$inject = ['$resource'];

    function PlaylistResource($resource) {
      return $resource(
        "http://localhost:3000/api/playlists/:id",
        {id: '@id'}, {
          'update': { method: 'PUT'}
        }
      );
    }
})();
