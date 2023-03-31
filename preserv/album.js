const albumId = window.location.search;
const search = new URLSearchParams(albumId);
let id = search.get("id");

const albumCover = document.querySelector(".album-cover");
const artistName = document.querySelector(".posted-by-artist");
const albumYear = document.querySelector("year");
const albumCoverContainer = document.querySelector(".album-cover");
const albumTotalSongs = document.queryCommandValue(".total-songs");
const albumDuration = document.querySelector(".duration");
//try {
async function getAlbum() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
    {
      method: "GET",
    }
  );
  const album = await response.json();

  console.log(album);
  const track = album.tracks.data;
  console.log(track);
  return album;
}
// } catch (error) {
//   window.alert("Something went wrong during Album fetch");
// }

function renderAlbum(album) {
  console.log(album.release_date);
  const durationNatural = Number(album.duration);
  const duration = Number(album.duration) / 3600;
  //if (duration >= 1) {
  const hr = parseInt(duration);
  const mins = parseInt((durationNatural - hr * 3600) / 60);
  const seconds = parseInt(durationNatural - hr * 3600 - mins * 60);
  console.log(seconds);
  let date = new Date(album.release_date);
  let year = date.getFullYear();
  console.log(year);

  albumCover.innerHTML = `
    <div class="album-cover-info d-flex justify-content-start mt-3">
            <img
              src="${album.cover_big}"
              alt="Tribal"
              class="img-fluid image-cover"
            />
            <div class="cover-info ml-4 mt-auto">
              <span class="album-album1">ALBUM</span>
              <span class="album-album d-none">Album <strong>.</strong> ${year}</span>
              <h2 class="hide album-name">${album.title}</h2>
              <p class="album-name album-name2 pb-0 mb-0 mt-3 show d-none">${album.title}</p>
              <div
                class="song-info d-flex justify-content-end align-items-center"
              >
                <img src="${album.artist.picture}" alt="" class="album-profile-img" />
                <span><h6 class="posted-by-artist artist-name">${album.artist.name}</h6> </span>
                <span class="year "><strong>.</strong> ${year}<strong>.</strong></span>

                <span class="total-songs">${album.nb_tracks} songs</span>
                <span class="duration"><strong>,</strong> ${hr} hr ${mins} min ${seconds} sec</span>
              </div>
            </div>
          </div>
    `;
  let playingCover = document.querySelector(".playing-cover");
  // playingCover.src = `${album.cover_small}`;
  console.log(playingCover);
}
const track = document.querySelector(".track");
function renderAlbumSongs(album) {
  let likeSongOption = [];

  for (let i = 0; i < album.tracks.data.length; i++) {
    const durationNatural = Number(album.tracks.data[i].duration);

    const mins = parseInt(durationNatural / 60);
    const seconds = parseInt(durationNatural - mins * 60);
    track.innerHTML += `
    <div onclick="displaySongDetail(event)" class="d-flex song-bar-options align-items-center py-2 mr-4 display-play">
        <span class="song-number">${i + 1}</span>
        <div onclick="playSong(event)" class=" like-song d-none triangle triangle-play"></div>
        <div class="d-flex justify-content-between w-100 pr-5">
          <div class="d-flex flex-column ml-5">
            <span class="track-name">${album.tracks.data[i].title}</span>
            <span>${album.tracks.data[1].artist.name}</span>
          </div>
          <div class="d-flex align-items-center ml-0 ">
            <span
              onclick="makeSongRed(event)"
              
              class="like-song soong d-none mr-3"
            >
              <i class="bi bi-heart "></i>
            </span>
            <span class="song-mins">
              ${mins}:${seconds}
            </span>
          </div>
          <span class="three-dots d-none">
            <i class="bi bi-three-dots-vertical"></i>
          </span>
        </div>
      </div> 
    `;
  }
}

const makeSongRed = (event) => {
  const likes = document.querySelectorAll(".soong");
  for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener("click", () => {
      likes[i].style.color = "red";
    });
  }
};

const playSong = (event) => {
  const songs = document.querySelectorAll(".triangle-play");
  for (let i = 0; i < songs.length; i++) {
    songs[i].addEventListener("click", () => {
      songs[i].style.borderColor = "transparent transparent transparent green";
      songs[i].style.display = "block !important";
      console.log(songs[i]);
      // console.log(i + 1);
      let index = i;
      // renderPlayBar();

      return index;
    });
  }
};

const displaySongDetail = (event) => {
  const display = document.querySelectorAll(".display-play");
  for (let i = 0; i < display.length; i++) {
    display[i].addEventListener("click", () => {
      let trackName = document.querySelectorAll(".track-name").innerHTML;
      console.log(trackName);
      function renderPlayBar(album) {
        console.log(album.release_date);
      }
      renderPlayBar(album);
    });
  }
  // console.log(trackName);
  console.log(display[1]);
};

// window.onload = async () => {
//   const album = await getAlbum();

//   renderPlayBar(album);
// };

window.onload = async () => {
  const album = await getAlbum();
  renderAlbum(album);
  renderAlbumSongs(album);
  // renderPlayBar(album);

  // const likeSongOption = renderAlbumSongs();
};
