/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Pump it up",
          artist: "Endor",
          cover: "https://i.scdn.co/image/ab67706c0000da84c4efa07b67dca321d9252de9",
          source: "https://assets.codepen.io/10602517/Pump+it+up.mp3",
          url: "https://www.youtube.com/watch?v=Ux6TEz4LoqQ",
          favorited: false
        },
        {
          name: "Calm Down",
          artist: "Rema, Selena Gomez",
          cover: "https://www.billboard.com/wp-content/uploads/2022/09/Rema-Selena-Gomez-Calm-Down-2022-billboard-1548.jpg",
          source: "https://assets.codepen.io/10602517/Calm+down.mp3",
          url: "https://www.youtube.com/watch?v=WcIcVapfqXw",
          favorited: true
        },
        {
          name: "Balada",
          artist: "Gusttavo Lima",
          cover: "https://i1.sndcdn.com/artworks-000024274201-x2eb3p-t500x500.jpg",
          source: "https://assets.codepen.io/10602517/Balada.mp3",
          url: "https://www.youtube.com/watch?v=Z1ZKaR-9Kt4",
          favorited: false
        },
        {
          name: "Radio Hardcord",
          artist: "ItaloBrothers",
          cover: "https://ih1.redbubble.net/image.4770833232.7768/pp,840x830-pad,1000x1000,f8f8f8.jpg",
          source: "https://assets.codepen.io/10602517/Radio+Hardcord.mp3",
          url: "https://www.youtube.com/watch?v=jU_H6M4tvPw",
          favorited: false
        },
        {
          name: "Bye Bye Bye",
          artist: "*NSYNC",
          cover: "https://i1.sndcdn.com/artworks-000383243931-1xk95m-t500x500.jpg",
          source: "https://assets.codepen.io/10602517/Bye+Bye+Bye.mp3",
          url: "https://www.youtube.com/watch?v=Eo-KmOd3i7s",
          favorited: true
        },
        {
          name: "Blinding Lights",
          artist: "The Weeknd",
          cover: "https://i1.sndcdn.com/artworks-T5KqOdidfrbpyddU-sGIJsA-t500x500.jpg",
          source: "https://assets.codepen.io/10602517/Blinding+Lights.mp3",
          url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
          favorited: false
        },
        {
          name: "Bloody Mary",
          artist: "Lady Gaga",
          cover: "https://i.scdn.co/image/ab67616d0000b273a47c0e156ea3cebe37fdcab8",
          source: "https://assets.codepen.io/10602517/Bloody+Mary.mp3",
          url: "https://www.youtube.com/watch?v=MsXdUtlDVhk",
          favorited: true
        },
        {
          name: "Timber",
          artist: "Pitbull ft. Ke$ha",
          cover: "https://cdn.justjared.com/wp-content/uploads/2013/11/kesha-pitbull/kesha-pitbull-timber-amas-2013-performance-video-03.jpg",
          source: "https://assets.codepen.io/10602517/Timber_1.mp3",
          url: "https://www.youtube.com/watch?v=hHUbLv4ThOo",
          favorited: false
        },
        {
          name: "FACE(페이스)",
          artist: "NU'EST(뉴이스트)",
          cover: "https://i0.wp.com/colorcodedlyrics.com/wp-content/uploads/2013/03/nuestface.jpg?fit=600%2C600&ssl=1",
          source: "https://assets.codepen.io/10602517/Face.mp3",
          url: "https://www.youtube.com/watch?v=gyXy0m-4bvE",
          favorited: false
        },
        {
          name: "Midnight -星を数える夜",
          artist: "BEAST",
          cover: "https://s.yimg.com/ny/api/res/1.2/2Xe.X7BcfNN6drHM7HDxNg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTUwMDtoPTUwMA--/https://media.zenfs.com/ko_KR/News/bntnews/u4q4n7ojdqtuc77djmuax2hbyth5enpz.jpg",
          source: "https://assets.codepen.io/10602517/midnight.mp3",
          url: "https://www.youtube.com/watch?v=gvWPiXndy5A",
          favorited: false
        },
        {
          name: "TRAP",
          artist: "Henry 헨리",
          cover: "https://i.pinimg.com/originals/64/39/da/6439da844edfeed5a20b839d2d299684.jpg",
          source: "https://assets.codepen.io/10602517/TRAP.mp3",
          url: "https://www.youtube.com/watch?v=IsXB5eRMRno",
          favorited: false
        }, 
        {
          name: "Về Với Em",
          artist: "Võ Hạ Trâm",
          cover: "https://images2.thanhnien.vn/528068263637045248/2023/4/27/saostar-i75mzrd1ra8h6tl5-16825597397581824762014.jpeg",
          source: "https://assets.codepen.io/10602517/VE+VOI+EM.mp3",
          url: "https://www.youtube.com/watch?v=caoxaO_nKFU",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
