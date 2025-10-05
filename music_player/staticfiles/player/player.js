document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const volumeSlider = document.getElementById('volume');
  const seekSlider = document.getElementById('seek');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');
  const songListItems = document.querySelectorAll('#song-list .song');

  let currentIndex = -1;
  let songs = [];

  // Load song data
  if (window.PLAYER_DATA && window.PLAYER_DATA.songs) {
    songs = window.PLAYER_DATA.songs;
  }

  // Format time in minutes:seconds
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Load and play a song
  function loadSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    currentIndex = index;
    const song = songs[index];
    
    audio.src = song.src;
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist || 'Unknown Artist';
    
    // Highlight current song
    songListItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    
    audio.load();
  }

  // Play/Pause toggle
  function togglePlay() {
    if (audio.paused) {
      if (currentIndex === -1 && songs.length > 0) {
        loadSong(0);
      }
      audio.play();
      playBtn.textContent = '⏸️';
    } else {
      audio.pause();
      playBtn.textContent = '▶️';
    }
  }

  // Previous song
  function prevSong() {
    if (currentIndex > 0) {
      loadSong(currentIndex - 1);
      audio.play();
      playBtn.textContent = '⏸️';
    }
  }

  // Next song
  function nextSong() {
    if (currentIndex < songs.length - 1) {
      loadSong(currentIndex + 1);
      audio.play();
      playBtn.textContent = '⏸️';
    }
  }

  // Update progress bar
  function updateProgress() {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      seekSlider.value = progress;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  }

  // Seek to position
  function seek() {
    if (audio.duration) {
      const seekTime = (seekSlider.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  }

  // Update volume
  function updateVolume() {
    audio.volume = volumeSlider.value;
  }

  // Event Listeners
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  volumeSlider.addEventListener('input', updateVolume);
  seekSlider.addEventListener('input', seek);

  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', function() {
    durationEl.textContent = formatTime(audio.duration);
    seekSlider.value = 0;
  });

  audio.addEventListener('ended', function() {
    if (currentIndex < songs.length - 1) {
      nextSong();
    } else {
      playBtn.textContent = '▶️';
    }
  });

  audio.addEventListener('play', function() {
    playBtn.textContent = '⏸️';
  });

  audio.addEventListener('pause', function() {
    playBtn.textContent = '▶️';
  });

  // Individual song play buttons
  songListItems.forEach((item, index) => {
    const playButton = item.querySelector('.play-song');
    if (playButton) {
      playButton.addEventListener('click', function(e) {
        e.preventDefault();
        loadSong(index);
        audio.play();
      });
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'ArrowLeft') {
      prevSong();
    } else if (e.code === 'ArrowRight') {
      nextSong();
    }
  });
});