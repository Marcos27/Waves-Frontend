(function() {
  angular.module('wavesApp')
    .factory("LikeResource", LikeResource);

    LikeResource.$inject = ['$resource'];

    function LikeResource($resource) {
      return $resource(
        backendUrl+"api/likes/:id",
        {id: '@id'}, {
          'update': { method: 'PUT'}
        }
      );
    }
})();
