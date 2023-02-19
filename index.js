// my music data

const songData = [
  {
    name: "majid-1",
    title: "Pop Song",
    artist: "John Dhoe",
  },
  {
    name: "majid-2",
    title: "Lyric Song",
    artist: "Mic Loren",
  },
  {
    name: "majid-3",
    title: "Ring Song",
    artist: "Harry Tom",
  },
];

const playEl = document.querySelector("#play");
//target audio
let audioEl = document.querySelector("audio");
//image target
const imgEl = document.querySelector("img");
//title target
const titleEl = document.querySelector("#title");
//artist target
const artistEl = document.querySelector("#artist");
//prev button code
const prevEl = document.querySelector("#prev");
//next button code
const nextEl = document.querySelector("#next");

let indexNumber = 0;

//playMusicFunction code
let musicValue = false;
const playMusic = () => {
  musicValue = true;
  audioEl.play();
  playEl.classList.replace("fa-play", "fa-pause");
  imgEl.classList.add("anim");
};

//pause music code
const pauseMusic = () => {
  musicValue = false;
  audioEl.pause();
  playEl.classList.replace("fa-pause", "fa-play");
  imgEl.classList.remove("anim");
};

// play button click event code
playEl.addEventListener("click", () => {
  musicValue ? pauseMusic() : playMusic();
});

// load music data function code
const loadMusicData = (songData) => {
  titleEl.innerText = songData.title;
  artistEl.innerText = songData.artist;
  imgEl.src = "image_only/" + songData.name + ".png";
  audioEl.src = "song_mp3/" + songData.name + ".mp3";
};
//next button code
loadMusicData(songData[indexNumber]);
nextSong = () => {
  indexNumber = (indexNumber + 1) % songData.length;
  loadMusicData(songData[indexNumber]);
  playMusic();
};
//prev buttton code
prevSong = () => {
  indexNumber = (indexNumber - 1 + songData.length) % songData.length;
  loadMusicData(songData[indexNumber]);
  playMusic();
};

//progress js work
const durationEl = document.querySelector("#duration");
let progressEl = document.querySelector("#progress");
let current_timeEl = document.querySelector("#current_time");
const progress_divEl = document.querySelector("#progress_div");

audioEl.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.target;
  let progreessWidth = (currentTime / duration) * 100;
  progressEl.style.width = `${progreessWidth}%`;

  //duration js work star from here

  let min_duration = Math.round(duration / 60);
  let sec_duration = Math.round(duration % 60);

  if (duration < 10) {
    sec_duration = `0${sec_duration}`;
  }
  if (duration) {
    durationEl.textContent = `${min_duration} : ${sec_duration}`;
  }

  //currentTime js work
  let min_currentTime = Math.round(currentTime / 60);
  let sec_currentTime = Math.round(currentTime % 60);

  // ternary oprato
  sec_currentTime < 10
    ? (sec_currentTime = `0${sec_currentTime}`)
    : (sec_currentTime = `${sec_currentTime}`);
  if (currentTime) {
    current_timeEl.textContent = `${min_currentTime} : ${sec_currentTime}`;
  }
});

progress_divEl.addEventListener("click", (e) => {
  const { duration } = audioEl;
  let touch_progress = (e.offsetX / e.target.clientWidth) * duration;
  audioEl.currentTime = touch_progress;
});

// jb music end hogaye to next wala play hogaye work

audioEl.addEventListener("ended", nextSong);

//duration js work end from here

// next music and button code
nextEl.addEventListener("click", nextSong);
prevEl.addEventListener("click", prevSong);
