(function() {
  angular.module('wavesApp')
    .factory("MusicResource", MusicResource);

    MusicResource.$inject = ['$resource'];

    function MusicResource($resource) {
      return $resource(
        backendUrl+"api/musics/:id",
        {id: '@id'}, {
          'update': { method: 'PUT'}
        }
      );
    }
})();
