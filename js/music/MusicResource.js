(function() {
  angular.module('wavesApp')
    .factory("MusicResource", MusicResource);

    MusicResource.$inject = ['$resource'];

    function MusicResource($resource) {
      return $resource(
        "http://localhost:3000/api/musics/:id",
        {id: '@id'}, {
          'update': { method: 'PUT'}
        }
      );
    }
})();
