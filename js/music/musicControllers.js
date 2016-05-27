(function() {
  angular.module('wavesApp')
    .controller("MusicListController", MusicListController)
    .controller("MusicShowController", MusicShowController)
    .controller("MusicEditController", MusicEditController)

    MusicListController.$inject = ['MusicResource', '$sce', 'LikeResource'];
    MusicShowController.$inject = ['MusicResource', '$stateParams'];
    MusicEditController.$inject = ['MusicResource', '$stateParams', '$state'];







    function MusicListController(MusicResource, $sce, LikeResource) {
      var vm = this;
      vm.musics = [];
      vm.musicplayerFunction = musicplayerFunction;
      vm.musicstoperFunction = musicstoperFunction;
      vm.musicSrc = musicSrc;
      vm.newMusic = {};
      vm.addMusic = addMusic;
      vm.likeMusic = likeMusic;
      vm.likes = {};



      var modal = document.getElementById('myModal');
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close")[0];
      var add = document.getElementsByClassName("add")[0];
      btn.onclick = function() {
          modal.style.display = "block";
      }
      span.onclick = function() {
          modal.style.display = "none";
      }
      add.onclick = function() {
          modal.style.display = "none";
      }
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }

      MusicResource.query().$promise.then(function(musics) {
        vm.musics = musics;
        vm.musics.forEach(function (music) {
          music.playing = false
        })
      });

      // LikeResource.query().$promise.then(function(likes) {
      //   vm.likes = likes.map(function(like) {
      //     return vm.musics.find(function(music) {
      //       return music.id == like.id;
      //     });
      //   });
      //   console.log(vm.likes);
      // })

      vm.sortType     = 'name'; // set the default sort type
      vm.sortReverse  = false;  // set the default sort order
      vm.searchMusic   = '';     // set the default search/filter term

      function likeMusic(music) {
        var newLike = {
          music_id: music.id
        }
        LikeResource.save(newLike).$promise.then(function(res) {
          console.log(res);
        })
        console.log(newLike)
      }

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
