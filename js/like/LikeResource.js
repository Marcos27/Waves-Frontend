(function() {
  angular.module('wavesApp')
    .factory("LikeResource", LikeResource);

    LikeResource.$inject = ['$resource'];

    function LikeResource($resource) {
      return $resource(
        // "http://localhost:3000/api/likes/:id",
        "https://waves-backend.herokuapp.com/api/likes/:id",
        {id: '@id'}, {
          'update': { method: 'PUT'}
        }
      );
    }
})();
