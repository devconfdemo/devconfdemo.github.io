document.addEventListener('alpine:init', () => {
  Alpine.data('slidePlayer', function () {
    return {
      // State
      current: this.$persist(0),
      stoppedOn: 0,
      src: "",
      enableControls: false,
      busy: false,
      video: null,
      thumbs: false,
      pauses: [],

      // Lifecycle
      init() {
        fetch('/assets/2025-devconf.json')
          .then(res => res.json())
          .then(data => {
            this.src = data.src;
            this.pauses = data.pauses;

            this.video = document.getElementById('slide-video');
            this.video.currentTime = this.current;

            if (this.current === 0) {
              this.video.playbackRate = 4;
            }

            if (!this.pauses.includes(Math.floor(this.current))) {
              this.resumePlayback();
            }

            this.video.addEventListener('volumechange', this.enforceMuted.bind(this));
          })
          .catch(err => {
            console.error('Failed to load slide data:', err);
          });
      },

      // Methods
      enforceMuted() {
        this.video.muted = true;
        this.video.volume = 0;
      },

      isPausePoint(time) {
        return this.pauses.includes(Math.floor(time));
      },

      resumePlayback(retries = 3) {
        if (this.busy) return;
        this.busy = true;

        this.video.play().catch((err) => {
          if (retries > 0) {
            console.warn('Playback failed, retrying...', err);
            setTimeout(() => {
              this.busy = false; // laat volgende poging doorgaan
              this.resumePlayback(retries - 1);
            }, 200); // korte vertraging
          } else {
            console.error('Playback failed permanently:', err);
            this.busy = false;
          }
        });
      },

      goBack() {
        if (this.busy) return;
        this.busy = true;

        const speed = 2;
        const interval = 40;
        const reverseInterval = setInterval(() => {
          this.video.currentTime -= 0.04 * speed;
          const point = Math.floor(this.video.currentTime);

          if (point !== this.stoppedOn && this.isPausePoint(point)) {
            clearInterval(reverseInterval);
            this.stoppedOn = point;
            this.setIndicatorState(true);
            this.busy = false;
          }
        }, interval);
      },

      updateTime(event) {
        this.current = event.target.currentTime;
        const point = Math.floor(this.current);

        if (point !== this.stoppedOn && this.isPausePoint(point)) {
          this.video.pause();
          this.video.playbackRate = 1;
          this.stoppedOn = point;
          this.setIndicatorState(true);
          this.busy = false;
        } else if (point !== this.stoppedOn) {
          this.setIndicatorState(false);
        }

        const cutoff = 2;
        if (this.video.duration && this.current >= this.video.duration - cutoff) {
          this.video.currentTime = 0;
        }
      },

      setIndicatorState(success) {
        const el = document.getElementById("indicator");
        el.classList.toggle('badge-success', success);
        el.classList.toggle('badge-error', !success);
      }
    };
  });
});