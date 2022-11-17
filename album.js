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
              <p class="album-name pb-0 mb-0 mt-3 show d-none">${album.title}</p>
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
  playingCover.src = `${album.cover_small}`;
  console.log(playingCover);
}
const track = document.querySelector(".track");
function renderAlbumSongs(album) {
  // let likeOption = [];
  // let songNumberOption = [];
  // let likeSongOption = [];
  console.log(album.tracks.data);
  console.log(album.tracks.data.length);

  let count = 0;
  for (let i = 0; i < album.tracks.data.length; i++) {
    const durationNatural = Number(album.tracks.data[i].duration);
    console.log(durationNatural);

    const mins = parseInt(durationNatural / 60);
    const seconds = parseInt(durationNatural - mins * 60);
    track.innerHTML += `
    <div class="d-flex song-bar-options align-items-center py-2 mr-4">
            <span class="song-number">${i + 1}</span>
            <span class=" like-song d-none triangle"></span>
            <div class="d-flex justify-content-between w-100 pr-5">
              <div class="d-flex flex-column ml-5">
                <span class="track-name">${album.tracks.data[i].title}</span>
                <span>${album.tracks.data[1].artist.name}</span>
              </div>
              <div class="d-flex align-items-center ml-0 ">
              <span class="like-song d-none mr-3"><i class="bi bi-heart "></i></span>
                <span class="song-mins">${mins}:${seconds}</span>
              </div>
              <span class="three-dots d-none"><i class="bi bi-three-dots-vertical"></i></span>
            </div>
          </div>`;
    count++;
    let songBar = document.querySelector(".song-bar-options");
    let songNumber = document.querySelector(".song-number");
    let likeSong = document.querySelector(".like-song");

    // console.log(songBar);
    // likeOption.push(songBar);
    // likeSongOption.push(likeSong);
    // songNumberOption.push(songNumber);
  }

  let allOptions = [likeOption, likeSongOption, songNumberOption];
  return allOptions;
  // likeOption.forEach((songBar) => {
  //   songBar.addEventListener("mouseover", () => {
  //     //for (let i = 0; i < album.tracks.data.length; i++) {

  //     songNumberOption.forEach((number) => {
  //       number.style.display = "none";
  //     });
  //     likeSongOption.forEach((song) => {
  //       song.style.display = "block";
  //     });
  //     //}
  //   });
  // });
}
// console.log(likeOption);

window.onload = async () => {
  const album = await getAlbum();
  renderAlbum(album);
  renderAlbumSongs(album);
};
// @media screen and (min-width: 480px){

// }
