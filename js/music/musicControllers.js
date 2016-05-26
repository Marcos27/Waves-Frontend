(function() {
  angular.module('wavesApp')
    .controller("MusicListController", MusicListController)
    .controller("MusicShowController", MusicShowController)
    .controller("MusicEditController", MusicEditController)

    MusicListController.$inject = ['MusicResource', '$sce'];
    MusicShowController.$inject = ['MusicResource', '$stateParams'];
    MusicEditController.$inject = ['MusicResource', '$stateParams', '$state'];







    function MusicListController(MusicResource, $sce) {
      var vm = this;
      vm.musics = [];
      vm.musicplayerFunction = musicplayerFunction;
      vm.musicstoperFunction = musicstoperFunction;
      vm.musicSrc = musicSrc;
      vm.newMusic = {};
      vm.addMusic = addMusic;

      MusicResource.query().$promise.then(function(musics) {
        vm.musics = musics;
        vm.musics.forEach(function (music) {
          music.playing = false
        })
      });

      vm.sortType     = 'name'; // set the default sort type
      vm.sortReverse  = false;  // set the default sort order
      vm.searchMusic   = '';     // set the default search/filter term

      function addMusic() {
        MusicResource.save(vm.newMusic).$promise.then(function(jsonMusic) {
          vm.newMusic = {};
          vm.musics.push(jsonMusic)
        });
      }

      function musicplayerFunction(music) {
         // var i = $(event.target).data().index
         console.log(music)
          for(var j = 0; j < vm.musics.length; j++) {
              vm.musics[j].playing = false;
          }
          music.playing = true
          // console.log("playing song");
      }
       function musicstoperFunction(music) {
         music.playing = false
      }
      function musicSrc(music) {
        song_url = music.song_url;
        // console.log(song_url)
        var newSong = song_url.split('v=')[1].split('&')[0];
        // console.log(newSong)
        var player = "https://www.youtube.com/embed/" + newSong;
        // console.log(player)
        if (music.playing) {
          player += "?autoplay=1";
        }
        return $sce.trustAsResourceUrl(player);
      }
    }

    function MusicShowController(MusicResource, $stateParams) {
      var vm = this;
      vm.music = {};

       MusicResource.get({id: $stateParams.id}).$promise.then(function(jsonMusic) {
            vm.music = jsonMusic;
      });
    }

    function MusicEditController(MusicResource, $stateParams, $state) {
      var vm = this;
      vm.music = {};
      vm.editMusic = editMusic;

      MusicResource.get({id: $stateParams.id}).$promise.then(function(jsonMusic) {
          vm.music = jsonMusic;
      });

      function editMusic() {
        MusicResource.update({id: vm.music.id}, vm.music).$promise.then(function(updatedMusic) {
          vm.music = updatedMusic;
          $state.go('musicShow', {id: updatedMusic.id});
        });
      }
    }
})();
